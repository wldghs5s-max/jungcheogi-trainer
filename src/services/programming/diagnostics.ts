import { QuestionRepository } from '../../repositories/questionRepository';
import { GeneratorRegistry } from './registry';
import { ProgrammingQuestionType, ProgrammingTopic, TOPIC_METADATA } from './taxonomy';
import { ProgrammingEngine } from './programmingEngine';

export interface TopicCountStat {
  topic: ProgrammingTopic;
  name: string;
  count: number;
}

export interface TypeCountStat {
  type: ProgrammingQuestionType;
  count: number;
}

export interface EngineDiagnosticsReport {
  registeredGeneratorsCount: number;
  generatorNames: string[];
  totalProgrammingQuestions: number;
  byLanguage: Record<string, number>;
  byTopic: TopicCountStat[];
  byDifficulty: Record<string, number>;
  uniqueFingerprintsCount: number;
  duplicateRatePercent: number;
}

export interface BenchmarkResult {
  totalGenerated: number;
  uniqueFingerprints: number;
  uniqueRatePercent: number;
  topicDistribution: Record<string, number>;
  typeDistribution: Record<string, number>;
  languageDistribution: Record<string, number>;
  elapsedTimeMs: number;
}

export class ProgrammingDiagnostics {
  /**
   * 현재 문제 은행의 프로그래밍 문제 상태를 정밀 진단합니다.
   */
  static async getDiagnostics(): Promise<EngineDiagnosticsReport> {
    ProgrammingEngine.init();
    const all = QuestionRepository.getAll().filter(
      (q) => q.subject === '프로그래밍언어활용',
    );

    const byLanguage: Record<string, number> = {};
    const byTopicMap: Record<string, number> = {};
    const byDifficulty: Record<string, number> = {};
    const fingerprints = new Set<string>();

    for (const q of all) {
      const lang = q.category || '기타';
      byLanguage[lang] = (byLanguage[lang] || 0) + 1;

      const topicKey = q.programmingTopic || q.subCategory || '기타';
      byTopicMap[topicKey] = (byTopicMap[topicKey] || 0) + 1;

      const diff = q.difficulty || 'MEDIUM';
      byDifficulty[diff] = (byDifficulty[diff] || 0) + 1;

      if (q.structuralFingerprint) {
        fingerprints.add(q.structuralFingerprint);
      }
    }

    const byTopic: TopicCountStat[] = Object.keys(TOPIC_METADATA).map((tKey) => {
      const topic = tKey as ProgrammingTopic;
      const meta = TOPIC_METADATA[topic];
      return {
        topic,
        name: meta.name,
        count: byTopicMap[topic] || byTopicMap[meta.name] || 0,
      };
    });

    const dupRate = all.length > 0 && fingerprints.size > 0
      ? Number((((all.length - fingerprints.size) / all.length) * 100).toFixed(1))
      : 0;

    return {
      registeredGeneratorsCount: GeneratorRegistry.count(),
      generatorNames: GeneratorRegistry.getAll().map((g) => g.name),
      totalProgrammingQuestions: all.length,
      byLanguage,
      byTopic,
      byDifficulty,
      uniqueFingerprintsCount: fingerprints.size,
      duplicateRatePercent: Math.max(0, dupRate),
    };
  }

  /**
   * 인메모리에서 count개의 문제를 신규 생성하여 다양성 및 고유율 벤치마크를 수행합니다.
   */
  static async runBenchmark(count = 50): Promise<BenchmarkResult> {
    ProgrammingEngine.init();
    const startTime = Date.now();

    const fingerprints = new Set<string>();
    const topicDist: Record<string, number> = {};
    const typeDist: Record<string, number> = {};
    const langDist: Record<string, number> = {};

    for (let i = 0; i < count; i++) {
      const q = await ProgrammingEngine.generateQuestion({
        seed: i * 37 + 7,
        recordHistory: false,
      });
      fingerprints.add(q.structuralFingerprint);


      topicDist[q.topic] = (topicDist[q.topic] || 0) + 1;
      typeDist[q.programmingType] = (typeDist[q.programmingType] || 0) + 1;
      langDist[q.programmingLanguage] = (langDist[q.programmingLanguage] || 0) + 1;
    }

    const elapsed = Date.now() - startTime;
    const uniqueRate = Number(((fingerprints.size / count) * 100).toFixed(1));

    return {
      totalGenerated: count,
      uniqueFingerprints: fingerprints.size,
      uniqueRatePercent: uniqueRate,
      topicDistribution: topicDist,
      typeDistribution: typeDist,
      languageDistribution: langDist,
      elapsedTimeMs: elapsed,
    };
  }
}
