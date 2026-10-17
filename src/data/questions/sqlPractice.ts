import { Difficulty, Question } from '../../types/question';

/**
 * SQL 연습 문제 (practiceKind: SQL_PRACTICE).
 *
 * 작성 원칙
 * - 표 데이터는 TableDef 로 한 번만 정의하고, 화면 표시 텍스트와 검증용 DB 가 같은 정의에서 만들어진다.
 *   (표시된 값과 검증에 쓴 값이 어긋날 수 없다.)
 * - 정답은 숫자 한 개 또는 짧은 영문 이름/키워드로 한정한다. (표기 차이로 인한 오답 처리 방지)
 * - 방언 차이가 없는 표준 SQL 기능만 사용한다. (LIKE 대소문자, 정수 나눗셈, NULL 정렬 등은 회피)
 * - 모든 문항은 scripts/verify-quick-practice.ts 로 실제 DB 엔진 실행 결과와 대조 검증한다.
 */
export type SqlCell = string | number | null;

export interface TableDef {
  name: string;
  columns: string[];
  rows: SqlCell[][];
}

export interface SqlSeed {
  id: string;
  subCategory: string;
  difficulty: Difficulty;
  /** 표 앞에 오는 문제 문장 */
  intro: string;
  tables: TableDef[];
  /** 화면에 코드로 보여 줄 SQL */
  code: string;
  /** 표 뒤에 오는 질문 문장 */
  prompt: string;
  answer: string | string[];
  explanation: string;
  keywords: string[];
  /**
   * 검증용 SQL. 순서대로 실행하며 마지막 문장은 값 하나를 반환하는 SELECT 여야 한다.
   * 빈칸 문제는 정답을 채운 문장을 쓴다. expect 는 마지막 SELECT 의 첫 번째 값.
   */
  verify: { statements: string[]; expect: string };
}

const EMP: TableDef = {
  name: 'EMP',
  columns: ['ENAME', 'DEPT', 'SAL', 'BONUS'],
  rows: [
    ['AMY', 'A', 300, 100],
    ['BOB', 'A', 200, null],
    ['CAT', 'B', 400, 50],
    ['DAN', 'B', 250, null],
    ['EVE', 'C', 350, null],
  ],
};

const DEPT: TableDef = {
  name: 'DEPT',
  columns: ['DNO', 'DNAME'],
  rows: [
    ['A', 'SALES'],
    ['B', 'DEV'],
    ['C', 'HR'],
    ['D', 'PR'],
  ],
};

const T1: TableDef = { name: 'T1', columns: ['X'], rows: [[1], [2], [3], [4]] };
const T2: TableDef = { name: 'T2', columns: ['X'], rows: [[3], [4], [5]] };

const STU: TableDef = {
  name: 'STU',
  columns: ['SNAME', 'GRADE', 'SCORE'],
  rows: [
    ['JOY', 1, 90],
    ['MIN', 1, 70],
    ['SAM', 2, 80],
    ['TOM', 2, 60],
    ['UNA', 3, 100],
  ],
};

const RESULT_INTRO = '다음 테이블에 대해 SQL 문을 실행했을 때의 결과를 쓰시오.';
const BLANK_INTRO = '다음 테이블을 대상으로 한 SQL 문의 빈칸에 들어갈 키워드를 쓰시오.';

