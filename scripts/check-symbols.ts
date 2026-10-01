import { ALL_QUESTIONS } from '../src/data/questions';
import { checkAnswer, normalizeAnswer } from '../src/utils/quiz';

console.log('=== Checking symbol answers in ALL_QUESTIONS ===');
for (const q of ALL_QUESTIONS) {
  const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
  for (const a of answers) {
    if (a.includes('->') || a.includes('::') || a.includes('==') || a.includes('!=') || a === '*' || a === '&') {
      console.log(`[Found] ${q.id} (${q.subject} > ${q.category}): answer = ${JSON.stringify(q.answer)}`);
      console.log(`   question: ${q.question.slice(0, 60)}...`);
      const isCorrect = checkAnswer(a, q.answer, q);
      console.log(`   checkAnswer("${a}", q.answer) => ${isCorrect}`);
      console.log(`   normalizeAnswer("${a}") => "${normalizeAnswer(a)}"`);
    }
  }
}
