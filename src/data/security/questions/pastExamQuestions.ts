import { Question } from "../../../types/question";

/**
 * 정보보안기사 필기 실제 기출 문제 저장소 (`sourceKind: "PAST_EXAM"`)
 *
 * 앱에 수록할 수 있는 기출 원문을 이 배열에 등록합니다.
 * 문항의 출처와 연도·회차를 확인한 뒤 `sourceKind: "PAST_EXAM"`, `examYear`,
 * `examRound`, `sectionId`를 지정하면 실제 기출 필터와 연도·회차 배지에 연결됩니다.
 * 온라인 CBT와 복원 자료 링크는 홈의 실제 기출 탭에서 제공합니다.
 */
export const SECURITY_PAST_EXAM_QUESTIONS: Question[] = [];
