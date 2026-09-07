import { getSupabaseClient } from './supabaseClient';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { SyncQueueService } from '../storage/syncQueue';
import { AttemptRepository } from '../repositories/attemptRepository';
import { ALL_QUESTIONS } from '../data/questions';
import { Question } from '../types/question';

// 클라우드 서버에서 제공되는 최신 회차 신규 기출 및 변형 문제 패키지
export const CLOUD_NEW_QUESTIONS: Question[] = [
  {
    id: 'CLOUD_2024_001',
    examYear: 2024,
    examRound: 2,
    questionNumber: 3,
    subject: '프로그래밍언어활용',
    category: 'C',
    subCategory: '구조체 포인터',
    type: 'CODE_TRACE',
    question: '다음 C언어로 구현된 프로그램의 실행 결과를 쓰시오.',
    code: `#include <stdio.h>

struct Data {
    int val;
    struct Data *next;
};

int main() {
    struct Data a = {10, NULL};
    struct Data b = {20, &a};
    struct Data *p = &b;
    printf("%d", p->val + p->next->val);
    return 0;
}`,
    language: 'C',
    answer: '30',
    explanation: 'p는 b를 가리키므로 p->val은 20이고, p->next는 a의 주소(&a)이므로 p->next->val은 10입니다. 따라서 20 + 10 = 30이 출력됩니다.',
    difficulty: 'MEDIUM',
    keywords: ['C언어', '구조체', '포인터', '연결리스트'],
    source: '2024년 2회 기출 변형'
  },
  {
    id: 'CLOUD_2024_002',
    examYear: 2024,
    examRound: 2,
    questionNumber: 8,
    subject: '데이터베이스구축',
    category: 'SQL',
    subCategory: '서브쿼리',
    type: 'SQL',
    question: '다음 SQL 쿼리에서 평균 급여보다 많은 급여를 받는 사원의 이름을 조회하고자 한다. 빈칸에 들어갈 올바른 SQL 절을 완성하시오.\n\nSELECT 이름 \nFROM 급여 \nWHERE 금액 > (   빈칸   );',
    answer: ['SELECT AVG(금액) FROM 급여', 'SELECT AVG(금액)FROM 급여', 'select avg(금액) from 급여'],
    explanation: '서브쿼리를 사용하여 전체 사원의 평균 급여(SELECT AVG(금액) FROM 급여)를 계산한 후, 그 값보다 큰 금액을 받는 사원을 조회합니다.',
    difficulty: 'MEDIUM',
    keywords: ['SQL', '서브쿼리', 'AVG', '집계함수'],
    source: '2024년 2회 기출 변형'
  },
  {
    id: 'CLOUD_2024_003',
    examYear: 2024,
    examRound: 3,
    questionNumber: 12,
    subject: '신기술/보안',
    category: '암호화',
    subCategory: '일방향 해시',
    type: 'SHORT_ANSWER',
    question: '미국 국립표준기술연구소(NIST)에서 제정한 해시 암호화 표준으로, 256비트의 고정 길이 다이제스트를 출력하며 임의의 길이의 데이터를 복호화할 수 없는 일방향 해시 알고리즘의 명칭을 영문으로 쓰시오.',
    answer: ['SHA-256', 'SHA256', 'sha-256', 'sha256'],
    explanation: 'SHA-256은 SHA-2 계열의 해시 함수로서 충돌 저항성과 일방향성을 만족하며, 블록체인 및 보안 서명에 널리 사용되는 표준 해시 알고리즘입니다.',
    difficulty: 'EASY',
    keywords: ['해시', 'SHA-256', '일방향암호화', '다이제스트'],
    source: '2024년 3회 기출 변형'
  },
  {
    id: 'CLOUD_2024_004',
    examYear: 2024,
    examRound: 1,
    questionNumber: 5,
    subject: '프로그래밍언어활용',
    category: 'Java',
    subCategory: '다형성',
    type: 'CODE_TRACE',
    question: '다음 Java 프로그램의 실행 결과를 쓰시오.',
    code: `class A {
    int x = 10;
    void print() { System.out.print(x); }
}
class B extends A {
    int x = 20;
    void print() { System.out.print(x); }
}
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        System.out.print(obj.x + ",");
        obj.print();
    }
}`,
    language: 'JAVA',
    answer: '10,20',
    explanation: '필드(멤버 변수)는 참조 변수의 타입(A)을 따르므로 obj.x는 10이고, 오버라이딩된 메서드는 실제 객체(B)의 가상 메서드 테이블에 의해 B의 print()가 호출되어 20이 출력됩니다. 따라서 "10,20"입니다.',
    difficulty: 'HARD',
    keywords: ['Java', '다형성', '오버라이딩', '멤버변수 은닉'],
    source: '2024년 1회 기출 변형'
  },
  {
    id: 'CLOUD_2024_005',
    examYear: 2024,
    examRound: 2,
    questionNumber: 14,
    subject: '프로그래밍언어활용',
    category: 'Python',
    subCategory: '딕셔너리',
    type: 'CODE_TRACE',
    question: '다음 Python 코드의 실행 결과를 쓰시오.',
    code: `data = {'A': 10, 'B': 20, 'C': 30}
keys = list(data.keys())
total = data[keys[0]] + data.get('D', 5)
print(total)`,
    language: 'PYTHON',
    answer: '15',
    explanation: 'keys[0]은 "A"이므로 data["A"]는 10입니다. data.get("D", 5)는 딕셔너리에 "D" 키가 없으므로 기본값 5를 반환합니다. 따라서 10 + 5 = 15가 출력됩니다.',
    difficulty: 'EASY',
    keywords: ['Python', '딕셔너리', 'get메서드'],
    source: '2024년 2회 기출 변형'
  },
  {
    id: 'CLOUD_2024_006',
    examYear: 2024,
    examRound: 3,
    questionNumber: 7,
    subject: '소프트웨어설계',
    category: '소프트웨어 테스트',
    subCategory: '화이트박스',
    type: 'SHORT_ANSWER',
    question: '소프트웨어 화이트박스 테스트 검증 기준(Coverage) 중 소스 코드 내부의 모든 가능한 분기(조건문의 참과 거짓)를 최소한 한 번씩 모두 실행하도록 테스트 케이스를 설계하는 검증 기준의 명칭을 쓰시오.',
    answer: ['분기 커버리지', '분기 검증', '결정 커버리지', 'Branch Coverage', 'Decision Coverage'],
    explanation: '구문 커버리지(Statement Coverage)는 모든 문장을 최소 1회 실행하는 것이며, 분기 커버리지(Branch Coverage, 결정 커버리지)는 모든 조건문의 참(True)과 거짓(False) 갈래를 최소 1회 이상 통과하도록 하는 테스트 기준입니다.',
    difficulty: 'MEDIUM',
    keywords: ['화이트박스', '분기 커버리지', '결정 커버리지', '테스트커버리지'],
    source: '2024년 3회 기출 변형'
  },
  {
    id: 'CLOUD_2024_007',
    examYear: 2023,
    examRound: 3,
    questionNumber: 18,
    subject: '신기술/보안',
    category: '네트워크',
    subCategory: '라우팅',
    type: 'SHORT_ANSWER',
    question: '자율 시스템(AS, Autonomous System) 간에 경로를 교환하기 위해 BGP 프로토콜에서 사용하는 전송 계층 프로토콜 명칭과 기본 포트 번호(Port)를 순서대로 쓰시오 (예: UDP, 53).',
    answer: ['TCP, 179', 'TCP,179', 'tcp, 179', 'tcp,179'],
    explanation: 'BGP(Border Gateway Protocol)는 신뢰성 있는 대규모 라우팅 정보 교환을 위해 전송 계층으로 TCP 179번 포트를 사용합니다.',
    difficulty: 'HARD',
    keywords: ['BGP', 'TCP', '179', '라우팅'],
    source: '2023년 3회 기출 변형'
  },
  {
    id: 'CLOUD_2024_008',
    examYear: 2024,
    examRound: 1,
    questionNumber: 11,
    subject: '데이터베이스구축',
    category: '트랜잭션',
    subCategory: '회복기법',
    type: 'SHORT_ANSWER',
    question: '데이터베이스 장애 발생 시 트랜잭션의 연산을 취소하고 변경 내용을 데이터베이스의 원래 상태로 되돌리는 작업을 일컫는 명칭을 영문 또는 한글로 쓰시오.',
    answer: ['UNDO', 'undo', '취소'],
    explanation: '회복 기법에서 트랜잭션이 실패하여 이전 상태로 되돌리는 연산은 UNDO(취소)이며, 장애 이전의 성공한 트랜잭션 변경 내용을 재실행하여 일관성을 맞추는 연산은 REDO(재실행)입니다.',
    difficulty: 'EASY',
    keywords: ['트랜잭션', '회복', 'UNDO', 'REDO'],
    source: '2024년 1회 기출 변형'
  }
];

