// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

declare const __dirname: string;
declare const module: any;
import { Question, Subject, QuestionType } from '../src/types/question';
import { ALL_QUESTIONS } from '../src/data/questions';
import { MEMORIZATION_BANK } from '../src/data/questions/memorizationBank';
import { isNearDuplicateMemo, tokenOverlapRatio } from '../src/utils/memoDedupe';
import { memoAnswerKey } from '../src/utils/quiz';

// Import all 10 batches
import { BATCH_1_QUESTIONS } from './qbank-batches/batch1_prog_lang';
import { BATCH_2_QUESTIONS } from './qbank-batches/batch2_prog_os';
import { BATCH_3_QUESTIONS } from './qbank-batches/batch3_se_arch';
import { BATCH_4_QUESTIONS } from './qbank-batches/batch4_se_interface';
import { BATCH_5_QUESTIONS } from './qbank-batches/batch5_db_sql';
import { BATCH_6_QUESTIONS } from './qbank-batches/batch6_db_trans';
import { BATCH_7_QUESTIONS } from './qbank-batches/batch7_is_standard';
import { BATCH_8_QUESTIONS } from './qbank-batches/batch8_net_protocol';
import { BATCH_9_QUESTIONS } from './qbank-batches/batch9_sec_cipher';
import { BATCH_10_QUESTIONS } from './qbank-batches/batch10_sec_vuln';

function normalizeStem(text: string): string {
  return text.replace(/\s+/g, '').toUpperCase();
}

interface BatchAuditResult {
  batchName: string;
  candidateCount: number;
  acceptedCount: number;
  rejectedCount: number;
  rejections: { id: string; reason: string; detail: string }[];
}

