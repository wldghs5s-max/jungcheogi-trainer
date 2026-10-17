import { CodeLanguage, Difficulty, Question } from '../../types/question';

/**
 * 필기구 없이 암산으로 풀 수 있는 짧은 코드 결과 문제 (practiceKind: QUICK_CALC).
 *
 * 작성 원칙
 * - 한 문제에서 한 가지 개념만 묻는다. (연산자, 증감, 형변환, 문자열, 슬라이싱, 상속 등)
 * - 정답은 한 줄 출력이며, 공백/대소문자까지 그대로 비교되므로 출력 형식이 단순해야 한다.
 * - 리스트/딕셔너리 같은 리터럴 전체를 출력하는 문제는 쓰지 않는다. (공백 차이로 오답 처리 방지)
 * - 모든 문항은 scripts/verify-quick-practice.ts 로 실제 컴파일/실행 결과와 대조 검증한다.
 */
interface QuickCalcSeed {
  id: string;
  language: Extract<CodeLanguage, 'C' | 'JAVA' | 'PYTHON'>;
  topic: string;
  difficulty: Difficulty;
  code: string;
  answer: string;
  explanation: string;
  keywords: string[];
}

const LANGUAGE_META: Record<QuickCalcSeed['language'], { category: string; label: string }> = {
  C: { category: 'C', label: 'C언어' },
  JAVA: { category: 'Java', label: 'Java' },
  PYTHON: { category: 'Python', label: 'Python' },
};

function toQuestion(seed: QuickCalcSeed): Question {
  const meta = LANGUAGE_META[seed.language];
  return {
    id: seed.id,
    subject: '프로그래밍언어활용',
    category: meta.category,
    subCategory: seed.topic,
    type: 'CODE_TRACE',
    question: `다음 ${meta.label} 프로그램의 실행 결과를 출력 형식 그대로 쓰시오.`,
    code: seed.code,
    language: seed.language,
    answer: seed.answer,
    explanation: seed.explanation,
    difficulty: seed.difficulty,
    keywords: [meta.label, ...seed.keywords],
    source: '유형 연습(실행 검증)',
    practiceKind: 'QUICK_CALC',
  };
}

