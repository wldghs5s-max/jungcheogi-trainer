import { Question } from "../types/question";

const GENERATE_BATCH = 6;

type Builder = (index: number) => Question;

function id(index: number, tag: string): string {
  return `AUTO_GEN_${tag}_${index}_${Date.now()}`;
}

const cBuilders: Builder[] = [
  (index) => {
    const n = 4 + (index % 8);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      if (i % 2 === 0) sum += i;
    }
    return {
      id: id(index, "C_EVEN"),
      subject: "프로그래밍언어활용",
      category: "C",
      subCategory: "반복문",
      type: "CODE_TRACE",
      question: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= ${n}; i++) {
        if (i % 2 == 0) sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      language: "C",
      answer: String(sum),
      explanation: `1부터 ${n}까지의 짝수만 더합니다. 실행 결과는 ${sum}입니다.`,
      difficulty: "EASY",
      keywords: ["C언어", "반복문", "짝수합"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const n = 3 + (index % 4);
    let fact = 1;
    for (let i = 1; i <= n; i++) fact *= i;
    return {
      id: id(index, "C_FACT"),
      subject: "프로그래밍언어활용",
      category: "C",
      subCategory: "재귀",
      type: "CODE_TRACE",
      question: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>
int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}
int main() {
    printf("%d", f(${n}));
    return 0;
}`,
      language: "C",
      answer: String(fact),
      explanation: `f(${n})은 ${n}의 팩토리얼입니다. 실행 결과는 ${fact}입니다.`,
      difficulty: "EASY",
      keywords: ["C언어", "재귀", "팩토리얼"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const a = 10 + (index % 5) * 2;
    const step = 10;
    const arr = [a, a + step, a + step * 2, a + step * 3];
    const result = arr[2] + arr[0];
    return {
      id: id(index, "C_PTR"),
      subject: "프로그래밍언어활용",
      category: "C",
      subCategory: "포인터",
      type: "CODE_TRACE",
      question: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>
int main() {
    int a[4] = {${arr.join(", ")}};
    int *p = a;
    printf("%d", *(p + 2) + *p);
    return 0;
}`,
      language: "C",
      answer: String(result),
      explanation: `*(p+2)는 a[2]인 ${arr[2]}, *p는 a[0]인 ${arr[0]}입니다. 합은 ${result}입니다.`,
      difficulty: "MEDIUM",
      keywords: ["C언어", "포인터", "배열"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const rows = 2 + (index % 3);
    const cols = 2 + ((index + 1) % 3);
    const count = rows * cols;
    return {
      id: id(index, "C_NEST"),
      subject: "프로그래밍언어활용",
      category: "C",
      subCategory: "중첩반복",
      type: "CODE_TRACE",
      question: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>
int main() {
    int cnt = 0;
    for (int i = 0; i < ${rows}; i++) {
        for (int j = 0; j < ${cols}; j++) {
            cnt++;
        }
    }
    printf("%d", cnt);
    return 0;
}`,
      language: "C",
      answer: String(count),
      explanation: `바깥 반복 ${rows}회, 안쪽 반복 ${cols}회이므로 cnt는 ${count}입니다.`,
      difficulty: "EASY",
      keywords: ["C언어", "중첩반복", "카운트"],
      source: "C/Java 자동 생성",
    };
  },
];

const javaBuilders: Builder[] = [
  (index) => {
    const arr = [index * 2 + 1, index * 3 + 2, index + 7];
    const max = Math.max(...arr);
    return {
      id: id(index, "J_MAX"),
      subject: "프로그래밍언어활용",
      category: "Java",
      subCategory: "배열",
      type: "CODE_TRACE",
      question: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {${arr.join(", ")}};
        int max = arr[0];
        for (int v : arr) {
            if (v > max) max = v;
        }
        System.out.print(max);
    }
}`,
      language: "JAVA",
      answer: String(max),
      explanation: `배열 ${JSON.stringify(arr)}의 최댓값은 ${max}입니다.`,
      difficulty: "EASY",
      keywords: ["Java", "배열", "최댓값"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const n = 3 + (index % 4);
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return {
      id: id(index, "J_SUM"),
      subject: "프로그래밍언어활용",
      category: "Java",
      subCategory: "반복문",
      type: "CODE_TRACE",
      question: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= ${n}; i++) {
            sum += i;
        }
        System.out.print(sum);
    }
}`,
      language: "JAVA",
      answer: String(sum),
      explanation: `1부터 ${n}까지 합은 ${sum}입니다.`,
      difficulty: "EASY",
      keywords: ["Java", "반복문", "누적합"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const word = ["CODE", "JAVA", "EXAM", "TEST", "QUIZ"][index % 5];
    const result = word.length + word.charCodeAt(0) - 65;
    return {
      id: id(index, "J_STR"),
      subject: "프로그래밍언어활용",
      category: "Java",
      subCategory: "문자열",
      type: "CODE_TRACE",
      question: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s = "${word}";
        System.out.print(s.length() + (s.charAt(0) - 'A'));
    }
}`,
      language: "JAVA",
      answer: String(result),
      explanation: `"${word}".length()는 ${word.length}이고, 첫 글자 '${word[0]}'와 'A'의 차이는 ${word.charCodeAt(0) - 65}입니다. 합은 ${result}입니다.`,
      difficulty: "MEDIUM",
      keywords: ["Java", "문자열", "length", "charAt"],
      source: "C/Java 자동 생성",
    };
  },
  (index) => {
    const times = 2 + (index % 3);
    return {
      id: id(index, "J_STATIC"),
      subject: "프로그래밍언어활용",
      category: "Java",
      subCategory: "static",
      type: "CODE_TRACE",
      question: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Count {
    static int a = 0;
    Count() { a++; }
}
public class Main {
    public static void main(String[] args) {
${Array.from({ length: times }, () => "        new Count();").join("\n")}
        System.out.print(Count.a);
    }
}`,
      language: "JAVA",
      answer: String(times),
      explanation: `객체를 ${times}번 생성하므로 static 변수 a는 ${times}입니다.`,
      difficulty: "EASY",
      keywords: ["Java", "static", "생성자"],
      source: "C/Java 자동 생성",
    };
  },
];

export function generateProgrammingPracticeBundle(startIndex: number): Question[] {
  const builders = [...cBuilders, ...javaBuilders];
  const questions: Question[] = [];
  for (let i = 0; i < GENERATE_BATCH; i++) {
    const index = startIndex + i;
    questions.push(builders[index % builders.length](index));
  }
  return questions;
}
