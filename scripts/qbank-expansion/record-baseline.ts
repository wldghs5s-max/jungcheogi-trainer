// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';
// @ts-ignore
import crypto from 'crypto';

declare const __dirname: string;

import { ALL_QUESTIONS, SUBJECTS } from '../../src/data/questions';
import { ARCHIVED_QUESTIONS } from '../../src/data/questions/archivedBank';
import { Question } from '../../src/types/question';

interface BaselineStats {
  timestamp: string;
  totalActiveQuestions: number;
  totalArchivedQuestions: number;
  sourceTypeDistribution: Record<string, number>;
  subjectDistribution: Record<string, number>;
  typeDistribution: Record<string, number>;
  checksum: string;
  items: Array<{
    id: string;
    subject: string;
    category: string;
    type: string;
    question: string;
    answer: string | string[];
    explanation: string;
    source?: string;
  }>;
}

export function recordBaseline(): BaselineStats {
  console.log('=== Recording Current QBank Baseline ===');
  console.log(`Active questions: ${ALL_QUESTIONS.length}`);
  console.log(`Archived questions: ${ARCHIVED_QUESTIONS.length}`);

  const sourceDist: Record<string, number> = {};
  const subjectDist: Record<string, number> = {};
  const typeDist: Record<string, number> = {};

  const items = ALL_QUESTIONS.map(q => {
    const src = q.source || 'NONE';
    sourceDist[src] = (sourceDist[src] || 0) + 1;
    subjectDist[q.subject] = (subjectDist[q.subject] || 0) + 1;
    typeDist[q.type] = (typeDist[q.type] || 0) + 1;

    return {
      id: q.id,
      subject: q.subject,
      category: q.category,
      type: q.type,
      question: q.question,
      answer: q.answer,
      explanation: q.explanation,
      source: q.source,
    };
  });

  const contentStr = JSON.stringify(items);
  const hash = crypto.createHash('sha256').update(contentStr).digest('hex');

  const baseline: BaselineStats = {
    timestamp: new Date().toISOString(),
    totalActiveQuestions: ALL_QUESTIONS.length,
    totalArchivedQuestions: ARCHIVED_QUESTIONS.length,
    sourceTypeDistribution: sourceDist,
    subjectDistribution: subjectDist,
    typeDistribution: typeDist,
    checksum: hash,
    items,
  };

  const outputPath = path.resolve(__dirname, 'baseline-750.json');
  fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2), 'utf-8');
  console.log(`Baseline recorded to: ${outputPath}`);
  console.log(`SHA-256 Checksum: ${hash}`);
  console.log('Subject Distribution:', subjectDist);
  console.log('Type Distribution:', typeDist);
  console.log('Source Distribution:', sourceDist);

  return baseline;
}

recordBaseline();