export const quickCalcSeeds: QuickCalcSeed[] = [
  // ───────────────────────── C언어 ─────────────────────────
  {
    id: 'QC_C_001',
    language: 'C',
    topic: '나눗셈/나머지',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    printf("%d", 17 / 5 + 17 % 5);
    return 0;
}`,
    answer: '5',
    explanation: '정수끼리의 나눗셈은 몫만 남습니다. 17 / 5 = 3, 17 % 5 = 2 이므로 3 + 2 = 5 입니다.',
    keywords: ['정수 나눗셈', '나머지 연산자'],
  },
  {
    id: 'QC_C_002',
    language: 'C',
    topic: '증감 연산자',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = a++;
    int c = ++a;
    printf("%d %d %d", a, b, c);
    return 0;
}`,
    answer: '7 5 7',
    explanation: '후위 증가(a++)는 현재 값을 먼저 쓰고 나중에 증가시킵니다. b = 5(이후 a = 6). 전위 증가(++a)는 먼저 증가시킨 뒤 씁니다. a = 7, c = 7. 따라서 a, b, c = 7, 5, 7 입니다.',
    keywords: ['전위 증가', '후위 증가'],
  },
  {
    id: 'QC_C_003',
    language: 'C',
    topic: '비트 연산',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    printf("%d", (6 & 3) + (6 | 3) + (6 ^ 3));
    return 0;
}`,
    answer: '14',
    explanation: '6 = 110, 3 = 011 (2진수). AND = 010 = 2, OR = 111 = 7, XOR = 101 = 5 입니다. 2 + 7 + 5 = 14.',
    keywords: ['비트 AND', '비트 OR', '비트 XOR'],
  },
  {
    id: 'QC_C_004',
    language: 'C',
    topic: '시프트 연산',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    printf("%d", (1 << 4) + (20 >> 2));
    return 0;
}`,
    answer: '21',
    explanation: '왼쪽 시프트 1 << 4 는 2의 4제곱 = 16, 오른쪽 시프트 20 >> 2 는 20 / 4 = 5 입니다. 16 + 5 = 21.',
    keywords: ['시프트 연산', '비트 이동'],
  },
  {
    id: 'QC_C_005',
    language: 'C',
    topic: '삼항 연산자',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    int x = 7;
    int y = (x % 2 == 0) ? x / 2 : x * 3 + 1;
    printf("%d", y);
    return 0;
}`,
    answer: '22',
    explanation: '7 % 2 == 0 은 거짓이므로 ? : 의 뒤쪽 식 x * 3 + 1 = 22 가 선택됩니다.',
    keywords: ['삼항 연산자', '조건 연산자'],
  },
  {
    id: 'QC_C_006',
    language: 'C',
    topic: '단락 평가',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int a = 1, b = 0;
    if (a++ || b++) {
        a += 10;
    }
    printf("%d %d", a, b);
    return 0;
}`,
    answer: '12 0',
    explanation: '|| 는 왼쪽이 참이면 오른쪽을 평가하지 않습니다(단락 평가). a++ 는 1(참)이고 a는 2가 되며 b++ 는 실행되지 않아 b = 0 입니다. 조건이 참이므로 a += 10 으로 a = 12 입니다.',
    keywords: ['단락 평가', '논리 연산자', 'short-circuit'],
  },
  {
    id: 'QC_C_007',
    language: 'C',
    topic: 'switch 문',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int x = 2, r = 0;
    switch (x) {
        case 1: r += 1;
        case 2: r += 2;
        case 3: r += 3; break;
        case 4: r += 4;
    }
    printf("%d", r);
    return 0;
}`,
    answer: '5',
    explanation: 'case 2 부터 실행하며 break 가 없으면 아래 case 로 계속 내려갑니다(fall-through). r += 2 후 case 3 의 r += 3 을 실행하고 break 로 빠져나오므로 r = 5 입니다.',
    keywords: ['switch', 'break', 'fall-through'],
  },
  {
    id: 'QC_C_008',
    language: 'C',
    topic: '포인터',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;
    *p = *p + 5;
    printf("%d", a);
    return 0;
}`,
    answer: '15',
    explanation: 'p 는 a 의 주소를 가리키므로 *p 를 바꾸면 a 가 바뀝니다. *p = 10 + 5 이므로 a = 15 입니다.',
    keywords: ['포인터', '역참조'],
  },
  {
    id: 'QC_C_009',
    language: 'C',
    topic: '포인터 연산',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int a[] = {3, 6, 9, 12};
    int *p = a + 1;
    printf("%d", *p + *(p + 2));
    return 0;
}`,
    answer: '18',
    explanation: 'p 는 a[1] 을 가리키므로 *p = 6 입니다. p + 2 는 a[3] 이므로 *(p + 2) = 12 입니다. 6 + 12 = 18.',
    keywords: ['포인터 연산', '배열'],
  },
  {
    id: 'QC_C_010',
    language: 'C',
    topic: '값에 의한 호출',
    difficulty: 'EASY',
    code: `#include <stdio.h>

void add(int n) {
    n = n + 10;
}

