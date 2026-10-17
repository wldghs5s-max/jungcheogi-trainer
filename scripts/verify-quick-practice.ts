import { quickCalcSeeds } from '../src/data/questions/quickCalc';
import { sqlPracticeSeeds, SqlSeed } from '../src/data/questions/sqlPractice';
import { checkAnswer } from '../src/utils/quiz';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const SCRATCH_DIR = path.resolve('C:/Users/77/.gemini/antigravity/brain/7b63a87f-a125-4f11-9351-1c3dc50e435b/scratch');
const ZIG_PYTHON = path.join(SCRATCH_DIR, 'venv/Scripts/python.exe');
const JAVA_BIN = 'C:\\Program Files\\Zulu\\zulu-25\\bin\\java.exe';
const JAVAC_BIN = 'C:\\Program Files\\Zulu\\zulu-25\\bin\\javac.exe';
const PYTHON_BIN = 'python';

function runC(code: string): string {
  const tmpC = path.join(SCRATCH_DIR, `temp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.c`);
  const tmpExe = tmpC.replace('.c', '.exe');
  try {
    fs.writeFileSync(tmpC, code, 'utf-8');
    execSync(`"${ZIG_PYTHON}" -m ziglang cc "${tmpC}" -o "${tmpExe}"`, { stdio: 'pipe' });
    const out = execSync(`"${tmpExe}"`, { stdio: 'pipe', encoding: 'utf-8' });
    return out.trim();
  } finally {
    try { fs.unlinkSync(tmpC); } catch {}
    try { fs.unlinkSync(tmpExe); } catch {}
  }
}

function runJava(code: string): string {
  const tmpDir = path.join(SCRATCH_DIR, `java_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`);
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpJava = path.join(tmpDir, 'Main.java');
  try {
    fs.writeFileSync(tmpJava, code, 'utf-8');
    execSync(`"${JAVAC_BIN}" "${tmpJava}"`, { stdio: 'pipe' });
    const out = execSync(`"${JAVA_BIN}" -cp "${tmpDir}" Main`, { stdio: 'pipe', encoding: 'utf-8' });
    return out.trim();
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

function runPython(code: string): string {
  const tmpPy = path.join(SCRATCH_DIR, `temp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.py`);
  try {
    fs.writeFileSync(tmpPy, code, 'utf-8');
    const out = execSync(`"${PYTHON_BIN}" "${tmpPy}"`, { stdio: 'pipe', encoding: 'utf-8' });
    return out.trim();
  } finally {
    try { fs.unlinkSync(tmpPy); } catch {}
  }
}

function runSqlVerification(seed: SqlSeed): string {
  const scriptLines: string[] = [
    'import sqlite3, json',
    'con = sqlite3.connect(":memory:")',
    'cur = con.cursor()',
  ];

  for (const table of seed.tables) {
    const colDefs = table.columns.map((c) => `"${c}"`).join(', ');
    scriptLines.push(`cur.execute('CREATE TABLE "${table.name}" (${colDefs})')`);
    for (const row of table.rows) {
      const placeholders = row.map(() => '?').join(', ');
      const valJson = JSON.stringify(row);
      scriptLines.push(`cur.execute('INSERT INTO "${table.name}" VALUES (${placeholders})', json.loads(${JSON.stringify(valJson)}))`);
    }
  }

  for (let i = 0; i < seed.verify.statements.length; i++) {
    const stmt = seed.verify.statements[i].replace(/'/g, "\\'");
    if (i === seed.verify.statements.length - 1) {
      scriptLines.push(`cur.execute('${stmt}')`);
      scriptLines.push('row = cur.fetchone()');
      scriptLines.push('print("" if row is None or row[0] is None else str(row[0]))');
    } else {
      scriptLines.push(`cur.execute('${stmt}')`);
    }
  }

  const tmpPy = path.join(SCRATCH_DIR, `sql_test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.py`);
  try {
    fs.writeFileSync(tmpPy, scriptLines.join('\n'), 'utf-8');
    const out = execSync(`"${PYTHON_BIN}" "${tmpPy}"`, { stdio: 'pipe', encoding: 'utf-8' });
    return out.trim();
  } finally {
    try { fs.unlinkSync(tmpPy); } catch {}
  }
}

async function verifyAll() {
  console.log('==================================================');
  console.log(`[검증 시작] QUICK_CALC (${quickCalcSeeds.length}문항) + SQL_PRACTICE (${sqlPracticeSeeds.length}문항)`);
  console.log('==================================================\n');

  let passedQC = 0;
  let failedQC = 0;

  console.log('--- 1. C / Java / Python 실행 결과 대조 검증 ---');
  for (const seed of quickCalcSeeds) {
    try {
      let actual = '';
      if (seed.language === 'C') actual = runC(seed.code);
      else if (seed.language === 'JAVA') actual = runJava(seed.code);
      else if (seed.language === 'PYTHON') actual = runPython(seed.code);

      const matched = checkAnswer(actual, seed.answer, {
        type: 'CODE_TRACE',
        subject: '프로그래밍언어활용',
        code: seed.code,
      });

      if (!matched && actual !== seed.answer) {
        console.error(`❌ [${seed.id}] 불일치! 기대정답: "${seed.answer}", 실제실행: "${actual}"`);
        failedQC++;
      } else {
        passedQC++;
      }
    } catch (err: any) {
      console.error(`❌ [${seed.id}] 실행 에러:`, err.message);
      failedQC++;
    }
  }
  console.log(`QUICK_CALC 검증 결과: 통과 ${passedQC} / 실패 ${failedQC}`);

  let passedSQL = 0;
  let failedSQL = 0;

  console.log('\n--- 2. SQL SQLite DB 엔진 실행 결과 대조 검증 ---');
  for (const seed of sqlPracticeSeeds) {
    try {
      const actual = runSqlVerification(seed);
      if (actual !== seed.verify.expect) {
        console.error(`❌ [${seed.id}] SQL 결과 불일치! 기대: "${seed.verify.expect}", 실제: "${actual}"`);
        failedSQL++;
      } else {
        // 정답 채점 검증 (checkAnswer)
        const primaryAnswer = Array.isArray(seed.answer) ? seed.answer[0] : seed.answer;
        const checkOk = checkAnswer(primaryAnswer, seed.answer, {
          type: 'SQL',
          subject: '데이터베이스구축',
        });
        if (!checkOk) {
          console.error(`❌ [${seed.id}] checkAnswer 검증 실패: "${primaryAnswer}"`);
          failedSQL++;
        } else {
          passedSQL++;
        }
      }
    } catch (err: any) {
      console.error(`❌ [${seed.id}] SQL 실행 에러:`, err.message);
      failedSQL++;
    }
  }
  console.log(`SQL_PRACTICE 검증 결과: 통과 ${passedSQL} / 실패 ${failedSQL}`);

  if (failedQC > 0 || failedSQL > 0) {
    console.error('\n❌ 일부 문항에서 불일치가 발견되었습니다. 수정이 필요합니다.');
    process.exit(1);
  } else {
    console.log('\n🎉 [성공] 총 102개 문항의 컴파일/실행 결과 및 정답 채점 100% 일치 확인 완료!');
  }
}

verifyAll();
