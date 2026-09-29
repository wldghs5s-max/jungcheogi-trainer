// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";

declare const __dirname: string;
declare const module: any;
import { Question } from "../src/types/question";
import { MEMORIZATION_BANK } from "../src/data/questions/memorizationBank";
import { ALL_QUESTIONS } from "../src/data/questions";
import { isNearDuplicateMemo } from "../src/utils/memoDedupe";
import { memoAnswerKey } from "../src/utils/quiz";

import { SE_QUESTIONS } from "./qbank-data/se";
import { DB_QUESTIONS } from "./qbank-data/db";
import { SEC_QUESTIONS } from "./qbank-data/sec";
import { IS_QUESTIONS } from "./qbank-data/is";

function normalizeStem(text: string): string {
  return text.replace(/\s+/g, "").toUpperCase();
}

export function buildQBank() {
  console.log("=== 정보처리기사 핵심 문제 은행(QBank) 빌더 시작 ===");
  console.log(`기존 MEMORIZATION_BANK 문항 수: ${MEMORIZATION_BANK.length}`);
  console.log(`기존 전체 문제 수: ${ALL_QUESTIONS.length}`);

  const candidates: Question[] = [
    ...SE_QUESTIONS,
    ...DB_QUESTIONS,
    ...SEC_QUESTIONS,
    ...IS_QUESTIONS,
  ];

  console.log(`신규 생성 대상 문항 수: ${candidates.length}`);

  // 1. 유효성 검증
  const idSet = new Set<string>();
  const stemSet = new Set<string>();

  for (const q of candidates) {
    if (
      !q.id ||
      !q.subject ||
      !q.category ||
      !q.type ||
      !q.question ||
      !q.answer ||
      !q.explanation
    ) {
      throw new Error(`문항 스키마 누락 오류: ${JSON.stringify(q)}`);
    }
    if (idSet.has(q.id)) {
      throw new Error(`신규 문항 ID 중복: ${q.id}`);
    }
    idSet.add(q.id);

    const stem = normalizeStem(q.question);
    if (stemSet.has(stem)) {
      throw new Error(`신규 문항 지문 중복: ${q.id} - ${q.question}`);
    }
    stemSet.add(stem);
  }

  // 2. 기존 문제와의 중복 검사
  const existingStems = new Set<string>();
  for (const eq of ALL_QUESTIONS) {
    existingStems.add(normalizeStem(eq.question));
  }

  const duplicatesWithExisting: {
    newId: string;
    existingId: string;
    reason: string;
  }[] = [];

  for (const nq of candidates) {
    const stem = normalizeStem(nq.question);
    if (existingStems.has(stem)) {
      duplicatesWithExisting.push({
        newId: nq.id,
        existingId: "stem-match",
        reason: "완전 동일 지문",
      });
      continue;
    }

    for (const eq of ALL_QUESTIONS) {
      if (isNearDuplicateMemo(nq, eq)) {
        duplicatesWithExisting.push({
          newId: nq.id,
          existingId: eq.id,
          reason: `근사 중복 (답안키: ${memoAnswerKey(nq.answer)} vs ${memoAnswerKey(eq.answer)})`,
        });
        break;
      }
    }
  }

  if (duplicatesWithExisting.length > 0) {
    console.error("기존 문제와 충돌된 문항 목록:", duplicatesWithExisting);
    throw new Error(
      `기존 문제와 충돌 발생 (${duplicatesWithExisting.length}건). 수정이 필요합니다.`,
    );
  }

  console.log("✔ 유효성 검증 및 기존 문항과의 무중복(0 충돌) 검증 통과!");

  // 3. 기존 MEMORIZATION_BANK와 병합
  const combinedBank: Question[] = [...MEMORIZATION_BANK, ...candidates];

  console.log(`최종 MEMORIZATION_BANK 문항 수: ${combinedBank.length}`);

  // 4. src/data/questions/memorizationBank.ts 파일 생성
  const targetPath = path.resolve(
    __dirname,
    "../src/data/questions/memorizationBank.ts",
  );

  const fileContent = `import { Question } from "../../types/question";

/**
 * 실기 암기 과목 보충 및 표준 기출 문제 은행.
 * 총 ${combinedBank.length}문항 (과목별 엄선된 고빈출 표준 문항 수록).
 * 오프라인 환경에서도 즉시 100% 동작합니다.
 */
export const MEMORIZATION_BANK: Question[] = ${JSON.stringify(combinedBank, null, 2)};
`;

  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`✔ 파일 저장 완료: ${targetPath}`);
  console.log("=== QBank 빌드 완료 ===");
}

if ((require as any).main === module) {
  buildQBank();
}
