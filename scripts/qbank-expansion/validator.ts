// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

import { Question, Subject, QuestionType } from '../../src/types/question';
import { ALL_QUESTIONS } from '../../src/data/questions';
import { isNearDuplicateMemo } from '../../src/utils/memoDedupe';
import { memoAnswerKey } from '../../src/utils/quiz';

export type QuestionAngle =
  | 'TERM_FROM_DEFINITION'
  | 'CHARACTERISTIC'
  | 'PROCESS_SEQUENCE'
  | 'IDENTIFICATION'
  | 'COMPARISON'
  | 'SCENARIO'
  | 'SHORT_CODE'
  | 'SHORT_SQL'
  | 'ADVANTAGE_DISADVANTAGE';

export interface ExpansionCandidate extends Question {
  angle: QuestionAngle;
  targetSubUnit: string; // e.g. "12.1", "12.2", "2.3"
  source: string;
}

export interface RejectionRecord {
  candidateId: string;
  question: string;
  reason: 'SCHEMA_INVALID' | 'EXACT_STEM_DUPLICATE' | 'NEAR_DUPLICATE' | 'ANSWER_KEY_COLLISION' | 'MOBILE_UNSUITABLE' | 'OFF_TOPIC';
  detail: string;
}

export interface BatchValidationResult {
  batchName: string;
  totalCandidates: number;
  accepted: ExpansionCandidate[];
  rejected: RejectionRecord[];
  angleDistribution: Record<string, number>;
  subUnitDistribution: Record<string, number>;
}

function normalizeStem(text: string): string {
  return text.replace(/\s+/g, '').toUpperCase();
}

export function validateCandidateBatch(
  batchName: string,
  candidates: ExpansionCandidate[],
  existingBank: Question[]
): BatchValidationResult {
  const accepted: ExpansionCandidate[] = [];
  const rejected: RejectionRecord[] = [];
  const angleDist: Record<string, number> = {};
  const subUnitDist: Record<string, number> = {};

  const existingIds = new Set(existingBank.map(q => q.id));
  const existingStems = new Set(existingBank.map(q => normalizeStem(q.question)));

  const currentBatchIds = new Set<string>();
  const currentBatchStems = new Set<string>();

  for (const c of candidates) {
    // 1. Schema check
    if (!c.id || !c.subject || !c.category || !c.type || !c.question || !c.answer || !c.explanation) {
      rejected.push({
        candidateId: c.id || 'NO_ID',
        question: c.question || '',
        reason: 'SCHEMA_INVALID',
        detail: '필수 필드(id, subject, category, type, question, answer, explanation) 누락',
      });
      continue;
    }

    // 2. ID collision
    if (existingIds.has(c.id) || currentBatchIds.has(c.id)) {
      rejected.push({
        candidateId: c.id,
        question: c.question,
        reason: 'SCHEMA_INVALID',
        detail: `ID 중복: ${c.id}`,
      });
      continue;
    }

    // 3. Mobile length check (지문이 250자를 초과하면 모바일 단답형으로 부적합)
    if (c.question.length > 250) {
      rejected.push({
        candidateId: c.id,
        question: c.question,
        reason: 'MOBILE_UNSUITABLE',
        detail: `지문 길이 초과 (${c.question.length}자 > 250자)`,
      });
      continue;
    }

    // 4. Exact stem duplicate
    const norm = normalizeStem(c.question);
    if (existingStems.has(norm) || currentBatchStems.has(norm)) {
      rejected.push({
        candidateId: c.id,
        question: c.question,
        reason: 'EXACT_STEM_DUPLICATE',
        detail: '완전 동일한 지문 존재',
      });
      continue;
    }

    // 5. Near duplicate check against existing bank
    let nearDupHit: { id: string; reason: string } | null = null;
    for (const eq of existingBank) {
      if (isNearDuplicateMemo(c, eq)) {
        nearDupHit = {
          id: eq.id,
          reason: `기존 문제(${eq.id})와 근사 중복 (답안키: ${memoAnswerKey(c.answer)} vs ${memoAnswerKey(eq.answer)})`,
        };
        break;
      }
    }

    if (nearDupHit) {
      rejected.push({
        candidateId: c.id,
        question: c.question,
        reason: 'NEAR_DUPLICATE',
        detail: nearDupHit.reason,
      });
      continue;
    }

    // 6. Near duplicate check against current batch accepted
    for (const ac of accepted) {
      if (isNearDuplicateMemo(c, ac)) {
        nearDupHit = {
          id: ac.id,
          reason: `배치 내 수락 문제(${ac.id})와 근사 중복`,
        };
        break;
      }
    }

    if (nearDupHit) {
      rejected.push({
        candidateId: c.id,
        question: c.question,
        reason: 'NEAR_DUPLICATE',
        detail: nearDupHit.reason,
      });
      continue;
    }

    // 통과
    currentBatchIds.add(c.id);
    currentBatchStems.add(norm);
    accepted.push(c);

    angleDist[c.angle] = (angleDist[c.angle] || 0) + 1;
    subUnitDist[c.targetSubUnit] = (subUnitDist[c.targetSubUnit] || 0) + 1;
  }

  return {
    batchName,
    totalCandidates: candidates.length,
    accepted,
    rejected,
    angleDistribution: angleDist,
    subUnitDistribution: subUnitDist,
  };
}