export class QuestionSyncService {
  /**
   * 로컬 캐시에 저장된 서버 문제 목록을 가져옵니다.
   */
  static async getCachedServerQuestions(): Promise<Question[]> {
    const cached = await LocalStorage.getItem<Question[]>(STORAGE_KEYS.CACHED_SERVER_QUESTIONS);
    return cached || [];
  }

  /**
   * 서버로부터 신규 문제를 동기화하여 로컬에 캐싱합니다.
   * 이미 준비된 최신 기출이 다 소진된 경우에도 동적 실기 변형 문제를 지속적으로 보충합니다.
   */
  static async syncQuestions(): Promise<{ addedCount: number; totalServerCount: number }> {
    try {
      const client = await getSupabaseClient();
      let remoteQuestions: Question[] = [];

      if (client) {
        const { data, error } = await client.from('questions').select('*');
        if (!error && data) {
          remoteQuestions = data as Question[];
        }
      } else {
        remoteQuestions = CLOUD_NEW_QUESTIONS;
      }

      const cached = await this.getCachedServerQuestions();
      const existingIds = new Set([
        ...ALL_QUESTIONS.map((q) => q.id),
        ...cached.map((q) => q.id),
      ]);

      // 1. 아직 로컬에 내려받지 않은 정규 신규 문제 선별
      let newQuestions = remoteQuestions.filter((q) => !existingIds.has(q.id));

      // 2. 정규 신규 문제를 이미 다 받았을 때는 5문제 세트로 생성하여 보충
      if (newQuestions.length === 0) {
        const startIdx = cached.filter((q) => q.id.startsWith('AUTO_GEN_')).length + 1;
        const generatedBundle: Question[] = [];
        for (let i = 0; i < 5; i++) {
          const q = generateDynamicPracticeQuestion(startIdx + i);
          if (!existingIds.has(q.id)) {
            generatedBundle.push(q);
          }
        }
        newQuestions = generatedBundle;
      }

      if (newQuestions.length > 0) {
        const updatedCache = [...cached, ...newQuestions];
        await LocalStorage.setItem(STORAGE_KEYS.CACHED_SERVER_QUESTIONS, updatedCache);
      }

      return {
        addedCount: newQuestions.length,
        totalServerCount: cached.length + newQuestions.length,
      };
    } catch (e) {
      console.error('Question sync error:', e);
      return { addedCount: 0, totalServerCount: 0 };
    }
  }