int main() {
    int x = 5;
    add(x);
    printf("%d", x);
    return 0;
}`,
    answer: '5',
    explanation: 'C 는 기본적으로 값에 의한 호출(call by value)입니다. add 안의 n 은 x 의 복사본이므로 main 의 x 는 바뀌지 않아 5 가 출력됩니다.',
    keywords: ['값에 의한 호출', 'call by value'],
  },
  {
    id: 'QC_C_011',
    language: 'C',
    topic: 'static 변수',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int count() {
    static int c = 0;
    c++;
    return c;
}

int main() {
    count();
    count();
    printf("%d", count());
    return 0;
}`,
    answer: '3',
    explanation: 'static 지역 변수는 함수가 끝나도 사라지지 않고 값이 유지되며 초기화도 한 번만 됩니다. count() 를 세 번 호출하면 c 는 1, 2, 3 이 되고 마지막 반환값 3 이 출력됩니다.',
    keywords: ['static', '정적 변수'],
  },
  {
    id: 'QC_C_012',
    language: 'C',
    topic: '매크로',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>
#define SQ(x) x * x

int main() {
    printf("%d", SQ(2 + 1));
    return 0;
}`,
    answer: '5',
    explanation: '매크로는 단순 텍스트 치환이라 SQ(2 + 1) 은 2 + 1 * 2 + 1 이 됩니다. 곱셈이 먼저 계산되어 2 + 2 + 1 = 5 입니다. (괄호가 있었다면 9)',
    keywords: ['#define', '매크로', '연산자 우선순위'],
  },
  {
    id: 'QC_C_013',
    language: 'C',
    topic: '음수 나눗셈',
    difficulty: 'HARD',
    code: `#include <stdio.h>

int main() {
    printf("%d %d", -7 / 2, -7 % 3);
    return 0;
}`,
    answer: '-3 -1',
    explanation: 'C 의 정수 나눗셈은 0 방향으로 소수점을 버립니다. -7 / 2 = -3.5 에서 -3 이 됩니다. 나머지는 피제수의 부호를 따르므로 -7 % 3 = -1 입니다.',
    keywords: ['음수 나눗셈', '나머지 부호'],
  },
  {
    id: 'QC_C_014',
    language: 'C',
    topic: '재귀 함수',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}

int main() {
    printf("%d", sum(5));
    return 0;
}`,
    answer: '15',
    explanation: 'sum(5) = 5 + 4 + 3 + 2 + 1 + sum(0) = 15 입니다. 1부터 n까지의 합을 재귀로 구하는 전형적인 형태입니다.',
    keywords: ['재귀 함수', '누적 합'],
  },
  {
    id: 'QC_C_015',
    language: 'C',
    topic: 'continue/break',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int s = 0;
    for (int i = 0; i < 10; i++) {
        if (i == 3) continue;
        if (i == 6) break;
        s += i;
    }
    printf("%d", s);
    return 0;
}`,
    answer: '12',
    explanation: 'i = 3 은 continue 로 건너뛰고, i = 6 에서 break 로 반복을 끝냅니다. 더해지는 값은 0, 1, 2, 4, 5 이므로 합은 12 입니다.',
    keywords: ['continue', 'break', '반복문'],
  },
  {
    id: 'QC_C_016',
    language: 'C',
    topic: '문자와 정수',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    char c = 'A';
    c += 3;
    printf("%c %d", c, c - 'A');
    return 0;
}`,
    answer: 'D 3',
    explanation: "문자는 아스키 코드 정수이므로 'A'(65)에 3을 더하면 'D'(68)입니다. %c 는 문자 D 를, c - 'A' 는 68 - 65 = 3 을 출력합니다.",
    keywords: ['char', '아스키 코드'],
  },
  {
    id: 'QC_C_017',
    language: 'C',
    topic: '문자열 인덱스',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    char *s = "ABCDE";
    printf("%c%c", *(s + 1), s[4]);
    return 0;
}`,
    answer: 'BE',
    explanation: '*(s + 1) 은 s[1] 과 같아 \'B\' 이고, s[4] 는 \'E\' 입니다. 인덱스는 0부터 시작합니다.',
    keywords: ['문자열', '포인터', '인덱스'],
  },
  {
    id: 'QC_C_018',
    language: 'C',
    topic: '정수/실수 나눗셈',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int a = 7;
    double d = a / 2;
    printf("%.1f %.1f", d, a / 2.0);
    return 0;
}`,
    answer: '3.0 3.5',
    explanation: 'a / 2 는 정수끼리의 나눗셈이라 3 이 되고 이것이 double 에 저장되어 3.0 입니다. a / 2.0 은 실수 나눗셈이라 3.5 입니다.',
    keywords: ['형변환', '정수 나눗셈', '실수 나눗셈'],
  },
  {
    id: 'QC_C_019',
    language: 'C',
    topic: 'sizeof',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

int main() {
    int a[10];
    printf("%d", (int)(sizeof(a) / sizeof(a[0])));
    return 0;
}`,
    answer: '10',
    explanation: 'sizeof(a) 는 배열 전체 바이트 수, sizeof(a[0]) 는 원소 하나의 바이트 수입니다. 둘을 나누면 자료형 크기와 상관없이 원소 개수 10 이 됩니다.',
    keywords: ['sizeof', '배열 길이'],
  },
  {
    id: 'QC_C_020',
    language: 'C',
    topic: '복합 대입 연산자',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    a *= 2 + 3;
    a -= 4;
    printf("%d", a);
    return 0;
}`,
    answer: '46',
    explanation: 'a *= 2 + 3 은 a = a * (2 + 3) 입니다. 오른쪽 식을 먼저 계산하므로 10 * 5 = 50, 이어서 50 - 4 = 46 입니다.',
    keywords: ['복합 대입 연산자', '연산자 우선순위'],
  },
  {
    id: 'QC_C_021',
    language: 'C',
    topic: 'do-while',
    difficulty: 'EASY',
    code: `#include <stdio.h>

int main() {
    int i = 10, n = 0;
    do {
        n++;
        i++;
    } while (i < 5);
    printf("%d %d", n, i);
    return 0;
}`,
    answer: '1 11',
    explanation: 'do-while 은 조건을 나중에 검사하므로 조건이 처음부터 거짓이어도 본문이 한 번은 실행됩니다. n = 1, i = 11 입니다.',
    keywords: ['do-while', '반복문'],
  },
  {
    id: 'QC_C_022',
    language: 'C',
    topic: '포인터를 이용한 값 교환',
    difficulty: 'MEDIUM',
    code: `#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int main() {
    int x = 3, y = 8;
    swap(&x, &y);
    printf("%d %d", x - y, x);
    return 0;
}`,
    answer: '5 8',
    explanation: '주소를 넘겼으므로 swap 이 실제 x, y 를 교환합니다. 교환 후 x = 8, y = 3 이므로 x - y = 5, x = 8 입니다.',
    keywords: ['call by reference', '포인터', 'swap'],
  },

  // ───────────────────────── Java ─────────────────────────
  {
    id: 'QC_J_001',
    language: 'JAVA',
    topic: '문자열 연결',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.print(1 + 2 + "3" + 4 + 5);
    }
}`,
    answer: '3345',
    explanation: '+ 는 왼쪽부터 계산합니다. 1 + 2 = 3(숫자 덧셈), 3 + "3" = "33"(문자열이 되는 순간부터 연결), 이후 "33" + 4 + 5 = "3345" 입니다.',
    keywords: ['문자열 연결', '연산 순서'],
  },
  {
    id: 'QC_J_002',
    language: 'JAVA',
    topic: '문자열 메소드',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        String s = "InformationProcessing";
        System.out.print(s.substring(2, 6) + s.indexOf("o"));
    }
}`,
    answer: 'form3',
    explanation: 'substring(2, 6) 은 인덱스 2 이상 6 미만이므로 "form" 입니다(I-n-f-o-r-m 에서 f, o, r, m). indexOf("o") 는 처음 나타나는 위치 3 입니다. 따라서 "form3".',
    keywords: ['substring', 'indexOf'],
  },
  {
    id: 'QC_J_003',
    language: 'JAVA',
    topic: '== 와 equals',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        String a = "hi";
        String b = new String("hi");
        System.out.print((a == b) + " " + a.equals(b));
    }
}`,
    answer: 'false true',
    explanation: '== 는 참조(주소) 비교, equals 는 문자열 내용 비교입니다. new String 으로 만든 b 는 다른 객체이므로 a == b 는 false, 내용은 같아 equals 는 true 입니다.',
    keywords: ['equals', '참조 비교', 'String'],
  },
  {
    id: 'QC_J_004',
    language: 'JAVA',
    topic: '형변환',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 7;
        double d = a / 2;
        System.out.print(d + " " + (a / 2.0));
    }
}`,
    answer: '3.0 3.5',
    explanation: 'a / 2 는 정수 나눗셈이라 3 이고, double 에 저장되어 3.0 으로 출력됩니다. a / 2.0 은 실수 나눗셈이라 3.5 입니다.',
    keywords: ['형변환', '정수 나눗셈'],
  },
  {
    id: 'QC_J_005',
    language: 'JAVA',
    topic: '증감 연산자',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        int i = 3;
        i = i++ + ++i;
        System.out.print(i);
    }
}`,
    answer: '8',
    explanation: 'Java 는 왼쪽에서 오른쪽으로 평가합니다. i++ 는 3 을 쓰고 i 는 4 가 되며, ++i 는 5 가 됩니다. 3 + 5 = 8 이 i 에 대입됩니다.',
    keywords: ['전위 증가', '후위 증가'],
  },
  {
    id: 'QC_J_006',
    language: 'JAVA',
    topic: '오버로딩',
    difficulty: 'MEDIUM',
    code: `public class Main {
    static String f(int a)    { return "int"; }
    static String f(double a) { return "double"; }
    static String f(long a)   { return "long"; }

    public static void main(String[] args) {
        System.out.print(f(5) + f(5.0) + f(5L));
    }
}`,
    answer: 'intdoublelong',
    explanation: '메소드 오버로딩은 인자의 타입이 가장 정확히 일치하는 메소드를 호출합니다. 5 는 int, 5.0 은 double, 5L 은 long 입니다.',
    keywords: ['오버로딩', '메소드 선택'],
  },
  {
    id: 'QC_J_007',
    language: 'JAVA',
    topic: '오버라이딩/동적 바인딩',
    difficulty: 'MEDIUM',
    code: `class A {
    String who() { return "A"; }
    String hello() { return "H" + who(); }
}

