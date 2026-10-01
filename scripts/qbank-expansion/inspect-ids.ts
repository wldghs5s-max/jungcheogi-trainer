// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

declare const __dirname: string;

const baseline = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'baseline-750.json'), 'utf-8'));
const idPrefixes: Record<string, number> = {};

for (const item of baseline.items) {
  const match = item.id.match(/^([A-Za-z_]+)(\d+)?/);
  const prefix = match ? match[1] : 'OTHER';
  idPrefixes[prefix] = (idPrefixes[prefix] || 0) + 1;
}

console.log('ID Prefixes in ALL_QUESTIONS:', idPrefixes);
