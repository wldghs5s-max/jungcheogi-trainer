import { Subject } from "./question";

export interface TheoryArticle {
  id: string;
  subject: Subject;
  category: string;
  title: string;
  importance: 1 | 2 | 3; // 3: 최다빈출
  analogy: string; // 초보자를 위한 쉬운 일상 비유
  coreConcepts: string[]; // 핵심 개념 요약 불릿
  examPoints: string[]; // 시험 출제 포인트 및 함정
  relatedKeywords: string[]; // 관련 문제 검색용 키워드
}

export interface MnemonicSubItem {
  letter: string;
  name: string;
  desc: string;
}

export interface MnemonicItem {
  id: string;
  subject: Subject;
  title: string; // 예: "GoF 디자인 패턴 - 생성 패턴 5가지"
  acronym: string; // 예: "추 · 빌 · 팩 · 프 · 싱"
  catchphrase: string; // 예: "추운 빌딩에서 팩(Pack) 소주를 프로답게 싱글로 마신다"
  items: MnemonicSubItem[];
  importance: 1 | 2 | 3;
  frequency: string; // 출제 빈도 (예: "실기 기출 단골 1위 · 객관식/단답형 최빈출")
  trapPoint: string; // 시험 함정 방지 팁
}