class B extends A {
    String who() { return "B"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.print(new B().hello());
    }
}`,
    answer: 'HB',
    explanation: 'hello() 는 A 에 정의되어 있지만 안에서 호출하는 who() 는 실제 객체(B) 기준으로 오버라이딩된 메소드가 실행됩니다(동적 바인딩). 그래서 "H" + "B" = "HB".',
    keywords: ['오버라이딩', '동적 바인딩', '상속'],
  },
  {
    id: 'QC_J_008',
    language: 'JAVA',
    topic: 'static 변수',
    difficulty: 'MEDIUM',
    code: `class Counter {
    static int total = 0;
    int id;
    Counter() {
        total++;
        id = total;
    }
}

public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        Counter c = new Counter();
        System.out.print(c.id + Counter.total);
    }
}`,
    answer: '6',
    explanation: 'static 변수 total 은 모든 객체가 공유합니다. 세 번째 객체의 id 는 3, total 도 3 이므로 3 + 3 = 6 입니다.',
    keywords: ['static', '생성자', '클래스 변수'],
  },
  {
    id: 'QC_J_009',
    language: 'JAVA',
    topic: 'ArrayList',
    difficulty: 'HARD',
    code: `import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(10, 20, 30, 40));
        list.remove(1);
        list.remove(Integer.valueOf(40));
        System.out.print(list.size() + " " + list.get(1));
    }
}`,
    answer: '2 30',
    explanation: 'remove(1) 은 인덱스 1 의 원소(20)를 삭제하여 [10, 30, 40] 이 됩니다. remove(Integer.valueOf(40)) 은 값 40 을 삭제하여 [10, 30] 이 됩니다. size 는 2, get(1) 은 30 입니다.',
    keywords: ['ArrayList', 'remove', '인덱스와 객체'],
  },
  {
    id: 'QC_J_010',
    language: 'JAVA',
    topic: '예외 처리',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        try {
            int x = 5 / 0;
            System.out.print("X");
        } catch (ArithmeticException e) {
            System.out.print("A");
        } finally {
            System.out.print("F");
        }
        System.out.print("E");
    }
}`,
    answer: 'AFE',
    explanation: '5 / 0 에서 ArithmeticException 이 발생하여 "X" 출력은 건너뜁니다. catch 의 "A", 항상 실행되는 finally 의 "F", 이후 정상 흐름의 "E" 순서로 출력됩니다.',
    keywords: ['try-catch-finally', '예외 처리'],
  },
  {
    id: 'QC_J_011',
    language: 'JAVA',
    topic: '2차원 배열',
    difficulty: 'EASY',
    code: `public class Main {
    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        System.out.print(a[1][2] + a[0][1] + a.length);
    }
}`,
    answer: '10',
    explanation: 'a[1][2] = 6, a[0][1] = 2, a.length 는 행의 개수 2 입니다. 6 + 2 + 2 = 10.',
    keywords: ['2차원 배열', 'length'],
  },
  {
    id: 'QC_J_012',
    language: 'JAVA',
    topic: 'StringBuilder',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("abc");
        sb.reverse().append("d").insert(0, "x");
        System.out.print(sb);
    }
}`,
    answer: 'xcbad',
    explanation: 'reverse() 로 "cba", append("d") 로 "cbad", insert(0, "x") 로 맨 앞에 x 를 넣어 "xcbad" 가 됩니다. StringBuilder 는 같은 객체를 계속 수정합니다.',
    keywords: ['StringBuilder', 'reverse', 'append'],
  },
  {
    id: 'QC_J_013',
    language: 'JAVA',
    topic: 'Math 클래스',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.print(Math.max(3, Math.min(8, 5)) + Math.abs(-7) % 4);
    }
}`,
    answer: '8',
    explanation: 'Math.min(8, 5) = 5, Math.max(3, 5) = 5 입니다. Math.abs(-7) % 4 = 7 % 4 = 3 이며 % 가 + 보다 먼저 계산됩니다. 5 + 3 = 8.',
    keywords: ['Math', '연산자 우선순위'],
  },
  {
    id: 'QC_J_014',
    language: 'JAVA',
    topic: 'compareTo',
    difficulty: 'HARD',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.print("apple".compareTo("banana"));
    }
}`,
    answer: '-1',
    explanation: 'compareTo 는 처음으로 다른 문자의 코드 차이를 반환합니다. \'a\' - \'b\' = 97 - 98 = -1 입니다.',
    keywords: ['compareTo', '문자열 비교'],
  },
  {
    id: 'QC_J_015',
    language: 'JAVA',
    topic: '문자와 정수',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        char c = 'a';
        c += 2;
        System.out.print(c);
        System.out.print('a' + 1);
    }
}`,
    answer: 'c98',
    explanation: "c += 2 는 char 에 저장되므로 'c' 가 출력됩니다. 'a' + 1 은 char 와 int 의 덧셈이라 int 로 계산되어 97 + 1 = 98 이 출력됩니다.",
    keywords: ['char', '형변환'],
  },
  {
    id: 'QC_J_016',
    language: 'JAVA',
    topic: '중첩 반복문',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        int cnt = 0;
        for (int i = 1; i <= 4; i++) {
            for (int j = i; j <= 4; j++) {
                cnt++;
            }
        }
        System.out.print(cnt);
    }
}`,
    answer: '10',
    explanation: 'i = 1 일 때 j 는 1~4 (4번), i = 2 는 3번, i = 3 은 2번, i = 4 는 1번 실행됩니다. 4 + 3 + 2 + 1 = 10.',
    keywords: ['중첩 반복문', '실행 횟수'],
  },
  {
    id: 'QC_J_017',
    language: 'JAVA',
    topic: '추상 클래스',
    difficulty: 'MEDIUM',
    code: `abstract class Shape {
    abstract int area();
}