export const sqlPracticeSeeds: SqlSeed[] = [
  {
    id: 'QS_001',
    subCategory: 'WHERE/집계',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE SAL >= 300;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '3',
    explanation: 'SAL 이 300 이상인 행은 AMY(300), CAT(400), EVE(350) 3건입니다. COUNT(*) 는 조건을 만족한 행 수를 셉니다.',
    keywords: ['SQL', 'COUNT', 'WHERE'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE SAL >= 300'], expect: '3' },
  },
  {
    id: 'QS_002',
    subCategory: 'NULL/집계',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*) - COUNT(BONUS)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '3',
    explanation: 'COUNT(*) 는 NULL 을 포함한 전체 행 수 5, COUNT(BONUS) 는 NULL 이 아닌 값만 세어 2 입니다. 5 - 2 = 3, 즉 BONUS 가 NULL 인 행의 수입니다.',
    keywords: ['SQL', 'COUNT', 'NULL'],
    verify: { statements: ['SELECT COUNT(*) - COUNT(BONUS) FROM EMP'], expect: '3' },
  },
  {
    id: 'QS_003',
    subCategory: 'NULL/집계',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT SUM(BONUS)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '150',
    explanation: '집계 함수는 NULL 을 무시합니다. NULL 이 아닌 BONUS 는 100 과 50 뿐이므로 합계는 150 입니다.',
    keywords: ['SQL', 'SUM', 'NULL'],
    verify: { statements: ['SELECT SUM(BONUS) FROM EMP'], expect: '150' },
  },
  {
    id: 'QS_004',
    subCategory: 'NULL/집계',
    difficulty: 'HARD',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT AVG(BONUS)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: ['75', '75.0'],
    explanation: 'AVG 도 NULL 을 제외하고 계산합니다. NULL 이 아닌 값 100, 50 의 평균이므로 (100 + 50) / 2 = 75 입니다. NULL 을 0 으로 취급해 5로 나누면 30 이 되므로 주의하세요.',
    keywords: ['SQL', 'AVG', 'NULL'],
    verify: { statements: ['SELECT AVG(BONUS) FROM EMP'], expect: '75.0' },
  },
  {
    id: 'QS_005',
    subCategory: 'GROUP BY/HAVING',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT DEPT, SUM(SAL)
FROM EMP
GROUP BY DEPT
HAVING SUM(SAL) >= 500;`,
    prompt: '조회되는 행의 수를 쓰시오.',
    answer: '2',
    explanation: '부서별 SAL 합계는 A = 500, B = 650, C = 350 입니다. HAVING 으로 500 이상인 그룹만 남기므로 A 와 B, 2행이 조회됩니다.',
    keywords: ['SQL', 'GROUP BY', 'HAVING'],
    verify: {
      statements: [
        'SELECT COUNT(*) FROM (SELECT DEPT, SUM(SAL) FROM EMP GROUP BY DEPT HAVING SUM(SAL) >= 500)',
      ],
      expect: '2',
    },
  },
  {
    id: 'QS_006',
    subCategory: '서브쿼리',
    difficulty: 'HARD',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT MAX(S)
FROM (SELECT DEPT, SUM(SAL) AS S
      FROM EMP
      GROUP BY DEPT) T;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '650',
    explanation: '안쪽 쿼리가 부서별 합계(A = 500, B = 650, C = 350)를 만들고, 바깥 쿼리가 그 중 최댓값 650 을 구합니다.',
    keywords: ['SQL', '인라인 뷰', 'MAX', 'GROUP BY'],
    verify: {
      statements: ['SELECT MAX(S) FROM (SELECT DEPT, SUM(SAL) AS S FROM EMP GROUP BY DEPT) T'],
      expect: '650',
    },
  },
  {
    id: 'QS_007',
    subCategory: 'DISTINCT',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(DISTINCT DEPT)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '3',
    explanation: 'DEPT 값은 A, A, B, B, C 입니다. DISTINCT 로 중복을 제거하면 A, B, C 3종류입니다.',
    keywords: ['SQL', 'DISTINCT', 'COUNT'],
    verify: { statements: ['SELECT COUNT(DISTINCT DEPT) FROM EMP'], expect: '3' },
  },
  {
    id: 'QS_008',
    subCategory: 'BETWEEN',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE SAL BETWEEN 250 AND 350;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '3',
    explanation: 'BETWEEN 은 양 끝 값을 포함합니다. 250 이상 350 이하인 AMY(300), DAN(250), EVE(350) 3건입니다.',
    keywords: ['SQL', 'BETWEEN', '범위 조건'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE SAL BETWEEN 250 AND 350'], expect: '3' },
  },
  {
    id: 'QS_009',
    subCategory: '서브쿼리',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE DEPT IN (SELECT DEPT
               FROM EMP
               WHERE SAL >= 400);`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '2',
    explanation: '서브쿼리는 SAL 이 400 이상인 사람의 부서, 즉 B 를 반환합니다. 바깥 쿼리는 부서가 B 인 CAT, DAN 2명을 셉니다.',
    keywords: ['SQL', '서브쿼리', 'IN'],
    verify: {
      statements: [
        'SELECT COUNT(*) FROM EMP WHERE DEPT IN (SELECT DEPT FROM EMP WHERE SAL >= 400)',
      ],
      expect: '2',
    },
  },
  {
    id: 'QS_010',
    subCategory: '서브쿼리',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE SAL > (SELECT AVG(SAL) FROM EMP);`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '2',
    explanation: '평균 SAL 은 (300 + 200 + 400 + 250 + 350) / 5 = 300 입니다. 평균보다 큰 사람은 CAT(400), EVE(350) 2명입니다. (300 은 초과가 아님)',
    keywords: ['SQL', '서브쿼리', 'AVG'],
    verify: {
      statements: ['SELECT COUNT(*) FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP)'],
      expect: '2',
    },
  },
  {
    id: 'QS_011',
    subCategory: 'ORDER BY',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT ENAME
FROM EMP
ORDER BY SAL DESC;`,
    prompt: '조회 결과의 첫 번째 행에 나타나는 ENAME 값을 쓰시오.',
    answer: 'CAT',
    explanation: 'SAL 내림차순(DESC)이므로 가장 큰 400 을 가진 CAT 이 첫 행입니다.',
    keywords: ['SQL', 'ORDER BY', 'DESC'],
    verify: { statements: ['SELECT ENAME FROM EMP ORDER BY SAL DESC'], expect: 'CAT' },
  },
  {
    id: 'QS_012',
    subCategory: 'NULL',
    difficulty: 'HARD',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE BONUS = NULL;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '0',
    explanation: 'NULL 과의 비교(=, <>)는 항상 알 수 없음(UNKNOWN)이 되어 어떤 행도 선택되지 않습니다. NULL 을 찾으려면 IS NULL 을 써야 하며, 이 쿼리는 0 을 반환합니다.',
    keywords: ['SQL', 'NULL', 'IS NULL'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE BONUS = NULL'], expect: '0' },
  },
  {
    id: 'QS_013',
    subCategory: 'NULL',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE BONUS IS NULL
  AND SAL > 200;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '2',
    explanation: 'BONUS 가 NULL 인 사람은 BOB(200), DAN(250), EVE(350) 입니다. 여기에 SAL > 200 을 함께 만족하는 DAN, EVE 2명입니다.',
    keywords: ['SQL', 'IS NULL', 'AND'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE BONUS IS NULL AND SAL > 200'], expect: '2' },
  },
  {
    id: 'QS_014',
    subCategory: 'CASE',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT SUM(CASE WHEN DEPT = 'A'
                THEN SAL
                ELSE 0 END)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '500',
    explanation: 'DEPT 가 A 인 행(AMY 300, BOB 200)만 SAL 을 더하고 나머지는 0 을 더합니다. 합계는 500 입니다.',
    keywords: ['SQL', 'CASE', 'SUM'],
    verify: {
      statements: ["SELECT SUM(CASE WHEN DEPT = 'A' THEN SAL ELSE 0 END) FROM EMP"],
      expect: '500',
    },
  },
  {
    id: 'QS_015',
    subCategory: 'NULL/집계',
    difficulty: 'HARD',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT SUM(SAL + BONUS)
FROM EMP;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '850',
    explanation: 'NULL 이 들어간 산술 연산의 결과는 NULL 입니다. SAL + BONUS 는 AMY = 400, CAT = 450 이고 나머지는 NULL 이 되어 SUM 에서 무시됩니다. 400 + 450 = 850. (NULL 을 0 으로 바꾸려면 COALESCE/NVL 사용)',
    keywords: ['SQL', 'NULL', '산술 연산', 'SUM'],
    verify: { statements: ['SELECT SUM(SAL + BONUS) FROM EMP'], expect: '850' },
  },
  {
    id: 'QS_016',
    subCategory: 'UPDATE',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `UPDATE EMP
SET SAL = SAL + 50
WHERE DEPT = 'B';

SELECT SUM(SAL)
FROM EMP;`,
    prompt: '마지막 SELECT 문의 실행 결과 값을 쓰시오.',
    answer: '1600',
    explanation: '처음 SAL 합계는 1500 입니다. 부서가 B 인 CAT, DAN 2명이 각각 50 씩 올라 100 이 늘어 1600 입니다.',
    keywords: ['SQL', 'UPDATE', 'SUM'],
    verify: {
      statements: ["UPDATE EMP SET SAL = SAL + 50 WHERE DEPT = 'B'", 'SELECT SUM(SAL) FROM EMP'],
      expect: '1600',
    },
  },
  {
    id: 'QS_017',
    subCategory: 'DELETE',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `DELETE FROM EMP
WHERE BONUS IS NULL;

SELECT COUNT(*)
FROM EMP;`,
    prompt: '마지막 SELECT 문의 실행 결과 값을 쓰시오.',
    answer: '2',
    explanation: 'BONUS 가 NULL 인 BOB, DAN, EVE 3행이 삭제되어 AMY, CAT 2행이 남습니다.',
    keywords: ['SQL', 'DELETE', 'COUNT'],
    verify: {
      statements: ['DELETE FROM EMP WHERE BONUS IS NULL', 'SELECT COUNT(*) FROM EMP'],
      expect: '2',
    },
  },
  {
    id: 'QS_018',
    subCategory: 'INSERT',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `INSERT INTO EMP
VALUES ('FAY', 'A', 500, NULL);

SELECT COUNT(*)
FROM EMP
WHERE DEPT = 'A';`,
    prompt: '마지막 SELECT 문의 실행 결과 값을 쓰시오.',
    answer: '3',
    explanation: '원래 부서 A 는 AMY, BOB 2명이고, FAY 가 부서 A 로 추가되어 3명이 됩니다.',
    keywords: ['SQL', 'INSERT', 'COUNT'],
    verify: {
      statements: [
        "INSERT INTO EMP VALUES ('FAY', 'A', 500, NULL)",
        "SELECT COUNT(*) FROM EMP WHERE DEPT = 'A'",
      ],
      expect: '3',
    },
  },
  {
    id: 'QS_019',
    subCategory: 'LIKE',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP],
    code: `SELECT COUNT(*)
FROM EMP
WHERE ENAME LIKE '_A%';`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '2',
    explanation: "'_' 는 임의의 한 글자, '%' 는 임의의 길이의 문자열입니다. '_A%' 는 두 번째 글자가 A 인 이름이므로 CAT, DAN 2건입니다.",
    keywords: ['SQL', 'LIKE', '와일드카드'],
    verify: { statements: ["SELECT COUNT(*) FROM EMP WHERE ENAME LIKE '_A%'"], expect: '2' },
  },
  {
    id: 'QS_020',
    subCategory: 'JOIN',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP, DEPT],
    code: `SELECT COUNT(*)
FROM DEPT D JOIN EMP E
  ON D.DNO = E.DEPT;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '5',
    explanation: '내부 조인은 조건이 맞는 행끼리만 결합합니다. 사원 5명 모두 부서가 있으므로 5행이 나오고, 사원이 없는 부서 D 는 결과에 나타나지 않습니다.',
    keywords: ['SQL', 'JOIN', '내부 조인'],
    verify: {
      statements: ['SELECT COUNT(*) FROM DEPT D JOIN EMP E ON D.DNO = E.DEPT'],
      expect: '5',
    },
  },
  {
    id: 'QS_021',
    subCategory: 'JOIN',
    difficulty: 'HARD',
    intro: RESULT_INTRO,
    tables: [EMP, DEPT],
    code: `SELECT COUNT(*)
FROM DEPT D LEFT JOIN EMP E
  ON D.DNO = E.DEPT;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '6',
    explanation: 'LEFT JOIN 은 왼쪽(DEPT) 행을 모두 유지합니다. A 2행, B 2행, C 1행에 더해, 사원이 없는 부서 D 도 사원 컬럼이 NULL 인 1행으로 나오므로 6행입니다.',
    keywords: ['SQL', 'LEFT JOIN', '외부 조인'],
    verify: {
      statements: ['SELECT COUNT(*) FROM DEPT D LEFT JOIN EMP E ON D.DNO = E.DEPT'],
      expect: '6',
    },
  },
  {
    id: 'QS_022',
    subCategory: 'JOIN',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP, DEPT],
    code: `SELECT D.DNAME
FROM EMP E JOIN DEPT D
  ON E.DEPT = D.DNO
WHERE E.SAL = 400;`,
    prompt: '조회되는 DNAME 값을 쓰시오.',
    answer: 'DEV',
    explanation: 'SAL 이 400 인 사원은 CAT 이고 부서 코드는 B 입니다. DEPT 에서 B 의 DNAME 은 DEV 입니다.',
    keywords: ['SQL', 'JOIN', 'WHERE'],
    verify: {
      statements: ['SELECT D.DNAME FROM EMP E JOIN DEPT D ON E.DEPT = D.DNO WHERE E.SAL = 400'],
      expect: 'DEV',
    },
  },
  {
    id: 'QS_023',
    subCategory: '서브쿼리',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [EMP, DEPT],
    code: `SELECT COUNT(*)
FROM DEPT
WHERE DNO NOT IN (SELECT DEPT FROM EMP);`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '1',
    explanation: 'EMP 에 등장하는 부서는 A, B, C 입니다. 여기에 없는 부서는 D 하나이므로 1 입니다.',
    keywords: ['SQL', 'NOT IN', '서브쿼리'],
    verify: {
      statements: ['SELECT COUNT(*) FROM DEPT WHERE DNO NOT IN (SELECT DEPT FROM EMP)'],
      expect: '1',
    },
  },
  {
    id: 'QS_024',
    subCategory: '집합 연산',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [T1, T2],
    code: `SELECT X FROM T1
UNION
SELECT X FROM T2;`,
    prompt: '조회되는 행의 수를 쓰시오.',
    answer: '5',
    explanation: 'UNION 은 두 결과를 합치면서 중복을 제거합니다. {1, 2, 3, 4} 와 {3, 4, 5} 의 합집합은 {1, 2, 3, 4, 5} 이므로 5행입니다.',
    keywords: ['SQL', 'UNION', '집합 연산'],
    verify: {
      statements: ['SELECT COUNT(*) FROM (SELECT X FROM T1 UNION SELECT X FROM T2)'],
      expect: '5',
    },
  },
  {
    id: 'QS_025',
    subCategory: '집합 연산',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [T1, T2],
    code: `SELECT X FROM T1
UNION ALL
SELECT X FROM T2;`,
    prompt: '조회되는 행의 수를 쓰시오.',
    answer: '7',
    explanation: 'UNION ALL 은 중복을 제거하지 않고 그대로 이어 붙입니다. 4행 + 3행 = 7행입니다.',
    keywords: ['SQL', 'UNION ALL', '집합 연산'],
    verify: {
      statements: ['SELECT COUNT(*) FROM (SELECT X FROM T1 UNION ALL SELECT X FROM T2)'],
      expect: '7',
    },
  },
  {
    id: 'QS_026',
    subCategory: '집합 연산',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [T1, T2],
    code: `SELECT X FROM T1
INTERSECT
SELECT X FROM T2;`,
    prompt: '조회되는 행의 수를 쓰시오.',
    answer: '2',
    explanation: 'INTERSECT 는 두 결과에 모두 있는 행(교집합)만 남깁니다. 공통 값은 3 과 4 이므로 2행입니다.',
    keywords: ['SQL', 'INTERSECT', '집합 연산'],
    verify: {
      statements: ['SELECT COUNT(*) FROM (SELECT X FROM T1 INTERSECT SELECT X FROM T2)'],
      expect: '2',
    },
  },
  {
    id: 'QS_027',
    subCategory: '집계',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [STU],
    code: `SELECT MAX(SCORE) - MIN(SCORE)
FROM STU;`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '40',
    explanation: 'SCORE 의 최댓값은 100(UNA), 최솟값은 60(TOM) 이므로 100 - 60 = 40 입니다.',
    keywords: ['SQL', 'MAX', 'MIN'],
    verify: { statements: ['SELECT MAX(SCORE) - MIN(SCORE) FROM STU'], expect: '40' },
  },
  {
    id: 'QS_028',
    subCategory: '서브쿼리',
    difficulty: 'MEDIUM',
    intro: RESULT_INTRO,
    tables: [STU],
    code: `SELECT SNAME
FROM STU
WHERE SCORE = (SELECT MAX(SCORE)
               FROM STU
               WHERE GRADE = 2);`,
    prompt: '조회되는 SNAME 값을 쓰시오.',
    answer: 'SAM',
    explanation: '서브쿼리는 2학년의 최고 점수 80(SAM)을 구합니다. 바깥 쿼리는 SCORE 가 80 인 학생을 조회하므로 SAM 입니다.',
    keywords: ['SQL', '서브쿼리', 'MAX'],
    verify: {
      statements: [
        'SELECT SNAME FROM STU WHERE SCORE = (SELECT MAX(SCORE) FROM STU WHERE GRADE = 2)',
      ],
      expect: 'SAM',
    },
  },
  {
    id: 'QS_029',
    subCategory: '집계',
    difficulty: 'EASY',
    intro: RESULT_INTRO,
    tables: [STU],
    code: `SELECT SUM(SCORE)
FROM STU
WHERE GRADE IN (1, 3);`,
    prompt: '실행 결과 값을 쓰시오.',
    answer: '260',
    explanation: '1학년(JOY 90, MIN 70)과 3학년(UNA 100)의 점수를 더하면 90 + 70 + 100 = 260 입니다.',
    keywords: ['SQL', 'SUM', 'IN'],
    verify: { statements: ['SELECT SUM(SCORE) FROM STU WHERE GRADE IN (1, 3)'], expect: '260' },
  },

  // ───────────── 빈칸 채우기 (키워드) ─────────────
  {
    id: 'QS_030',
    subCategory: 'ORDER BY',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT ENAME, SAL
FROM EMP
ORDER BY SAL (  1  );`,
    prompt: '급여(SAL)가 높은 사람부터 먼저 나오도록 정렬하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['DESC', 'desc'],
    explanation: 'ORDER BY 의 기본 정렬은 오름차순(ASC)이며, 내림차순(큰 값부터)은 DESC 를 붙입니다.',
    keywords: ['SQL', 'ORDER BY', 'DESC'],
    verify: { statements: ['SELECT ENAME FROM EMP ORDER BY SAL DESC'], expect: 'CAT' },
  },
  {
    id: 'QS_031',
    subCategory: 'DISTINCT',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT (  1  ) DEPT
FROM EMP;`,
    prompt: '부서(DEPT) 값의 중복을 제거하여 A, B, C 3행만 조회하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['DISTINCT', 'distinct'],
    explanation: 'SELECT 바로 뒤에 DISTINCT 를 쓰면 조회 결과에서 중복된 행이 제거됩니다.',
    keywords: ['SQL', 'DISTINCT'],
    verify: { statements: ['SELECT COUNT(*) FROM (SELECT DISTINCT DEPT FROM EMP)'], expect: '3' },
  },
  {
    id: 'QS_032',
    subCategory: 'BETWEEN',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT ENAME
FROM EMP
WHERE SAL (  1  ) 250 (  2  ) 350;`,
    prompt: '급여가 250 이상 350 이하인 사원을 조회하려 합니다. 빈칸 (1), (2)에 들어갈 키워드를 순서대로 쓰시오.',
    answer: ['BETWEEN, AND', 'BETWEEN AND', 'BETWEEN,AND'],
    explanation: '범위 조건은 컬럼 BETWEEN 값1 AND 값2 형태로 쓰며 양 끝 값을 포함합니다.',
    keywords: ['SQL', 'BETWEEN', 'AND'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE SAL BETWEEN 250 AND 350'], expect: '3' },
  },
  {
    id: 'QS_033',
    subCategory: 'NULL',
    difficulty: 'MEDIUM',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT ENAME
FROM EMP
WHERE BONUS (  1  );`,
    prompt: '보너스(BONUS)가 NULL 인 사원을 조회하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['IS NULL', 'is null', 'ISNULL'],
    explanation: 'NULL 은 = 로 비교할 수 없고 반드시 IS NULL 로 검사해야 합니다. NULL 이 아닌 행은 IS NOT NULL 입니다.',
    keywords: ['SQL', 'IS NULL', 'NULL'],
    verify: { statements: ['SELECT COUNT(*) FROM EMP WHERE BONUS IS NULL'], expect: '3' },
  },
  {
    id: 'QS_034',
    subCategory: '집합 연산',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [T1, T2],
    code: `SELECT X FROM T1
(  1  )
SELECT X FROM T2;`,
    prompt: '두 조회 결과를 합치되 중복된 행은 한 번만 나오게 하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['UNION', 'union'],
    explanation: 'UNION 은 합집합이며 중복을 제거합니다. 중복을 그대로 두려면 UNION ALL 을 씁니다.',
    keywords: ['SQL', 'UNION', '집합 연산'],
    verify: {
      statements: ['SELECT COUNT(*) FROM (SELECT X FROM T1 UNION SELECT X FROM T2)'],
      expect: '5',
    },
  },
  {
    id: 'QS_035',
    subCategory: 'DDL',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `(  1  ) TABLE EMP
ADD GRADE VARCHAR(2);`,
    prompt: 'EMP 테이블에 GRADE 컬럼을 추가하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['ALTER', 'alter'],
    explanation: '테이블의 구조를 변경하는 DDL 은 ALTER TABLE 입니다. 컬럼 추가는 ADD, 삭제는 DROP COLUMN, 변경은 MODIFY(또는 ALTER COLUMN)를 씁니다.',
    keywords: ['SQL', 'DDL', 'ALTER'],
    verify: {
      statements: [
        'ALTER TABLE EMP ADD GRADE VARCHAR(2)',
        "SELECT COUNT(*) FROM pragma_table_info('EMP')",
      ],
      expect: '5',
    },
  },
  {
    id: 'QS_036',
    subCategory: 'DDL',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `(  1  ) VIEW HIGH_PAID AS
SELECT *
FROM EMP
WHERE SAL >= 300;`,
    prompt: '급여가 300 이상인 사원만 보이는 뷰(HIGH_PAID)를 만들려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['CREATE', 'create'],
    explanation: '뷰, 테이블, 인덱스 등 객체를 만드는 DDL 은 CREATE 입니다. 뷰를 지울 때는 DROP VIEW 를 씁니다.',
    keywords: ['SQL', 'DDL', 'CREATE VIEW', '뷰'],
    verify: {
      statements: [
        'CREATE VIEW HIGH_PAID AS SELECT * FROM EMP WHERE SAL >= 300',
        'SELECT COUNT(*) FROM HIGH_PAID',
      ],
      expect: '3',
    },
  },
  {
    id: 'QS_037',
    subCategory: 'JOIN',
    difficulty: 'MEDIUM',
    intro: BLANK_INTRO,
    tables: [EMP, DEPT],
    code: `SELECT E.ENAME, D.DNAME
FROM EMP E (  1  ) DEPT D
  ON E.DEPT = D.DNO;`,
    prompt: '두 테이블에서 조인 조건이 일치하는 행만 결합하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['JOIN', 'INNER JOIN', 'join', 'inner join'],
    explanation: 'ON 조건이 일치하는 행만 결합하는 것은 내부 조인(INNER JOIN)이며, JOIN 만 써도 기본값은 INNER JOIN 입니다.',
    keywords: ['SQL', 'JOIN', 'INNER JOIN'],
    verify: {
      statements: ['SELECT COUNT(*) FROM EMP E JOIN DEPT D ON E.DEPT = D.DNO'],
      expect: '5',
    },
  },
  {
    id: 'QS_038',
    subCategory: '집계',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT (  1  )(SAL)
FROM EMP;`,
    prompt: '급여(SAL)의 평균을 구하려 합니다. 빈칸 (1)에 들어갈 집계 함수의 이름을 쓰시오.',
    answer: ['AVG', 'avg'],
    explanation: '평균은 AVG, 합계는 SUM, 개수는 COUNT, 최댓값/최솟값은 MAX/MIN 입니다.',
    keywords: ['SQL', 'AVG', '집계 함수'],
    verify: { statements: ['SELECT AVG(SAL) FROM EMP'], expect: '300.0' },
  },
  {
    id: 'QS_039',
    subCategory: 'LIKE',
    difficulty: 'EASY',
    intro: BLANK_INTRO,
    tables: [EMP],
    code: `SELECT ENAME
FROM EMP
WHERE ENAME (  1  ) 'A%';`,
    prompt: '이름이 A 로 시작하는 사원을 조회하려 합니다. 빈칸 (1)에 들어갈 키워드를 쓰시오.',
    answer: ['LIKE', 'like'],
    explanation: '문자열 패턴 검색은 LIKE 를 사용하며 % 는 임의의 길이의 문자열을 의미합니다. 이 조건에 맞는 사원은 AMY 1명입니다.',
    keywords: ['SQL', 'LIKE', '와일드카드'],
    verify: { statements: ["SELECT COUNT(*) FROM EMP WHERE ENAME LIKE 'A%'"], expect: '1' },
  },
];

function renderCell(cell: SqlCell): string {
  return cell === null ? 'NULL' : String(cell);
}

/** 화면에 보여 줄 표 텍스트 (파이프 구분) */
export function renderTable(table: TableDef): string {
  const lines = [`[${table.name}]`, table.columns.join(' | ')];
  for (const row of table.rows) {
    lines.push(row.map(renderCell).join(' | '));
  }
  return lines.join('\n');
}

function toQuestion(seed: SqlSeed): Question {
  const tableText = seed.tables.map(renderTable).join('\n\n');
  return {
    id: seed.id,
    subject: '데이터베이스구축',
    category: 'SQL',
    subCategory: seed.subCategory,
    type: 'SQL',
    question: `${seed.intro}\n\n${tableText}\n\n${seed.prompt}`,
    code: seed.code,
    language: 'SQL',
    answer: seed.answer,
    explanation: seed.explanation,
    difficulty: seed.difficulty,
    keywords: seed.keywords,
    source: '유형 연습(실행 검증)',
    practiceKind: 'SQL_PRACTICE',
  };
}

export const sqlPracticeQuestions: Question[] = sqlPracticeSeeds.map(toQuestion);

