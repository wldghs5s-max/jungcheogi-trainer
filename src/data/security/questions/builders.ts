import {
  Difficulty,
  Question,
  QuestionSourceKind,
  SecuritySyllabusStandard,
} from "../../../types/question";
import {
  getSecurityChapterById,
  getSecuritySectionById,
} from "../securityTaxonomy";

export interface SecurityQuestionSeed {
  id: string;
  category: string;
  question: string;
  options: [string, string, string, string];
  answer: string;
  explanation: string;
  difficulty: Difficulty;
  keywords: string[];
  syllabusItemCode?: string;
  source?: string;
}

export interface SecuritySectionBatchMeta {
  sectionId: string;
  syllabusStandard: SecuritySyllabusStandard;
  is2027RevisionPrep?: boolean;
  sourceKind?: QuestionSourceKind;
  defaultSource?: string;
}

/**
 * 공식 출제기준 분류(SECURITY_OFFICIAL_CHAPTERS / SECTIONS)에서 과목·챕터·세부 섹션 메타데이터를
 * 자동으로 조회해 문항 배열을 생성합니다. 섹션 ID 오타를 런타임/테스트에서 즉시 차단합니다.
 */
export function buildSecuritySectionQuestions(
  meta: SecuritySectionBatchMeta,
  seeds: SecurityQuestionSeed[],
): Question[] {
  const sectionNode = getSecuritySectionById(meta.sectionId);
  if (!sectionNode) {
    throw new Error(`유효하지 않은 보안기사 sectionId: ${meta.sectionId}`);
  }
  const chapterNode = getSecurityChapterById(sectionNode.chapterId);
  if (!chapterNode) {
    throw new Error(
      `유효하지 않은 보안기사 chapterId: ${sectionNode.chapterId}`,
    );
  }

  const defaultSource =
    meta.defaultSource ??
    (meta.syllabusStandard === "2027_2029" || meta.is2027RevisionPrep
      ? "정보보안기사 필기 2027 개정 대비 창작 문제"
      : "정보보안기사 필기 창작 문제");

  return seeds.map((seed) => {
    const q: Question = {
      id: seed.id,
      certification: "SECURITY",
      subject: sectionNode.subject,
      category: seed.category,
      chapterId: chapterNode.chapterId,
      chapter: chapterNode.title,
      sectionId: sectionNode.sectionId,
      section: sectionNode.title,
      sourceKind: meta.sourceKind ?? "CREATED",
      syllabusStandard: meta.syllabusStandard,
      syllabusItemCode: seed.syllabusItemCode ?? sectionNode.syllabusItemCode,
      type: "MULTIPLE_CHOICE",
      question: seed.question,
      options: [...seed.options],
      answer: seed.answer,
      explanation: seed.explanation,
      difficulty: seed.difficulty,
      keywords: seed.keywords,
      source: seed.source ?? defaultSource,
    };

    if (meta.is2027RevisionPrep) {
      q.is2027RevisionPrep = true;
    }

    return q;
  });
}