class Rect extends Shape {
    int w, h;
    Rect(int w, int h) {
        this.w = w;
        this.h = h;
    }
    int area() { return w * h; }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Rect(3, 4);
        System.out.print(s.area());
    }
}`,
    answer: '12',
    explanation: '추상 클래스 Shape 의 참조 변수로 자식 Rect 객체를 가리킬 수 있고, area() 는 실제 객체의 구현이 실행됩니다. 3 * 4 = 12.',
    keywords: ['추상 클래스', '다형성'],
  },
  {
    id: 'QC_J_018',
    language: 'JAVA',
    topic: '생성자 호출 순서',
    difficulty: 'MEDIUM',
    code: `class P {
    P() { System.out.print("P"); }
}

class C extends P {
    C() { System.out.print("C"); }
}

public class Main {
    public static void main(String[] args) {
        new C();
    }
}`,
    answer: 'PC',
    explanation: '자식 생성자의 첫 줄에서 부모 생성자(super())가 자동으로 먼저 호출됩니다. 따라서 부모의 "P" 가 먼저, 자식의 "C" 가 나중에 출력됩니다.',
    keywords: ['생성자', 'super', '상속'],
  },
  {
    id: 'QC_J_019',
    language: 'JAVA',
    topic: '형변환 오버플로',
    difficulty: 'HARD',
    code: `public class Main {
    public static void main(String[] args) {
        byte b = (byte) 130;
        System.out.print(b);
    }
}`,
    answer: '-126',
    explanation: 'byte 의 범위는 -128 ~ 127 입니다. 130 은 범위를 넘어 한 바퀴 돌아 130 - 256 = -126 이 됩니다.',
    keywords: ['byte', '오버플로', '형변환'],
  },
  {
    id: 'QC_J_020',
    language: 'JAVA',
    topic: '0으로 나누기',
    difficulty: 'MEDIUM',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.print(5.0 / 0);
    }
}`,
    answer: 'Infinity',
    explanation: '정수를 0 으로 나누면 예외가 발생하지만, 실수(double)를 0 으로 나누면 예외 없이 Infinity(무한대)가 됩니다.',
    keywords: ['실수 나눗셈', 'Infinity'],
  },

  // ───────────────────────── Python ─────────────────────────
  {
    id: 'QC_P_001',
    language: 'PYTHON',
    topic: '슬라이싱',
    difficulty: 'EASY',
    code: `s = "PYTHON"
print(s[1:4] + s[-1])`,
    answer: 'YTHN',
    explanation: 's[1:4] 는 인덱스 1 이상 4 미만이라 "YTH", s[-1] 은 맨 뒤 글자 "N" 입니다. 합치면 "YTHN".',
    keywords: ['슬라이싱', '음수 인덱스'],
  },
  {
    id: 'QC_P_002',
    language: 'PYTHON',
    topic: '몫과 나머지',
    difficulty: 'HARD',
    code: `print(7 // 2, -7 // 2, 7 % 3, -7 % 3)`,
    answer: '3 -4 1 2',
    explanation: '// 는 내림 나눗셈입니다. 7 // 2 = 3, -7 // 2 = -3.5 의 내림인 -4 입니다. 파이썬의 % 는 나누는 수의 부호를 따르므로 7 % 3 = 1, -7 % 3 = 2 입니다.',
    keywords: ['몫 연산자', '나머지', '내림'],
  },
  {
    id: 'QC_P_003',
    language: 'PYTHON',
    topic: '거듭제곱 우선순위',
    difficulty: 'MEDIUM',
    code: `print(2 ** 3 ** 2)`,
    answer: '512',
    explanation: '** 는 오른쪽 결합입니다. 3 ** 2 = 9 를 먼저 계산하고 2 ** 9 = 512 입니다.',
    keywords: ['거듭제곱', '결합 방향'],
  },
  {
    id: 'QC_P_004',
    language: 'PYTHON',
    topic: '리스트 컴프리헨션',
    difficulty: 'EASY',
    code: `print(sum([x * x for x in range(1, 5)]))`,
    answer: '30',
    explanation: 'range(1, 5) 는 1, 2, 3, 4 입니다. 제곱은 1, 4, 9, 16 이고 합은 30 입니다.',
    keywords: ['리스트 컴프리헨션', 'range', 'sum'],
  },
  {
    id: 'QC_P_005',
    language: 'PYTHON',
    topic: '딕셔너리',
    difficulty: 'MEDIUM',
    code: `d = {'a': 1, 'b': 2}
d['c'] = d['a'] + d['b']
d['a'] = 10
print(len(d), sum(d.values()))`,
    answer: '3 15',
    explanation: "d['c'] = 1 + 2 = 3 이 추가되어 키는 3개입니다. 이후 d['a'] 를 10 으로 바꾸므로 값의 합은 10 + 2 + 3 = 15 입니다.",
    keywords: ['딕셔너리', 'values'],
  },
  {
    id: 'QC_P_006',
    language: 'PYTHON',
    topic: '집합',
    difficulty: 'EASY',
    code: `print(len(set([1, 2, 2, 3, 3, 3])))`,
    answer: '3',
    explanation: 'set 은 중복을 제거합니다. {1, 2, 3} 이므로 길이는 3 입니다.',
    keywords: ['set', '중복 제거'],
  },
  {
    id: 'QC_P_007',
    language: 'PYTHON',
    topic: '리스트 참조',
    difficulty: 'MEDIUM',
    code: `a = [1, 2]
b = a
b.append(3)
print(len(a))`,
    answer: '3',
    explanation: 'b = a 는 복사가 아니라 같은 리스트를 가리키게 합니다. b 에 추가한 3 이 a 에도 보이므로 len(a) = 3 입니다.',
    keywords: ['참조', '가변 객체', 'append'],
  },
  {
    id: 'QC_P_008',
    language: 'PYTHON',
    topic: '동시 대입',
    difficulty: 'MEDIUM',
    code: `a, b = 3, 5
a, b = b, a + b
print(a, b)`,
    answer: '5 8',
    explanation: '오른쪽 (b, a + b) 를 먼저 모두 계산합니다. (5, 3 + 5) = (5, 8) 이므로 a = 5, b = 8 입니다.',
    keywords: ['튜플 언패킹', '동시 대입'],
  },
  {
    id: 'QC_P_009',
    language: 'PYTHON',
    topic: 'range',
    difficulty: 'EASY',
    code: `print(sum(range(2, 10, 3)))`,
    answer: '15',
    explanation: 'range(2, 10, 3) 은 2에서 시작해 3씩 증가하며 10 미만이므로 2, 5, 8 입니다. 합은 15.',
    keywords: ['range', 'step'],
  },
  {
    id: 'QC_P_010',
    language: 'PYTHON',
    topic: 'enumerate',
    difficulty: 'MEDIUM',
    code: `print(sum(i * v for i, v in enumerate([5, 6, 7])))`,
    answer: '20',
    explanation: 'enumerate 는 (인덱스, 값) 쌍을 줍니다. 0*5 + 1*6 + 2*7 = 0 + 6 + 14 = 20 입니다.',
    keywords: ['enumerate', '제너레이터 식'],
  },
  {
    id: 'QC_P_011',
    language: 'PYTHON',
    topic: '문자열 메소드',
    difficulty: 'MEDIUM',
    code: `parts = "a,b,c,d".split(",")
print(parts[2].upper() + str(len(parts)))`,
    answer: 'C4',
    explanation: 'split(",") 은 ["a", "b", "c", "d"] 를 만듭니다. parts[2] 는 "c" 이고 upper() 로 "C", len(parts) 는 4 입니다. 문자열로 합치면 "C4".',
    keywords: ['split', 'upper', 'len'],
  },
  {
    id: 'QC_P_012',
    language: 'PYTHON',
    topic: '재귀 함수',
    difficulty: 'EASY',
    code: `def f(n):
    return 1 if n <= 1 else n * f(n - 1)

print(f(5))`,
    answer: '120',
    explanation: 'f(5) = 5 * 4 * 3 * 2 * 1 = 120 입니다. 팩토리얼을 재귀로 구하는 형태입니다.',
    keywords: ['재귀 함수', '팩토리얼'],
  },
  {
    id: 'QC_P_013',
    language: 'PYTHON',
    topic: 'lambda/filter',
    difficulty: 'MEDIUM',
    code: `print(sum(filter(lambda x: x % 2, [1, 2, 3, 4, 5])))`,
    answer: '9',
    explanation: 'x % 2 가 참(1)인 홀수만 남습니다. 1, 3, 5 의 합은 9 입니다.',
    keywords: ['lambda', 'filter'],
  },
  {
    id: 'QC_P_014',
    language: 'PYTHON',
    topic: '클래스',
    difficulty: 'MEDIUM',
    code: `class Acc:
    def __init__(self):
        self.total = 0

    def add(self, n):
        self.total += n
        return self

a = Acc()
a.add(3).add(4)
print(a.total)`,
    answer: '7',
    explanation: 'add 가 self 를 반환하므로 a.add(3).add(4) 처럼 이어 호출할 수 있습니다. total 은 0 + 3 + 4 = 7 입니다.',
    keywords: ['클래스', '메소드 체이닝', 'self'],
  },
  {
    id: 'QC_P_015',
    language: 'PYTHON',
    topic: '예외 처리',
    difficulty: 'MEDIUM',
    code: `try:
    x = int("12a")
except ValueError:
    print("E", end="")
finally:
    print("F", end="")`,
    answer: 'EF',
    explanation: 'int("12a") 는 변환할 수 없어 ValueError 가 발생하므로 except 의 "E" 가 출력됩니다. finally 는 항상 실행되어 "F" 가 이어서 출력됩니다. end="" 로 줄바꿈이 없습니다.',
    keywords: ['try-except-finally', 'ValueError', 'print end'],
  },
  {
    id: 'QC_P_016',
    language: 'PYTHON',
    topic: '비교 연산 연결',
    difficulty: 'MEDIUM',
    code: `print(3 > 2 > 1, 1 < 3 < 2)`,
    answer: 'True False',
    explanation: '파이썬은 비교 연산을 이어 쓸 수 있습니다. 3 > 2 > 1 은 (3 > 2) and (2 > 1) 로 True, 1 < 3 < 2 는 (1 < 3) and (3 < 2) 로 False 입니다.',
    keywords: ['비교 연산', '논리값'],
  },
  {
    id: 'QC_P_017',
    language: 'PYTHON',
    topic: '문자열 반복/슬라이싱',
    difficulty: 'MEDIUM',
    code: `print(("ab" * 3)[2:5])`,
    answer: 'aba',
    explanation: '"ab" * 3 = "ababab" 이고 인덱스 2 이상 5 미만은 "aba" 입니다. (인덱스 2:a, 3:b, 4:a)',
    keywords: ['문자열 반복', '슬라이싱'],
  },
  {
    id: 'QC_P_018',
    language: 'PYTHON',
    topic: '정렬',
    difficulty: 'EASY',
    code: `print(sorted([4, 1, 3, 2], reverse=True)[1])`,
    answer: '3',
    explanation: '내림차순 정렬 결과는 [4, 3, 2, 1] 이고 인덱스 1 은 3 입니다.',
    keywords: ['sorted', 'reverse'],
  },
  {
    id: 'QC_P_019',
    language: 'PYTHON',
    topic: '기본 인자',
    difficulty: 'HARD',
    code: `def f(a, b=2, c=3):
    return a + b * c

print(f(1), f(1, 3), f(1, c=5))`,
    answer: '7 10 11',
    explanation: 'f(1) = 1 + 2*3 = 7, f(1, 3) = 1 + 3*3 = 10, f(1, c=5) = 1 + 2*5 = 11 입니다. 생략한 인자는 기본값을 쓰고, 키워드 인자는 이름으로 지정합니다.',
    keywords: ['기본 인자', '키워드 인자'],
  },
  {
    id: 'QC_P_020',
    language: 'PYTHON',
    topic: 'while 문',
    difficulty: 'EASY',
    code: `n, s = 10, 0
while n > 0:
    s += n
    n -= 3
print(s)`,
    answer: '22',
    explanation: 'n 은 10, 7, 4, 1 일 때 반복하며 s 에 더해집니다. 10 + 7 + 4 + 1 = 22 입니다.',
    keywords: ['while', '누적 합'],
  },
  {
    id: 'QC_P_021',
    language: 'PYTHON',
    topic: '논리 연산자 반환값',
    difficulty: 'HARD',
    code: `print(0 or 5, 3 and 0, not 0)`,
    answer: '5 0 True',
    explanation: 'or 는 왼쪽이 거짓이면 오른쪽 값을, and 는 왼쪽이 참이면 오른쪽 값을 그대로 반환합니다. 0 or 5 = 5, 3 and 0 = 0, not 0 = True 입니다.',
    keywords: ['논리 연산자', '단락 평가'],
  },
];

export const quickCalcQuestions: Question[] = quickCalcSeeds.map(toQuestion);

