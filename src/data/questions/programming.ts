import { Question } from '../../types/question';

export const programmingQuestions: Question[] = [
  {
    id: 'PROG_001',
    examYear: 2023,
    examRound: 1,
    subject: '프로그래밍언어활용',
    category: 'C',
    subCategory: '포인터',
    type: 'CODE_TRACE',
    question: '다음 C언어로 구현된 프로그램의 실행 결과를 쓰시오.',
    code: `#include <stdio.h>

int main() {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;
    printf("%d", *(p + 2) + *p);
    return 0;
}`,
    language: 'C',
    answer: '40',
    explanation: '*(p + 2)는 a[2]의 값인 30이고, *p는 a[0]의 값인 10입니다. 따라서 30 + 10 = 40이 출력됩니다.',
    difficulty: 'EASY',
    keywords: ['C언어', '포인터', '배열', '주소연산'],
    source: '기출 변형'
  },
  {
    id: 'PROG_002',
    examYear: 2023,
    examRound: 2,
    subject: '프로그래밍언어활용',
    category: 'C',
    subCategory: '재귀함수',
    type: 'CODE_TRACE',
    question: '다음 C언어로 구현된 프로그램의 실행 결과를 쓰시오.',
    code: `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}

int main() {
    printf("%d", f(4));
    return 0;
}`,
    language: 'C',
    answer: '24',
    explanation: 'f(4)는 재귀 호출을 통해 4 * f(3) = 4 * 3 * f(2) = 4 * 3 * 2 * f(1) = 24를 반환합니다.',
    difficulty: 'EASY',
    keywords: ['C언어', '재귀함수', '팩토리얼'],
    source: '기출 변형'
  },
  {
    id: 'PROG_003',
    examYear: 2022,
    examRound: 3,
    subject: '프로그래밍언어활용',
    category: 'Java',
    subCategory: '상속',
    type: 'CODE_TRACE',
    question: '다음 Java 프로그램의 실행 결과를 쓰시오.',
    code: `class Parent {
    public void show() {
        System.out.print("P");
    }
}

class Child extends Parent {
    public void show() {
        System.out.print("C");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.show();
    }
}`,
    language: 'JAVA',
    answer: 'C',
    explanation: '부모 클래스 타입 참조변수에 자식 객체를 할당하더라도, 오버라이딩된 메서드가 있다면 동적 바인딩(가상 메서드 호출)에 의해 실제 인스턴스인 Child의 show()가 실행되어 "C"가 출력됩니다.',
    difficulty: 'MEDIUM',
    keywords: ['Java', '상속', '오버라이딩', '다형성'],
    source: '기출 변형'
  },
  {
    id: 'PROG_004',
    examYear: 2023,
    examRound: 3,
    subject: '프로그래밍언어활용',
    category: 'Java',
    subCategory: 'static',
    type: 'CODE_TRACE',
    question: '다음 Java 프로그램의 실행 결과를 쓰시오.',
    code: `class Count {
    static int a = 0;
    Count() {
        a++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Count();
        new Count();
        Count c3 = new Count();
        System.out.print(Count.a);
    }
}`,
    language: 'JAVA',
    answer: '3',
    explanation: 'static 변수는 인스턴스 간에 공유되는 클래스 변수입니다. 객체가 총 3번 생성되면서 생성자가 3회 호출되어 a의 값이 3이 됩니다.',
    difficulty: 'EASY',
    keywords: ['Java', 'static', '생성자', '클래스변수'],
    source: '기출 변형'
  },
  {
    id: 'PROG_005',
    examYear: 2023,
    examRound: 1,
    subject: '프로그래밍언어활용',
    category: 'Python',
    subCategory: '슬라이싱',
    type: 'CODE_TRACE',
    question: '다음 Python 프로그램의 실행 결과를 쓰시오.',
    code: `a = [10, 20, 30, 40, 50, 60]
b = a[1:5:2]
print(sum(b))`,
    language: 'PYTHON',
    answer: '60',
    explanation: 'a[1:5:2]는 인덱스 1부터 4까지 2칸씩 건너뛰며 추출하므로 인덱스 1(20)과 3(40)이 추출되어 b는 [20, 40]이 됩니다. sum([20, 40]) = 60입니다.',
    difficulty: 'MEDIUM',
    keywords: ['Python', '슬라이싱', 'sum'],
    source: '기출 변형'
  },
  {
    id: 'PROG_006',
    examYear: 2024,
    examRound: 1,
    subject: '프로그래밍언어활용',
    category: 'Python',
    subCategory: '람다',
    type: 'CODE_TRACE',
    question: '다음 Python 코드의 실행 결과를 쓰시오.',
    code: `nums = [1, 2, 3, 4]
result = list(map(lambda x: x * 2 + 1, nums))
print(result[2])`,
    language: 'PYTHON',
    answer: '7',
    explanation: 'map 함수에 의해 nums의 각 요소 x에 대해 2*x + 1을 계산합니다. [3, 5, 7, 9]가 생성되며 인덱스 2의 값은 7입니다.',
    difficulty: 'EASY',
    keywords: ['Python', 'lambda', 'map'],
    source: '기출 변형'
  },
  {
    id: 'PROG_007',
    examYear: 2024,
    examRound: 2,
    subject: '프로그래밍언어활용',
    category: 'C',
    subCategory: '문자열',
    type: 'CODE_TRACE',
    question: '다음 C언어 코드의 실행 결과를 쓰시오.',
    code: `#include <stdio.h>

int main() {
    char str[] = "HELLO";
    char *p = str;
    while (*p) {
        p++;
    }
    printf("%d", (int)(p - str));
    return 0;
}`,
    language: 'C',
    answer: '5',
    explanation: '포인터 p는 문자열 끝의 null 문자(\\0)를 가리킬 때까지 이동합니다. "HELLO"는 5글자이므로 p는 str에서 5만큼 떨어진 위치를 가리키며, p - str은 5가 됩니다.',
    difficulty: 'MEDIUM',
    keywords: ['C언어', '문자열', '널문자', '포인터연산'],
    source: '기출 변형'
  }
];