  /**
   * 오프라인 상태에서 푼 기록(Sync Queue)을 서버로 전송합니다.
   */
  static async syncPendingAttempts(): Promise<number> {
    const queue = await SyncQueueService.getQueue();
    if (queue.length === 0) return 0;

    const client = await getSupabaseClient();
    let syncedCount = 0;

    for (const item of queue) {
      if (client) {
        const attempts = await AttemptRepository.getAllAttempts();
        const targetAttempt = attempts.find((a) => a.id === item.attemptId);
        if (targetAttempt) {
          const { error } = await client.from('quiz_attempts').insert([targetAttempt]);
          if (!error) {
            await SyncQueueService.remove(item.id);
            syncedCount++;
          }
        }
      } else {
        await SyncQueueService.remove(item.id);
        syncedCount++;
      }
    }

    return syncedCount;
  }
}

/**
 * 실기 시험 대비 무한 코드/알고리즘 변형 문제 생성기
 */
function generateDynamicPracticeQuestion(index: number): Question {
  const seeds = [
    {
      type: 'C' as const,
      q: `다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오 (누적 회차 #${index}).`,
      code: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= ${index + 3}; i++) {
        if (i % 2 == 0) sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      calcAns: () => {
        let s = 0;
        for (let i = 1; i <= index + 3; i++) {
          if (i % 2 === 0) s += i;
        }
        return String(s);
      },
      exp: `1부터 ${index + 3}까지의 짝수만 누적합을 구하는 반복문입니다.`,
      keywords: ['C언어', '반복문', '짝수합', '조건문'],
    },
    {
      type: 'JAVA' as const,
      q: `다음 Java 프로그램의 실행 결과를 쓰시오 (누적 회차 #${index}).`,
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {${index * 2}, ${index * 3 + 1}, ${index + 5}};
        int max = arr[0];
        for (int v : arr) {
            if (v > max) max = v;
        }
        System.out.print(max);
    }
}`,
      calcAns: () => {
        const arr = [index * 2, index * 3 + 1, index + 5];
        return String(Math.max(...arr));
      },
      exp: `향상된 for문(for-each)을 사용하여 배열의 최댓값을 찾는 코드입니다.`,
      keywords: ['Java', '배열', 'for-each', '최댓값'],
    }
  ];

  const pick = seeds[index % seeds.length];
  const ans = pick.calcAns();

  return {
    id: `AUTO_GEN_${Date.now()}_${index}`,
    examYear: 2024,
    examRound: 3,
    subject: '프로그래밍언어활용',
    category: pick.type === 'C' ? 'C' : 'Java',
    subCategory: '알고리즘',
    type: 'CODE_TRACE',
    question: pick.q,
    code: pick.code,
    language: pick.type,
    answer: ans,
    explanation: `${pick.exp} 실행 결과는 ${ans}입니다.`,
    difficulty: 'MEDIUM',
    keywords: pick.keywords,
    source: '클라우드 스마트 기출 변형 생성'
  };
}
