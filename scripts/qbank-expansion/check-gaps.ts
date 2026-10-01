// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

declare const __dirname: string;

const coveragePath = path.resolve(__dirname, '../../reports/qbank-coverage/qbank-coverage-2026-09-29.json');
const raw = fs.readFileSync(coveragePath, 'utf-8');
const data = JSON.parse(raw);

console.log('=== Coverage Gap Analysis (NONE & THIN) ===');
for (const unit of data.majorUnits) {
  for (const sub of unit.subUnits) {
    if (sub.coverageState === 'NONE' || sub.coverageState === 'THIN') {
      console.log(`[${sub.coverageState}] ${sub.subUnitId} ${sub.subUnitName} (현재: ${sub.primaryCount}문항, 추천: ${sub.recommendation})`);
      console.log(`   핵심개념: ${sub.keyConcepts.slice(0, 6).join(', ')}`);
    }
  }
}