export function compileAndValidate() {
  console.log('================================================================');
  console.log('🚀 [500문항 대규모 확장] 마이크로 배치 검증 및 컴파일 파이프라인');
  console.log('================================================================');

  const batches: { name: string; questions: Question[] }[] = [
    { name: '배치 1 (프로그래밍 핵심 문법/메모리)', questions: BATCH_1_QUESTIONS },
    { name: '배치 2 (프로그래밍 운영체제/프로세스/유닉스)', questions: BATCH_2_QUESTIONS },
    { name: '배치 3 (소프트웨어설계 아키텍처/UML/SOLID)', questions: BATCH_3_QUESTIONS },
    { name: '배치 4 (소프트웨어설계 시스템연계/비용/일정)', questions: BATCH_4_QUESTIONS },
    { name: '배치 5 (데이터베이스 SQL 제약조건/함수/조인)', questions: BATCH_5_QUESTIONS },
    { name: '배치 6 (데이터베이스 트랜잭션/인덱스/정규화)', questions: BATCH_6_QUESTIONS },
    { name: '배치 7 (정보시스템구축관리 품질/형상/테스팅)', questions: BATCH_7_QUESTIONS },
    { name: '배치 8 (신기술/보안 네트워크 프로토콜/서브넷)', questions: BATCH_8_QUESTIONS },
    { name: '배치 9 (신기술/보안 암호학/보안모델/인증)', questions: BATCH_9_QUESTIONS },
    { name: '배치 10 (신기술/보안 취약점/공격/클라우드)', questions: BATCH_10_QUESTIONS },
  ];

  const totalCandidates = batches.reduce((acc, b) => acc + b.questions.length, 0);
  console.log(`\n총 입력 후보 문항 수: ${totalCandidates}문항 (10개 마이크로 배치 x 50문항)`);
  console.log(`기존 ALL_QUESTIONS 기준 문항 수: ${ALL_QUESTIONS.length}문항`);
  console.log(`기존 MEMORIZATION_BANK 기준 문항 수: ${MEMORIZATION_BANK.length}문항`);

  // 기존 문항들의 집합
  const seenIds = new Set<string>(ALL_QUESTIONS.map(q => q.id));
  const seenStems = new Set<string>(ALL_QUESTIONS.map(q => `${q.subject}:${normalizeStem(q.question)}`));
  const seenAnswerKeys = new Map<string, string>(); // subject:key -> id
  for (const q of ALL_QUESTIONS) {
    const key = memoAnswerKey(q.answer);
    if (key) {
      seenAnswerKeys.set(`${q.subject}:${key}`, q.id);
    }
  }

  const existingPool: Question[] = [...ALL_QUESTIONS];
  const acceptedNewQuestions: Question[] = [];
  const batchResults: BatchAuditResult[] = [];

  const validSubjects: Set<Subject> = new Set([
    '소프트웨어설계',
    '데이터베이스구축',
    '프로그래밍언어활용',
    '정보시스템구축관리',
    '신기술/보안',
  ]);

  for (const b of batches) {
    const audit: BatchAuditResult = {
      batchName: b.name,
      candidateCount: b.questions.length,
      acceptedCount: 0,
      rejectedCount: 0,
      rejections: [],
    };

    for (const q of b.questions) {
      // 1. 스키마 무결성 검증
      if (!q.id || !q.subject || !q.category || !q.type || !q.question || !q.answer || !q.explanation) {
        audit.rejectedCount++;
        audit.rejections.push({ id: q.id || 'NO_ID', reason: '스키마 누락', detail: '필수 필드 부재' });
        continue;
      }

      if (!validSubjects.has(q.subject)) {
        audit.rejectedCount++;
        audit.rejections.push({ id: q.id, reason: '유효하지 않은 과목', detail: q.subject });
        continue;
      }

      // ID 중복 검사
      if (seenIds.has(q.id)) {
        audit.rejectedCount++;
        audit.rejections.push({ id: q.id, reason: 'ID 중복', detail: `이미 존재하는 ID: ${q.id}` });
        continue;
      }

      // 2. 지문 완전 중복 검사
      const stemKey = `${q.subject}:${normalizeStem(q.question)}`;
      if (seenStems.has(stemKey)) {
        audit.rejectedCount++;
        audit.rejections.push({ id: q.id, reason: '동일 지문 중복', detail: q.question.slice(0, 30) });
        continue;
      }

      // 3. 동일 과목 내 동일 개념(정답 키) 중복 검사
      const ansKey = memoAnswerKey(q.answer);
      const subAnsKey = `${q.subject}:${ansKey}`;
      if (ansKey && seenAnswerKeys.has(subAnsKey)) {
        const existId = seenAnswerKeys.get(subAnsKey)!;
        audit.rejectedCount++;
        audit.rejections.push({
          id: q.id,
          reason: '동일 과목 개념 중복',
          detail: `정답키 [${ansKey}] 기존 문항(${existId})과 중복`,
        });
        continue;
      }

      // 4. 고도화된 근사 중복(isNearDuplicateMemo) 및 토큰 오버랩 검사
      let hasNearDup = false;
      for (const eq of existingPool) {
        if (isNearDuplicateMemo(q, eq)) {
          audit.rejectedCount++;
          audit.rejections.push({
            id: q.id,
            reason: '근사 중복(isNearDuplicateMemo)',
            detail: `기존 문항(${eq.id})과 지문/정답 유사도 임계치 초과`,
          });
          hasNearDup = true;
          break;
        }
      }
      if (hasNearDup) continue;

      // 5. 정답 유효성 및 모바일 적합성 검사 (너무 길거나 모호한 지문)
      if (q.question.length > 250) {
        audit.rejectedCount++;
        audit.rejections.push({ id: q.id, reason: '모바일 부적합', detail: '지문 길이 250자 초과' });
        continue;
      }

      // 모든 검증 통과 -> 채택
      seenIds.add(q.id);
      seenStems.add(stemKey);
      if (ansKey) seenAnswerKeys.set(subAnsKey, q.id);
      existingPool.push(q);
      acceptedNewQuestions.push(q);
      audit.acceptedCount++;
    }

    batchResults.push(audit);
  }

  // 결과 출력
  console.log('\n================================================================');
  console.log('📊 마이크로 배치별 감사 및 검증 결과 보고서');
  console.log('================================================================');

  let totalAccepted = 0;
  let totalRejected = 0;

  for (const res of batchResults) {
    totalAccepted += res.acceptedCount;
    totalRejected += res.rejectedCount;
    const statusIcon = res.rejectedCount === 0 ? '🟢' : '🟡';
    console.log(`\n${statusIcon} [${res.batchName}]`);
    console.log(`- 후보: ${res.candidateCount} | 채택: ${res.acceptedCount} | 탈락: ${res.rejectedCount}`);
    if (res.rejections.length > 0) {
      console.log(`  * 탈락 사유:`);
      for (const r of res.rejections) {
        console.log(`    - [${r.id}] ${r.reason}: ${r.detail}`);
      }
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log(`총 후보 문항 수: ${totalCandidates}문항`);
  console.log(`총 채택 문항 수: ${totalAccepted}문항`);
  console.log(`총 탈락 문항 수: ${totalRejected}문항`);
  console.log(`합격률: ${Math.round((totalAccepted / totalCandidates) * 100)}%`);
  console.log('----------------------------------------------------------------');

  if (totalAccepted === 0) {
    throw new Error('채택된 신규 문항이 없습니다. 빌드를 중단합니다.');
  }

  // 6. 최종 자산 빌드: src/data/questions/memorizationBank.ts 생성
  // 기존 MEMORIZATION_BANK (256문항) + acceptedNewQuestions 병합
  const finalMemorizationBank: Question[] = [...MEMORIZATION_BANK, ...acceptedNewQuestions];

  console.log(`\n기존 MEMORIZATION_BANK: ${MEMORIZATION_BANK.length}문항`);
  console.log(`신규 추가 문항: ${acceptedNewQuestions.length}문항`);
  console.log(`최종 MEMORIZATION_BANK 목표 문항: ${finalMemorizationBank.length}문항`);
  console.log(`최종 전체 ALL_QUESTIONS 예상 문항: ${ALL_QUESTIONS.length + acceptedNewQuestions.length}문항`);

  const targetPath = path.resolve(__dirname, '../src/data/questions/memorizationBank.ts');
  const fileContent = `import { Question } from '../../types/question';

/**
 * 실기 암기 과목 보충 및 표준 기출 문제 은행.
 * 총 ${finalMemorizationBank.length}문항 (과목별 엄선된 고빈출 표준 문항 수록).
 * 오프라인 환경에서도 즉시 100% 동작합니다.
 */
export const MEMORIZATION_BANK: Question[] = ${JSON.stringify(finalMemorizationBank, null, 2)};
`;

  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  console.log(`\n✔ 최종 앱 번들 파일 생성 완료: ${targetPath}`);
  console.log('================================================================\n');

  return {
    totalCandidates,
    totalAccepted,
    totalRejected,
    batchResults,
    finalBankCount: finalMemorizationBank.length,
    finalTotalCount: ALL_QUESTIONS.length + acceptedNewQuestions.length,
  };
}

if ((require as any).main === module) {
  compileAndValidate();
}
