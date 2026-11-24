import { Question } from "../../../types/question";
import { buildSecuritySectionQuestions } from "./builders";

/**
 * 3과목 애플리케이션 보안 — 공통 범위 창작 문제 (2023~2026 현행 및 공통 기준)
 */
const app0101 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_APP_01_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_APP_011",
      category: "웹 애플리케이션 보안",
      question:
        "SQL Injection 취약점을 방어하는 방법으로 Prepared Statement(매개변수화 질의, Parameterized Query)가 단순 문자열 치환(블랙리스트 필터링)보다 근본적인 대책으로 평가받는 이유는?",
      options: [
        "SQL 구문 파싱과 데이터 바인딩을 분리해 입력을 순수 리터럴로 처리한다.",
        "저장 프로시저 내부에서 동적 SQL 문자열을 결합해 인젝션 실행을 차단한다.",
        "SQL 오류 메시지를 숨겨 공격자가 에러 기반 구문 추측을 못 하게 막는다.",
        "애플리케이션과 DB 통신 구간을 TLS로 암호화해 SQL 변조를 차단한다.",
      ],
      answer:
        "SQL 구문 파싱과 데이터 바인딩을 분리해 입력을 순수 리터럴로 처리한다.",
      explanation:
        "Prepared Statement는 SQL 실행 계획(구문 트리)을 먼저 확정한 뒤 사용자 입력을 바인딩 변수(리터럴 데이터)로만 전달하므로 `' OR '1'='1` 같은 메타문자가 구문 구조를 변경할 수 없습니다. 단순 블랙리스트 치환이나 오류 숨김, 저장 프로시저 내 동적 문자열 결합만으로는 근본 차단이 어렵습니다.",
      difficulty: "EASY",
      keywords: ["SQL Injection", "Prepared Statement", "바인딩 변수"],
    },
    {
      id: "SEC_CMN_APP_012",
      category: "웹 애플리케이션 보안",
      question:
        "데이터베이스 오류 메시지나 질의 결과가 웹 응답 화면에 전혀 출력되지 않는 환경에서, 공격자가 참/거짓 조건에 따른 페이지 응답 차이 또는 `SLEEP()`·`WAITFOR DELAY` 같은 응답 지연 시간 차이를 이용해 데이터를 한 글자씩 추측하는 SQL Injection 유형은?",
      options: [
        "Blind SQL Injection",
        "Error-based SQL Injection",
        "UNION-based SQL Injection",
        "Second-Order SQL Injection",
      ],
      answer: "Blind SQL Injection",
      explanation:
        "Blind SQL Injection은 에러 메시지나 결과 레코드가 직접 보이지 않을 때 참/거짓 조건의 응답 내용 차이(Boolean-based)나 고의적인 지연 함수의 응답 시간 차이(Time-based)를 관찰해 데이터를 추출하는 기법입니다. Error-based는 DB 에러 노출을, UNION-based는 SELECT 결과 화면 출력을 이용합니다.",
      difficulty: "MEDIUM",
      keywords: ["Blind SQL Injection", "Time-based", "Boolean-based"],
    },
    {
      id: "SEC_CMN_APP_013",
      category: "웹 애플리케이션 보안",
      question:
        "Stored XSS(저장형), Reflected XSS(반사형), DOM-based XSS의 차이를 가장 정확하게 설명한 것은?",
      options: [
        "Stored는 서버 저장 후 열람, Reflected는 응답 즉시 반사, DOM은 클라이언트 스크립트 조작이다.",
        "Stored는 서버 OS 명령을 직접 실행하고, Reflected·DOM-based XSS만 브라우저에서 실행된다.",
        "DOM-based는 DB 저장 쿼리를 변조하고, Stored·Reflected는 항상 GET URL 파라미터로만 유입된다.",
        "Reflected는 서버 파일시스템에 영속 저장되므로 별도의 악성 링크 클릭 없이 방문 즉시 감염된다.",
      ],
      answer:
        "Stored는 서버 저장 후 열람, Reflected는 응답 즉시 반사, DOM은 클라이언트 스크립트 조작이다.",
      explanation:
        "XSS 3유형 모두 피해자 웹 브라우저에서 스크립트가 실행되지만 전달 경로가 다릅니다. Stored는 게시판·프로필 등 서버 DB에 영속 저장 후 열람 시 실행, Reflected는 악성 링크의 요청 파라미터가 서버 응답에 즉시 반사, DOM-based는 서버 응답 변경 없이 클라이언트 JS가 `location.hash`·`innerHTML` 등을 안전하지 않게 처리하며 발생합니다.",
      difficulty: "MEDIUM",
      keywords: ["Stored XSS", "Reflected XSS", "DOM-based XSS", "XSS"],
    },
    {
      id: "SEC_CMN_APP_014",
      category: "웹 애플리케이션 보안",
      question:
        "웹 애플리케이션에서 XSS(Cross-Site Scripting) 공격을 예방·완화하기 위한 조치로 적절하지 않은 것은?",
      options: [
        "사용자 입력값을 HTML 본문에 출력할 때 클라이언트 JavaScript 검증만 수행하고 서버 측 출력 인코딩은 생략한다.",
        "출력 위치(HTML 본문, 속성, JS, URL)에 맞는 컨텍스트 기반 출력 인코딩(예: `<`→`&lt;`, `>`→`&gt;`)을 적용한다.",
        "CSP(Content Security Policy) 응답 헤더를 설정해 인라인 스크립트 및 비인가 외부 스크립트 실행을 제한한다.",
        "세션 쿠키에 HttpOnly 속성을 설정해 XSS 발생 시에도 `document.cookie`로 세션 탈취 피해를 완화한다.",
      ],
      answer:
        "사용자 입력값을 HTML 본문에 출력할 때 클라이언트 JavaScript 검증만 수행하고 서버 측 출력 인코딩은 생략한다.",
      explanation:
        "클라이언트(브라우저) 측 입력 검증은 프록시 도구나 직접 HTTP 요청으로 쉽게 우회할 수 있으므로 반드시 서버 측에서 출력 컨텍스트에 맞는 이스케이프·인코딩(HTML Entity Encoding 등)과 화이트리스트 검증을 적용해야 합니다. CSP와 HttpOnly는 다층 방어(Defense in Depth) 수단으로 효과적입니다.",
      difficulty: "EASY",
      keywords: ["XSS 대응", "출력 인코딩", "CSP", "HttpOnly"],
    },
    {
      id: "SEC_CMN_APP_015",
      category: "웹 애플리케이션 보안",
      question:
        "XSS(Cross-Site Scripting)와 CSRF(Cross-Site Request Forgery)의 공격 원리 및 주된 대응 수단을 바르게 비교한 것은?",
      options: [
        "XSS는 브라우저 스크립트 실행(인코딩·CSP 방어), CSRF는 인증 요청 위조(토큰·SameSite 방어)다.",
        "XSS는 인증 브라우저 요청 위조(CSRF 토큰 방어), CSRF는 악성 스크립트 삽입(HTML 인코딩 방어)다.",
        "XSS는 세션 쿠키의 HttpOnly만으로 100% 차단되고, CSRF는 서버 측 출력 인코딩만으로 차단된다.",
        "XSS는 로그인 사용자에게만 발생하고, CSRF는 익명 비로그인 사용자 브라우저에서만 성립한다.",
      ],
      answer:
        "XSS는 브라우저 스크립트 실행(인코딩·CSP 방어), CSRF는 인증 요청 위조(토큰·SameSite 방어)다.",
      explanation:
        "XSS는 '사용자 → 사이트' 신뢰를 악용해 피해자 브라우저에서 악성 스크립트를 실행시키는 반면, CSRF는 '사이트 → 인증된 브라우저(쿠키 자동 전송)' 신뢰를 악용해 피해자 의사와 무관한 상태 변경 요청(비밀번호 변경, 송금 등)을 강제 실행합니다. 단, 사이트에 XSS 취약점이 존재하면 공격 스크립트가 CSRF 토큰까지 읽어 우회할 수 있으므로 XSS 방어가 선행되어야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["XSS", "CSRF", "CSRF 토큰", "SameSite"],
    },
    {
      id: "SEC_CMN_APP_016",
      category: "웹 애플리케이션 보안",
      question:
        "은행 웹 사이트에 로그인한 사용자가 공격자가 보낸 블로그 링크를 열람하자, 숨겨진 `<form>`이 자동 제출되어 사용자의 동의 없이 비밀번호 변경 요청이 은행 서버로 전송되었다. 은행 서버가 이 공격을 차단하기 위해 추가해야 할 가장 효과적인 방어 조합은?",
      options: [
        "난수 CSRF 토큰 검증·중요 기능 재인증·SameSite 쿠키",
        "세션 쿠키에 HttpOnly 속성 추가·HTML 출력 인코딩 적용",
        "Access-Control-Allow-Origin: * CORS 응답 헤더 전면 허용",
        "비밀번호 변경 요청을 POST 대신 GET 메서드로 단순화",
      ],
      answer: "난수 CSRF 토큰 검증·중요 기능 재인증·SameSite 쿠키",
      explanation:
        "제시된 상황은 전형적인 CSRF(크로스 사이트 요청 위조) 공격입니다. 상태 변경 요청은 반드시 POST 등 안전하지 않은 메서드를 사용하고, 세션별 예측 불가능한 동기화 토큰(Synchronizer Token) 검증, 중요 행위 재인증(현재 비밀번호·CAPTCHA·OTP), `SameSite=Lax/Strict` 쿠키 속성 설정으로 방어해야 합니다.",
      difficulty: "EASY",
      keywords: ["CSRF", "동기화 토큰", "재인증", "SameSite"],
    },
    {
      id: "SEC_CMN_APP_017",
      category: "웹 애플리케이션 보안",
      question:
        "웹 서버가 외부 사용자가 입력한 호스트명이나 IP 주소를 검증 없이 `system(\"ping -c 1 \" + userInput)` 형태로 운영체제 셸에 전달할 때 발생할 수 있는 취약점과 가장 안전한 예방 방법은?",
      options: [
        "OS 명령어 삽입 — 표준 API 사용·화이트리스트 검증 및 인자 분리",
        "OS 명령어 삽입 — HTML 엔티티 인코딩 및 HttpOnly 쿠키 설정",
        "SSRF(서버 측 요청 위조) — 응답 헤더에 X-Frame-Options: DENY 적용",
        "경로 조작(Path Traversal) — 클라이언트 JS로 입력 길이만 15자 제한",
      ],
      answer: "OS 명령어 삽입 — 표준 API 사용·화이트리스트 검증 및 인자 분리",
      explanation:
        "사용자 입력이 셸 메타문자(`;`, `|`, `&&`, `` ` ``, `$()`)와 함께 OS 명령 실행 함수에 결합되면 임의 명령이 실행되는 OS Command Injection이 발생합니다. 근본 대책은 OS 셸을 거치지 않는 언어 표준 라이브러리 API를 사용하는 것이며, 외부 프로그램 실행이 불가피하면 셸 해석 없이 인자 배열로 분리 전달(execve 계열)하고 엄격한 화이트리스트 검증을 적용해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["Command Injection", "OS 명령어 삽입", "화이트리스트"],
    },
    {
      id: "SEC_CMN_APP_018",
      category: "웹 애플리케이션 보안",
      question:
        "웹 애플리케이션이 사용자가 입력한 URL을 서버 측에서 직접 요청(fetch)해 미리보기 이미지를 생성하는 기능을 제공한다. 공격자가 입력값에 `http://169.254.169.254/latest/meta-data/` 또는 내부망 관리 페이지 주소를 넣어 외부에서는 접근할 수 없는 내부 자원을 조회하려 한다. 이 공격 유형과 핵심 방어 대책은?",
      options: [
        "SSRF — 허용 도메인 화이트리스트 및 사설·메타데이터 대역 차단",
        "CSRF — 요청마다 예측 불가능한 난수 동기화 토큰 및 재인증 적용",
        "Open Redirect — HTTP Referer 헤더 검증 및 쿠키 SameSite 설정",
        "CORS 우회 — Access-Control-Allow-Credentials 응답 헤더 비활성화",
      ],
      answer: "SSRF — 허용 도메인 화이트리스트 및 사설·메타데이터 대역 차단",
      explanation:
        "SSRF(Server-Side Request Forgery)는 서버가 공격자가 조작한 URL로 대신 HTTP/네트워크 요청을 보내도록 유도해 내부망 포트 스캔이나 클라우드 메타데이터 서비스(`169.254.169.254`) 탈취를 시도하는 공격입니다. DNS Rebinding·302 리다이렉션 우회까지 고려해 최종 해석된 IP가 사설/루프백/링크로컬 대역인지 차단하고 허용 도메인·프로토콜 화이트리스트를 적용해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["SSRF", "서버 측 요청 위조", "169.254.169.254", "화이트리스트"],
    },
    {
      id: "SEC_CMN_APP_019",
      category: "웹 애플리케이션 보안",
      question:
        "XML 데이터를 파싱하는 웹 서비스에서 외부 엔티티 참조(`<!ENTITY ... SYSTEM \"file:///etc/passwd\">`) 기능이 활성화되어 있어 서버 로컬 파일 노출이나 내부망 요청이 발생하는 취약점과 예방 대책은?",
      options: [
        "XXE 인젝션 — XML 파서의 DTD 및 외부 엔티티 처리 비활성화",
        "XPath 인젝션 — XML 입력 문자열 내 작은따옴표(')만 치환",
        "CRLF 인젝션 — XML 응답 헤더의 개행 문자(\\r\\n) 입력 차단",
        "SSI 인젝션 — 웹 서버의 HTML 특수문자(<, >) 엔티티 인코딩",
      ],
      answer: "XXE 인젝션 — XML 파서의 DTD 및 외부 엔티티 처리 비활성화",
      explanation:
        "XXE(XML External Entity Injection)는 안전하지 않게 설정된 XML 파서가 외부 엔티티(External Entity) 선언을 해석하면서 로컬 파일 유출, SSRF, DoS(Billion Laughs) 등을 일으키는 취약점입니다. 가장 확실한 예방은 사용하는 XML 파서에서 DTD 처리(`disallow-doctype-decl`)와 외부 일반/파라미터 엔티티 참조 기능을 비활성화하는 것입니다.",
      difficulty: "MEDIUM",
      keywords: ["XXE", "XML External Entity", "DTD 비활성화"],
    },
    {
      id: "SEC_CMN_APP_020",
      category: "웹 애플리케이션 보안",
      question:
        "웹 보안 관제 로그에서 특정 IP가 로그인 및 게시판 검색 파라미터에 `UNION SELECT`, `INFORMATION_SCHEMA`, `SLEEP(5)` 문자열을 짧은 시간에 수백 회 반복 전송하는 징후가 탐지되었다. 즉각 대응과 근본 조치의 조합으로 가장 적절한 것은?",
      options: [
        "공격 IP 차단·DB 유출 감사(즉각) + Prepared Statement·최소권한(근본)",
        "웹 에러 메시지만 숨김 처리(즉각) + 클라이언트 JS 검증 강화(근본)",
        "웹 서버 80·443 포트 재시작(즉각) + 세션 쿠키 HttpOnly 속성 추가(근본)",
        "관리자 DB 계정 암호만 변경(즉각) + 블랙리스트 문자 2종 치환(근본)",
      ],
      answer:
        "공격 IP 차단·DB 유출 감사(즉각) + Prepared Statement·최소권한(근본)",
      explanation:
        "`UNION SELECT`, `INFORMATION_SCHEMA`, `SLEEP(5)` 반복 요청은 자동화 도구를 이용한 SQL Injection(UNION/Blind) 시도 징후입니다. 사고 대응 시 WAF·방화벽으로 공격 트래픽을 우선 차단하고 DB 로그·데이터 유출 여부를 점검한 뒤, 근본적으로 코드에 Prepared Statement를 적용하고 애플리케이션 DB 계정에 최소 권한 원칙을 부여해야 합니다.",
      difficulty: "EASY",
      keywords: ["SQL Injection", "징후", "WAF", "근본 조치"],
    },
    {
      id: "SEC_CMN_APP_021",
      category: "웹 애플리케이션 보안",
      question:
        "웹 페이지에 투명한 `<iframe>`을 겹쳐 놓고 사용자가 정상적인 버튼을 클릭한다고 믿게 만들어 실제로는 숨겨진 타 사이트의 결제·권한 허용 버튼을 클릭하게 유도하는 공격과 표준 HTTP 응답 헤더 방어 수단은?",
      options: [
        "클릭재킹(Clickjacking) — CSP `frame-ancestors` 또는 `X-Frame-Options` 헤더 설정",
        "세션 하이재킹(Session Hijacking) — `Cache-Control: public` 헤더 설정",
        "HTTP Request Smuggling — `Access-Control-Allow-Origin: *` 헤더 설정",
        "Buffer Overflow — `Strict-Transport-Security` 헤더 설정",
      ],
      answer:
        "클릭재킹(Clickjacking) — CSP `frame-ancestors` 또는 `X-Frame-Options` 헤더 설정",
      explanation:
        "클릭재킹(UI Redressing)은 피해 사이트를 투명 `<iframe>` 안에 삽입해 사용자의 클릭을 가로채는 공격입니다. 서버 응답 헤더에 `Content-Security-Policy: frame-ancestors 'none'`(또는 `'self'`) 및 `X-Frame-Options: DENY`(또는 `SAMEORIGIN`)를 설정하여 비인가 사이트의 프레임 삽입을 차단해야 합니다.",
      difficulty: "EASY",
      keywords: ["Clickjacking", "X-Frame-Options", "frame-ancestors", "CSP"],
    },
    {
      id: "SEC_CMN_APP_022",
      category: "웹 애플리케이션 보안",
      question:
        "웹 응답 헤더에 개행 문자(`\\r\\n`, CRLF)가 검증 없이 포함되어 공격자가 임의의 `Set-Cookie` 헤더나 가짜 두 번째 HTTP 응답 본문을 주입할 수 있는 취약점은?",
      options: [
        "HTTP 응답 분할 (CRLF Injection)",
        "HTTP 요청 밀수 (Request Smuggling)",
        "DOM 기반 XSS (클라이언트 변조)",
        "Open Redirect (비인가 외부 이동)",
      ],
      answer: "HTTP 응답 분할 (CRLF Injection)",
      explanation:
        "HTTP 응답 분할(HTTP Response Splitting / CRLF Injection)은 사용자 입력이 `Location` 등의 응답 헤더 값에 그대로 반영될 때 `%0d%0a`(`\\r\\n`) 문자를 삽입해 헤더를 조기 종료하고 공격자가 원하는 추가 헤더나 위조 응답 본문(캐시 오염, XSS 유도)을 만들어내는 공격입니다. 헤더 반영 입력값에서 CR(`\\r`)·LF(`\\n`)를 제거·거부하고 안전한 프레임워크 API를 사용해 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["HTTP Response Splitting", "CRLF Injection", "응답 헤더"],
    },
  ],
);

const app0102 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_APP_01_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_APP_023",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "HTTP 응답의 `Set-Cookie` 헤더에 설정하는 3대 보안 속성(`HttpOnly`, `Secure`, `SameSite`)의 역할을 바르게 연결한 것은?",
      options: [
        "HttpOnly: JS 접근 차단 / Secure: HTTPS 전용 전송 / SameSite: 타 사이트 제한",
        "HttpOnly: HTTPS 전용 전송 / Secure: JS 접근 차단 / SameSite: 캐시 저장 금지",
        "HttpOnly: 타 사이트 제한 / Secure: 세션 만료 단축 / SameSite: JS 접근 차단",
        "HttpOnly: 쿠키 암호화 / Secure: 파일 업로드 제한 / SameSite: SQL 구문 분리",
      ],
      answer:
        "HttpOnly: JS 접근 차단 / Secure: HTTPS 전용 전송 / SameSite: 타 사이트 제한",
      explanation:
        "`HttpOnly`는 자바스크립트(`document.cookie`)의 쿠키 접근을 차단해 XSS 발생 시 세션 탈취 피해를 완화하고, `Secure`는 평문 HTTP 구간에서의 쿠키 스니핑을 방지하며, `SameSite`(`Strict`/`Lax`)는 크로스 사이트 요청 시 쿠키 자동 첨부를 제한해 CSRF를 완화합니다.",
      difficulty: "EASY",
      keywords: ["HttpOnly", "Secure", "SameSite", "쿠키 보안"],
    },
    {
      id: "SEC_CMN_APP_024",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "공격자가 미리 발급받은 세션 ID(`JSESSIONID=ATTACKER123`)를 링크 파라미터나 스크립트로 피해자에게 주입한 뒤, 피해자가 해당 세션 ID로 로그인을 완료하면 공격자도 인증된 피해자의 세션을 그대로 가로채는 공격과 근본적인 예방 대책은?",
      options: [
        "세션 고정(Session Fixation) — 로그인·권한 상승 시 새 세션 ID 재발급",
        "세션 예측(Session Prediction) — 쿠키 만료 시간(Max-Age)만 단축",
        "세션 하이재킹(MITM) — 웹 서버의 디렉터리 리스팅 기능 비활성화",
        "크로스 사이트 요청 위조 — 로그인 폼 HTML 주석 및 서버 배너 제거",
      ],
      answer:
        "세션 고정(Session Fixation) — 로그인·권한 상승 시 새 세션 ID 재발급",
      explanation:
        "세션 고정 공격은 로그인 전후로 세션 ID가 바뀌지 않는 취약점을 악용합니다. 근본 대책은 인증(로그인) 성공 및 권한 상승 직후 기존 세션을 즉시 무효화하고 예측 불가능한 새로운 난수 세션 ID를 재발급하며, URL 파라미터(`?JSESSIONID=...`)를 통한 세션 ID 수용을 금지하는 것입니다.",
      difficulty: "EASY",
      keywords: ["세션 고정", "Session Fixation", "세션 ID 재발급"],
    },
    {
      id: "SEC_CMN_APP_025",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 애플리케이션에서 쿠키 `SameSite` 속성의 3가지 값(`Strict`, `Lax`, `None`)의 동작 차이를 바르게 설명한 것은?",
      options: [
        "`Strict`: 크로스 사이트 전송 제한 / `Lax`: 안전한 최상위 탐색(예: GET) 허용 / `None`: `Secure` 필수",
        "`Strict`: 안전한 최상위 탐색 허용 / `Lax`: 크로스 사이트 POST만 허용 / `None`: 평문 HTTP도 전송",
        "`Strict`: 서버 DB에만 세션 저장 / `Lax`: 모든 외부 링크 쿠키 차단 / `None`: `HttpOnly`만 필수",
        "`Strict`: 크로스 사이트 전부 허용 / `Lax`: 서브요청 이미지도 전송 / `None`: 동일 사이트만 전송",
      ],
      answer:
        "`Strict`: 크로스 사이트 전송 제한 / `Lax`: 안전한 최상위 탐색(예: GET) 허용 / `None`: `Secure` 필수",
      explanation:
        "`SameSite=Strict`는 크로스 사이트 문서 맥락에서 시작된 최상위 탐색을 포함해 크로스 사이트 요청에서의 쿠키 전송을 제한(동일 사이트 요청에만 전송)합니다. `SameSite=Lax`(현대 브라우저 기본값)는 크로스 사이트 요청 중 안전한 HTTP 메서드(Safe method: GET·HEAD 등, 대표 예시 GET)를 사용하는 최상위 탐색에 한해 예외적으로 쿠키를 전송해 편의성과 CSRF 방어를 절충합니다. `SameSite=None`은 크로스 사이트 요청에도 쿠키 전송을 허용하되 반드시 `Secure` 속성(HTTPS)을 함께 지정해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["SameSite", "Strict", "Lax", "None", "CSRF 방어"],
    },
    {
      id: "SEC_CMN_APP_026",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "게시판 첨부파일 업로드 기능에서 공격자가 `.jsp`, `.php`, `.aspx` 같은 서버 측 실행 스크립트(웹셸, Web Shell)를 업로드하여 원격 명령을 실행하는 '악성 파일 업로드 취약점'을 방어하기 위한 다층 보안 대책으로 적절하지 않은 것은?",
      options: [
        "클라이언트 JavaScript에서만 확장자를 검사하고, 업로드 파일을 웹 루트(`/var/www/html/upload`)에 원래 파일명 그대로 실행 권한을 유지해 저장한다.",
        "서버 측에서 허용할 안전 확장자 화이트리스트 검증과 파일 시그니처(Magic Number) 검증을 함께 수행한다.",
        "업로드된 파일은 웹 루트 외부 디렉터리에 저장하고, 파일명을 예측 불가능한 난수(UUID 등)로 치환하며 해당 디렉터리의 스크립트 실행 권한을 제거한다.",
        "파일 다운로드 시 직접 URL 접근 대신 다운로드 전용 핸들러를 거쳐 `Content-Disposition: attachment`와 `X-Content-Type-Options: nosniff`를 적용한다.",
      ],
      answer:
        "클라이언트 JavaScript에서만 확장자를 검사하고, 업로드 파일을 웹 루트(`/var/www/html/upload`)에 원래 파일명 그대로 실행 권한을 유지해 저장한다.",
      explanation:
        "웹셸 업로드 공격을 막으려면 ① 서버 측 화이트리스트 확장자·MIME/매직바이트 검증, ② 웹 루트 외부 경로 저장, ③ 난수 파일명 치환(경로 예측·실행 차단), ④ 업로드 디렉터리 실행 권한 제거(스크립트 핸들러 비활성화)를 다층으로 적용해야 합니다. 클라이언트 JS 검증과 단순 블랙리스트(`.php`만 차단 시 `.phtml`, `.php5` 우회)는 쉽게 뚫립니다.",
      difficulty: "EASY",
      keywords: ["파일 업로드 취약점", "웹셸", "화이트리스트", "웹 루트 외부"],
    },
    {
      id: "SEC_CMN_APP_027",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "파일 다운로드 기능(`/download?file=notice.pdf`)에서 공격자가 파라미터에 `../../../../etc/passwd` 또는 URL 인코딩된 `%2e%2e%2f` 문자열을 입력하여 의도된 디렉터리 외부의 시스템 중요 파일을 열람하는 취약점과 가장 안전한 예방 대책은?",
      options: [
        "경로 조작(Path Traversal) — DB ID 매핑·정규화 경로 기준 검증",
        "세션 고정(Session Fixation) — 세션 만료 시간(Timeout) 단축",
        "임의 파일 업로드(Web Shell) — 업로드 파일명 클라이언트 치환",
        "CSRF(요청 위조) — 파일 다운로드 요청 시 Referer 헤더만 확인",
      ],
      answer:
        "경로 조작(Path Traversal) — DB ID 매핑·정규화 경로 기준 검증",
      explanation:
        "경로 조작(Path Traversal / Directory Traversal)은 `../`, `..\\` 같은 상위 디렉터리 이동 문자를 이용해 시스템 설정·소스 코드를 유출하는 공격입니다. 단순히 `../`를 한 번만 치환하면 `....//`나 이중 인코딩으로 우회되므로, 파일 경로 대신 DB 식별자(ID) 매핑을 쓰거나 정규화 경로(`realpath`/`getCanonicalPath`)가 허용 기준 디렉터리 내부인지 검증해야 합니다.",
      difficulty: "EASY",
      keywords: ["Path Traversal", "경로 조작", "realpath", "파일 다운로드 취약점"],
    },
    {
      id: "SEC_CMN_APP_028",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "PHP 기반 웹 애플리케이션에서 사용자 입력 파라미터(`?page=about.php`)를 검증 없이 `include($_GET['page']);`에 전달했을 때, 서버 내부 파일을 실행하는 취약점(㉠)과 외부 원격 URL의 악성 스크립트를 불러와 실행하는 취약점(㉡)이 바르게 짝지어진 것은?",
      options: [
        "㉠ LFI (Local File Inclusion) — ㉡ RFI (Remote File Inclusion)",
        "㉠ RFI (Remote File Inclusion) — ㉡ LFI (Local File Inclusion)",
        "㉠ Path Traversal (경로 조작) — ㉡ OS Command Injection (명령 삽입)",
        "㉠ SSI Injection (서버 측 포함) — ㉡ XXE Injection (외부 엔티티)",
      ],
      answer: "㉠ LFI (Local File Inclusion) — ㉡ RFI (Remote File Inclusion)",
      explanation:
        "LFI는 서버 로컬에 존재하는 파일(로그 포이즈닝, `/etc/passwd` 등)을 포함·실행하는 취약점이고, RFI는 `allow_url_include=On` 상태에서 외부 공격자 서버 URL의 원격 스크립트를 포함·실행하는 취약점입니다. 예방을 위해 사용자 입력을 파일 포함 함수에 직접 전달하지 않고 화이트리스트 매핑을 사용하며 `allow_url_include = Off`로 설정해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["LFI", "RFI", "파일 포함 취약점", "allow_url_include"],
    },
    {
      id: "SEC_CMN_APP_029",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 서버 설정 미흡으로 인덱스 파일(`index.html` 등)이 없는 디렉터리에 접속했을 때 서버 내부 파일과 폴더 목록이 웹 브라우저에 그대로 노출되는 취약점과 Apache 웹 서버에서의 올바른 조치 방법은?",
      options: [
        "디렉터리 리스팅 — `httpd.conf`에서 `Options -Indexes` 설정",
        "불필요한 메서드 허용 — `httpd.conf`에 `Options +Indexes` 추가",
        "서버 배너 정보 노출 — `httpd.conf`에 `ServerTokens Full` 지정",
        "HTTP 응답 분할 — `httpd.conf`에서 `TraceEnable On` 활성화",
      ],
      answer: "디렉터리 리스팅 — `httpd.conf`에서 `Options -Indexes` 설정",
      explanation:
        "디렉터리 리스팅(Directory Listing/Indexing)이 활성화되어 있으면 백업 파일(`.bak`, `.sql`), 설정 파일, 숨겨진 관리자 경로가 외부에 노출됩니다. Apache에서는 `Options -Indexes`(Nginx는 `autoindex off;`)로 비활성화하고, 서버 버전 노출도 `ServerTokens Prod`, `ServerSignature Off`로 차단해야 합니다.",
      difficulty: "EASY",
      keywords: ["디렉터리 리스팅", "Directory Listing", "Options -Indexes", "Apache 보안"],
    },
    {
      id: "SEC_CMN_APP_030",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 서버 보안 점검 시 `PUT`, `DELETE`, `TRACE` 같은 불필요한 HTTP 메서드가 허용되어 있을 때 발생할 수 있는 보안 위협으로 가장 적절한 것은?",
      options: [
        "`PUT`/`DELETE`는 비인가 파일 조작, `TRACE`는 헤더 반사로 XST 위험이 크다.",
        "`PUT`은 파일 읽기 전용이며, `TRACE`는 통신 구간을 자동으로 TLS로 암호화한다.",
        "`DELETE`는 서버 세션 쿠키만 삭제하고, `HEAD` 메서드는 반드시 전면 차단해야 한다.",
        "`TRACE`는 업로드 파일의 매직 바이트를 검증하는 기능으로 항상 허용하는 것이 좋다.",
      ],
      answer:
        "`PUT`/`DELETE`는 비인가 파일 조작, `TRACE`는 헤더 반사로 XST 위험이 크다.",
      explanation:
        "웹 서버는 서비스에 필요한 메서드(`GET`, `POST`, `HEAD` 등) 외의 불필요한 메서드(`PUT`, `DELETE`, `TRACE`, `OPTIONS` 등)를 제한해야 합니다. `PUT`/`DELETE`는 웹 루트 파일 업로드·삭제에 악용될 수 있고, 특히 `TRACE`는 클라이언트 요청 헤더를 응답 본문에 그대로 반사해 크로스 사이트 트레이싱(XST) 위험을 높이므로 Apache에서 `TraceEnable Off`로 비활성화합니다.",
      difficulty: "MEDIUM",
      keywords: ["HTTP 메서드 제한", "PUT", "DELETE", "TRACE", "XST"],
    },
    {
      id: "SEC_CMN_APP_031",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "인증된 사용자 A가 자신의 주문 상세 페이지 URL(`/orders/1001`)에서 숫자만 `/orders/1002`로 변경해 요청하자, 서버가 소유자 권한을 검증하지 않고 다른 사용자 B의 주문 정보와 주소를 그대로 반환했다. 이 취약점 유형과 올바른 방어 대책은?",
      options: [
        "IDOR(부적절한 인가) — 요청마다 객체 소유자·권한 서버 검증",
        "Reflected XSS — 주문 번호 파라미터 출력 시 HTML 인코딩",
        "세션 고정(Session Fixation) — 로그인 후 세션 ID만 재발급",
        "경로 조작(Path Traversal) — 주문 번호에서 '../' 문자만 필터링",
      ],
      answer: "IDOR(부적절한 인가) — 요청마다 객체 소유자·권한 서버 검증",
      explanation:
        "IDOR(Insecure Direct Object Reference / 안전하지 않은 직접 객체 참조, OWASP Broken Access Control의 대표 유형)은 파라미터의 객체 ID만 바꿔 타인의 자원·기능에 접근하는 수평적/수직적 권한 상승 취약점입니다. 단순 ID 난독화나 UUID만으로는 불충분하며, 서버 측에서 '현재 로그인 세션 주체가 해당 객체에 접근할 권한이 있는가'를 매 요청마다 검증해야 합니다.",
      difficulty: "EASY",
      keywords: ["IDOR", "접근제어 취약점", "Broken Access Control", "권한 검증"],
    },
    {
      id: "SEC_CMN_APP_032",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 브라우저가 평문 HTTP로 접속하는 것을 방지하고, 지정된 기간 동안 무조건 HTTPS(TLS) 암호화 연결만 사용하도록 브라우저에 강제하여 SSL Strip 같은 다운그레이드 중간자 공격을 예방하는 HTTP 응답 헤더는?",
      options: [
        "Strict-Transport-Security (HSTS)",
        "Access-Control-Allow-Origin (CORS)",
        "X-Content-Type-Options (nosniff)",
        "Content-Security-Policy (CSP)",
      ],
      answer: "Strict-Transport-Security (HSTS)",
      explanation:
        "HSTS(`Strict-Transport-Security: max-age=31536000; includeSubDomains`) 헤더를 받은 브라우저는 해당 도메인에 대한 모든 HTTP 접속 시도를 내부적으로 HTTPS로 강제 변환하고 유효하지 않은 인증서 경고를 우회하지 못하게 하여 SSL Strip 공격을 차단합니다.",
      difficulty: "EASY",
      keywords: ["HSTS", "Strict-Transport-Security", "SSL Strip 방지"],
    },
    {
      id: "SEC_CMN_APP_033",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 서버 로그와 파일시스템 점검 중 `/var/www/html/upload/img_01.jsp` 파일이 최근 비인가 생성되었고, 해당 파일로 외부 IP가 `cmd=whoami`, `cmd=cat+/etc/passwd` 같은 쿼리 요청을 반복 보낸 흔적이 발견되었다. 이 침해 징후와 올바른 사고 대응 절차는?",
      options: [
        "웹셸 침해 — 격리·증거 보전·백도어 조사·취약점 패치 후 복구",
        "경로 조작 — 문제의 `img_01.jsp` 파일만 삭제하고 서버 즉시 재가동",
        "Reflected XSS — 웹 방화벽 로그를 비우고 브라우저 쿠키 만료 단축",
        "정상 크롤러 요청 — 업로드 폴더 권한만 `755`로 유지하고 경과 관찰",
      ],
      answer: "웹셸 침해 — 격리·증거 보전·백도어 조사·취약점 패치 후 복구",
      explanation:
        "업로드 디렉터리 내 스크립트 파일(`.jsp`, `.php`, `.aspx`) 생성과 `cmd=` 파라미터를 통한 시스템 명령 실행은 전형적인 웹셸(Web Shell) 침해 징후입니다. 단순히 웹셸 파일 1개만 지우면 공격자가 심어 둔 추가 백도어나 취약한 업로드 경로로 재침입하므로, 증거 보전 → 네트워크 격리 → 침입 경로·측면 이동·계정 변조 조사 → 업로드 취약점 제거 → 클린 복구 절차를 밟아야 합니다.",
      difficulty: "EASY",
      keywords: ["웹셸", "Web Shell", "침해 징후", "사고 대응"],
    },
    {
      id: "SEC_CMN_APP_034",
      category: "웹 쿠키·세션 및 파일 보안",
      question:
        "웹 애플리케이션이 로그인 후 사용자 세션을 관리할 때, 유휴 시간(Idle Timeout) 제한과 절대 만료 시간(Absolute Timeout) 제한, 그리고 로그아웃 시 서버 측 세션 무효화(`session.invalidate()`)를 함께 적용해야 하는 이유는?",
      options: [
        "공용 PC 방치나 토큰 탈취 시 세션 재사용 공격 창을 최소화한다.",
        "세션 쿠키에 HttpOnly와 Secure 속성을 자동으로 대체 적용한다.",
        "크로스 사이트 요청 위조(CSRF) 공격의 토큰 검증 절차를 생략한다.",
        "사용자의 브라우저 캐시에서 HTML 페이지 저장 공간을 절약한다.",
      ],
      answer: "공용 PC 방치나 토큰 탈취 시 세션 재사용 공격 창을 최소화한다.",
      explanation:
        "로그아웃 시 클라이언트 쿠키만 지우고 서버 세션 저장소를 무효화하지 않으면 탈취된 세션 ID로 계속 인증 상태를 유지할 수 있습니다. 따라서 로그아웃 시 서버 세션을 즉시 파기(`invalidate`)하고, 일정 시간 미사용 시 자동 만료(Idle Timeout) 및 최대 수명(Absolute Timeout)을 설정해 노출 창(Window of Exposure)을 줄여야 합니다.",
      difficulty: "EASY",
      keywords: ["세션 관리", "세션 타임아웃", "session.invalidate"],
    },
  ],
);

const app0201 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_APP_02_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_APP_035",
      category: "인터넷 응용 서비스 보안",
      question:
        "전자우편 발신자 인증 및 스푸핑 방지 기술 3총사인 SPF, DKIM, DMARC의 역할을 바르게 연결한 것은?",
      options: [
        "SPF: 허용 IP 목록 / DKIM: 메일 전자서명 / DMARC: 실패 정책·보고",
        "SPF: 메일 전자서명 / DKIM: 허용 IP 목록 / DMARC: 본문 암호화",
        "SPF: 허용 IP 목록 / DKIM: 본문 암호화 / DMARC: 첨부파일 악성검사",
        "SPF: 실패 정책·보고 / DKIM: 허용 IP 목록 / DMARC: 메일 전자서명",
      ],
      answer:
        "SPF: 허용 IP 목록 / DKIM: 메일 전자서명 / DMARC: 실패 정책·보고",
      explanation:
        "SPF는 DNS TXT 레코드에 등록된 발송 허용 메일 서버 IP 검증, DKIM은 발신 서버 개인키 기반 디지털 서명으로 메일 무결성·출처 검증, DMARC는 SPF·DKIM 결과와 `From` 헤더 도메인 정렬(Alignment)을 종합해 실패 시 수신 측 처리 정책(`p=none/quarantine/reject`)과 보고서 수신 주소를 지정합니다.",
      difficulty: "EASY",
      keywords: ["SPF", "DKIM", "DMARC", "메일 보안"],
    },
    {
      id: "SEC_CMN_APP_036",
      category: "인터넷 응용 서비스 보안",
      question:
        "전자우편 종단간 보안 프로토콜인 PGP(Pretty Good Privacy)와 S/MIME(Secure/Multipurpose Internet Mail Extensions)의 신뢰 모델 차이를 바르게 설명한 것은?",
      options: [
        "PGP는 분산형 Web of Trust를, S/MIME은 계층형 PKI(CA X.509)를 쓴다.",
        "PGP는 계층형 PKI(CA X.509)를, S/MIME은 분산형 Web of Trust를 쓴다.",
        "PGP는 기밀성만 지원하며, S/MIME은 송신자 전자서명만 단독으로 지원한다.",
        "PGP·S/MIME 모두 공개키 기반 세션키 교환 없이 사전 공유 대칭키만 사용한다.",
      ],
      answer:
        "PGP는 분산형 Web of Trust를, S/MIME은 계층형 PKI(CA X.509)를 쓴다.",
      explanation:
        "PGP와 S/MIME 모두 하이브리드 암호화(세션 대칭키로 본문 암호화 + 수신자 공개키로 세션키 암호화)와 전자서명을 통해 기밀성·무결성·인증·부인방지를 제공합니다. 가장 큰 구조적 차이는 공개키 신뢰 모델로, PGP는 사용자 간 상호 서명하는 분산형 Web of Trust, S/MIME은 인증기관(CA) 기반 계층형 PKI(X.509)입니다.",
      difficulty: "EASY",
      keywords: ["PGP", "S/MIME", "Web of Trust", "PKI", "메일 보안"],
    },
    {
      id: "SEC_CMN_APP_037",
      category: "인터넷 응용 서비스 보안",
      question:
        "SMTP 메일 서버 보안 점검 중 외부의 비인가 발신자가 사내 메일 서버를 경유해 임의의 제3자 도메인으로 대량 스팸 메일을 발송할 수 있는 취약점(㉠)과, 발신자 주소 존재 여부를 외부에서 악용·수집하는 데 쓰이는 위험 SMTP 명령어 2가지(㉡)가 바르게 짝지어진 것은?",
      options: [
        "㉠ 오픈 릴레이(Open Relay) — ㉡ VRFY, EXPN",
        "㉠ 오픈 리커시브(Open Recursive) — ㉡ AXFR, IXFR",
        "㉠ 익명 FTP(Anonymous FTP) — ㉡ PORT, PASV",
        "㉠ 세션 고정(Session Fixation) — ㉡ GET, HEAD",
      ],
      answer: "㉠ 오픈 릴레이(Open Relay) — ㉡ VRFY, EXPN",
      explanation:
        "메일 서버가 인증 없이 외부→외부 메일 중계를 허용하면 스팸 경유지(Open Relay)로 악용되어 도메인 평판(RBL 블랙리스트)이 훼손됩니다. 또한 SMTP의 `VRFY`(특정 사용자 계정 존재 확인)와 `EXPN`(메일링 리스트 구성원 목록 노출) 명령은 계정 정보 수집에 악용되므로 비활성화(`goaway` 또는 `novrfy, noexpn`)해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["Open Relay", "SMTP", "VRFY", "EXPN", "메일 서버 보안"],
    },
    {
      id: "SEC_CMN_APP_038",
      category: "인터넷 응용 서비스 보안",
      question:
        "DNS 공격 중 공격자가 취약한 DNS 리졸버에 존재하지 않는 임의의 하위 도메인 질의를 대량 전송하면서 위조된 응답 패킷(트랜잭션 ID·포트 추측)을 먼저 도착시켜, 해당 도메인 전체의 권한 네임서버(NS) 정보를 공격자 서버로 오염시키는 공격 기법은?",
      options: [
        "카민스키 공격 (DNS 캐시 포이즈닝)",
        "DNS 증폭 공격 (DRDoS 반사 증폭)",
        "DNS 영역 전송 (AXFR 자산 목록 탈취)",
        "DNS 터널링 (TXT 레코드 은닉 채널)",
      ],
      answer: "카민스키 공격 (DNS 캐시 포이즈닝)",
      explanation:
        "카민스키(Kaminsky) 공격은 캐시 TTL이 만료될 때까지 기다리지 않고 `random1.example.com` 등 무작위 서브도메인을 연속 질의해 매번 재귀 질의를 유발하고, 위조 응답의 Authority/Additional 섹션으로 도메인 전체의 NS 레코드를 오염시키는 고도화된 DNS 캐시 포이즈닝입니다. 출발지 포트 무작위화(Source Port Randomization)와 DNSSEC 적용으로 방어합니다.",
      difficulty: "MEDIUM",
      keywords: ["Kaminsky Attack", "DNS 캐시 포이즈닝", "DNSSEC", "Source Port Randomization"],
    },
    {
      id: "SEC_CMN_APP_039",
      category: "인터넷 응용 서비스 보안",
      question:
        "DNSSEC(Domain Name System Security Extensions)이 제공하는 보안 기능과 제공하지 않는(별도 프로토콜이 필요한) 기능을 바르게 구분한 것은?",
      options: [
        "전자서명으로 출처 인증·무결성은 보장하나 질의 기밀성(암호화)은 없다.",
        "질의·응답 본문을 AES로 암호화해 기밀성은 보장하나 무결성 서명은 없다.",
        "재귀 질의를 차단해 DNS 반사 증폭 DDoS 트래픽 자체를 네트워크에서 막는다.",
        "DNS 서버와 클라이언트 간 TLS 1.3 터널을 열어 DoH와 동일한 기능을 수행한다.",
      ],
      answer:
        "전자서명으로 출처 인증·무결성은 보장하나 질의 기밀성(암호화)은 없다.",
      explanation:
        "DNSSEC은 DNS 레코드에 공개키 디지털 서명(RRSIG·DNSKEY·DS)을 첨부해 루트부터 검증함으로써 DNS 스푸핑·캐시 포이즈닝을 막아주는 '인증·무결성' 확장입니다. DNS 질의 내용의 도청 방지(기밀성)는 DoT(DNS over TLS)나 DoH(DNS over HTTPS)가 담당합니다.",
      difficulty: "MEDIUM",
      keywords: ["DNSSEC", "RRSIG", "무결성", "DoH", "DoT"],
    },
    {
      id: "SEC_CMN_APP_040",
      category: "인터넷 응용 서비스 보안",
      question:
        "DNS 서버(BIND 등)에서 비인가 외부 호스트가 `dig @ns.example.com example.com AXFR` 명령으로 조직의 전체 호스트명·내부 IP 목록(Zone 파일)을 한 번에 탈취하는 것을 방지하기 위한 설정 항목은?",
      options: [
        "`allow-transfer`에 인가된 보조 네임서버 IP만 허용한다.",
        "`allow-recursion`에 외부 전체(`any`)의 재귀 질의를 허용한다.",
        "`allow-transfer`를 `{ any; };`로 두고 UDP 53 포트만 열어둔다.",
        "`recursion yes;`를 활성화해 모든 외부 도메인 응답을 캐시한다.",
      ],
      answer: "`allow-transfer`에 인가된 보조 네임서버 IP만 허용한다.",
      explanation:
        "DNS 영역 전송(Zone Transfer, TCP 53, AXFR/IXFR)은 원래 주(Primary) 네임서버와 보조(Secondary) 네임서버 간 동기화 기능이지만, 제한하지 않으면 외부 공격자가 내부 네트워크 자산 목록 전체를 정찰할 수 있습니다. `allow-transfer { 보조서버IP; };` 설정과 TSIG 키 인증으로 인가된 서버만 허용해야 합니다.",
      difficulty: "EASY",
      keywords: ["DNS Zone Transfer", "AXFR", "allow-transfer", "BIND 보안"],
    },
    {
      id: "SEC_CMN_APP_041",
      category: "인터넷 응용 서비스 보안",
      question:
        "파일 전송 보안 프로토콜인 SFTP(SSH File Transfer Protocol)와 FTPS(FTP over SSL/TLS)의 동작 기반과 방화벽 운용 차이를 바르게 비교한 것은?",
      options: [
        "SFTP는 SSH 단일 22번 포트, FTPS는 TLS 적용 및 제어·데이터 포트 분리다.",
        "SFTP는 FTP에 TLS를 적용한 방식이고, FTPS는 SSH 단일 22번 포트만 쓴다.",
        "SFTP는 제어 채널만 암호화하고, FTPS는 제어·데이터 채널을 평문 전송한다.",
        "FTPS는 단일 22번 포트를 써서 NAT·방화벽 통과 정책 구성이 훨씬 단순하다.",
      ],
      answer:
        "SFTP는 SSH 단일 22번 포트, FTPS는 TLS 적용 및 제어·데이터 포트 분리다.",
      explanation:
        "SFTP(SSH 기반, 단일 TCP 22 포트)는 기존 FTP와 전혀 다른 프로토콜로 NAT·방화벽 통과가 매우 간편하며 제어와 데이터 모두 SSH 터널로 암호화됩니다. FTPS는 FTP에 SSL/TLS(Explicit 21 또는 Implicit 990)를 얹은 방식이라 별도 데이터 채널용 추가 포트 범위 관리가 필요합니다.",
      difficulty: "EASY",
      keywords: ["SFTP", "FTPS", "SSH", "TLS", "파일전송 보안"],
    },
    {
      id: "SEC_CMN_APP_042",
      category: "인터넷 응용 서비스 보안",
      question:
        "FTP 능동 모드(Active Mode)의 `PORT` 명령을 악용하여, 공격자가 FTP 서버로 하여금 제3의 내부 대상 호스트의 임의 포트로 연결을 시도하게 만들어 포트 스캐닝이나 방화벽 우회에 이용하는 공격 기법은?",
      options: [
        "FTP 바운스 공격 (FTP Bounce)",
        "FTP 익명 쓰기 악용 (Anonymous)",
        "DNS 영역 전송 정찰 (Zone Transfer)",
        "TFTP 경로 조작 (Path Traversal)",
      ],
      answer: "FTP 바운스 공격 (FTP Bounce)",
      explanation:
        "FTP 바운스 공격은 `PORT` 명령의 IP·포트 인자에 클라이언트 자신이 아닌 제3의 피해자 IP·포트를 지정해 FTP 서버가 대신 접속하게 만드는 기법입니다. 예방을 위해 FTP 서버에서 `PORT` 명령의 IP가 제어 연결 클라이언트 IP와 일치하는지 검증하고, 불필요한 능동 모드·익명 FTP를 제한하며 SFTP로 전환하는 것이 권장됩니다.",
      difficulty: "MEDIUM",
      keywords: ["FTP Bounce Attack", "PORT 명령", "Active Mode", "FTP 보안"],
    },
    {
      id: "SEC_CMN_APP_043",
      category: "인터넷 응용 서비스 보안",
      question:
        "기존 평문 FTP 서비스의 보안 강화를 위해 서버 설정(vsftpd 등)에서 점검해야 할 핵심 보안 항목으로 적절하지 않은 것은?",
      options: [
        "`anonymous_enable=YES`로 설정해 누구나 계정 없이 시스템 루트 디렉터리에 쓰기 가능하도록 개방한다.",
        "불필요한 익명 FTP 접속을 차단(`anonymous_enable=NO`)하고, 일반 사용자의 상위 디렉터리 이탈을 막기 위해 chroot 격리(`chroot_local_user=YES`)를 적용한다.",
        "`/etc/ftpusers` 또는 `userlist`를 활용해 `root` 등 시스템 관리 계정의 직접 FTP 접속을 차단한다.",
        "가능하면 평문 FTP 대신 SFTP 또는 FTPS 같은 암호화 파일전송 프로토콜로 전환한다.",
      ],
      answer:
        "`anonymous_enable=YES`로 설정해 누구나 계정 없이 시스템 루트 디렉터리에 쓰기 가능하도록 개방한다.",
      explanation:
        "익명 FTP(특히 쓰기 허용)가 열려 있으면 악성코드 유포지·저장소 남용·내부 정보 유출 통로가 됩니다. 불필요한 FTP는 중지하거나 SFTP로 대체하고, 불가피하게 운영할 경우 익명 차단, root 접속 제한, chroot 홈 디렉터리 격리, 배너 정보 숨김을 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["FTP 보안", "anonymous_enable", "chroot", "ftpusers"],
    },
    {
      id: "SEC_CMN_APP_044",
      category: "인터넷 응용 서비스 보안",
      question:
        "FTP의 능동 모드(Active Mode)와 수동 모드(Passive Mode)에서 데이터 채널(Data Connection) 연결을 누가 먼저 시도하는지 바르게 비교한 것은?",
      options: [
        "능동은 서버(20번)가 클라이언트로, 수동은 클라이언트가 서버 고번 포트로 연결한다.",
        "능동은 클라이언트가 서버 20번으로, 수동은 서버가 클라이언트 21번으로 연결한다.",
        "능동은 클라이언트가 서버 고번 포트로, 수동은 서버가 20번 포트로 역접속한다.",
        "능동·수동 모드 모두 단일 21번 포트로 제어와 데이터를 함께 주고받아 역접속이 없다.",
      ],
      answer:
        "능동은 서버(20번)가 클라이언트로, 수동은 클라이언트가 서버 고번 포트로 연결한다.",
      explanation:
        "Active 모드에서는 서버(TCP 20)가 클라이언트 측 임의 포트로 역방향 접속을 시도하므로 클라이언트 앞단 방화벽·NAT에 막히기 쉽습니다. Passive 모드에서는 클라이언트가 `PASV` 명령으로 서버가 열어둔 고번대 비특권 포트에 정방향 연결을 맺어 클라이언트 방화벽 통과가 수월합니다.",
      difficulty: "MEDIUM",
      keywords: ["FTP Active Mode", "FTP Passive Mode", "TCP 20", "TCP 21"],
    },
    {
      id: "SEC_CMN_APP_045",
      category: "인터넷 응용 서비스 보안",
      question:
        "이메일 클라이언트와 메일 서버 간 메일 송수신 시 전송 구간 암호화를 적용하는 표준 보안 포트(Implicit TLS 기준)가 바르게 짝지어진 것은?",
      options: [
        "SMTPS(465), IMAPS(993), POP3S(995)",
        "SMTP(25), IMAP(143), POP3(110)",
        "HTTP(80), Telnet(23), FTP(21)",
        "DNS(53), SNMP(161), NTP(123)",
      ],
      answer: "SMTPS(465), IMAPS(993), POP3S(995)",
      explanation:
        "평문 메일 프로토콜은 SMTP(25/587), POP3(110), IMAP(143)이며, TLS 암호화가 적용된 보안 포트는 SMTPS(465, 또는 587 STARTTLS), IMAPS(993), POP3S(995)입니다. 평문 포트는 비밀번호와 메일 내용이 스니핑되므로 TLS 적용이 필수입니다.",
      difficulty: "EASY",
      keywords: ["SMTPS", "IMAPS", "POP3S", "메일 보안 포트"],
    },
    {
      id: "SEC_CMN_APP_046",
      category: "인터넷 응용 서비스 보안",
      question:
        "DNS 서버 보안 점검 중 외부 인터넷의 임의 클라이언트가 보낸 재귀 질의(Recursive Query)를 모두 처리해 주는 '오픈 리졸버(Open Resolver)' 상태가 확인되었다. 이로 인해 발생할 수 있는 대표적 보안 사고와 조치 방안은?",
      options: [
        "DNS 반사·증폭 DDoS 경유지 악용 — `recursion no;` 또는 허용 IP 제한",
        "비인가 DNS 영역 전체 탈취(AXFR) — `recursion yes;`로 재귀 질의 전환",
        "내부 이메일 스팸 중계(Open Relay) — SMTP `VRFY`·`EXPN` 명령어만 차단",
        "SSL Strip 다운그레이드 위험 — HTTP 응답 헤더에 HSTS `max-age` 설정",
      ],
      answer:
        "DNS 반사·증폭 DDoS 경유지 악용 — `recursion no;` 또는 허용 IP 제한",
      explanation:
        "오픈 리졸버는 외부의 위조 출발지 IP 요청에도 큰 DNS 응답을 반사해 DNS Amplification DDoS의 가해 경유지가 되고 캐시 포이즈닝 위험도 높입니다. 따라서 외부 공개용 권한 네임서버(Authoritative DNS)와 내부용 재귀 리졸버를 분리하고, 권한 서버에는 `recursion no;`, 내부 리졸버는 `allow-recursion` 제한을 적용해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["Open Resolver", "DNS 재귀 질의", "allow-recursion", "DNS 증폭 공격"],
    },
  ],
);

const app0202 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_APP_02_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_APP_047",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "데이터베이스 보안 위협 중 '집계(Aggregation)'와 '추론(Inference)'을 바르게 구분한 설명은?",
      options: [
        "집계는 저등급 다량 결합으로 고등급 정보 획득, 추론은 통계 조합으로 비공개 값 역산이다.",
        "집계는 통계 조합으로 비공개 값 역산, 추론은 저등급 다량 결합으로 고등급 정보 획득이다.",
        "집계는 동일 키에 등급별 값을 공존시키는 방어 기법, 추론은 뷰(View) 분리 통제 기법이다.",
        "집계·추론 모두 디스크 TDE 암호화만 적용하면 인가된 통계 사용자의 조회까지 차단된다.",
      ],
      answer:
        "집계는 저등급 다량 결합으로 고등급 정보 획득, 추론은 통계 조합으로 비공개 값 역산이다.",
      explanation:
        "집계(Aggregation) 예: 개별 매장 1곳의 매출은 대외비지만 전 지점 매출을 모으면 기업 전체 실적(비밀)이 되는 경우. 추론(Inference) 예: 부서 총급여와 인원수 통계를 전후 비교해 신규 입사자 1인의 비공개 급여를 역산하는 경우. 대응책으로는 질의 집합 크기 제한(최소 레코드 수 미만 응답 거부), 노이즈 추가(Perturbation), 뷰(View) 분리, 질의 이력 감사(Tracker 탐지)가 활용됩니다.",
      difficulty: "EASY",
      keywords: ["집계", "Aggregation", "추론", "Inference", "데이터베이스 보안"],
    },
    {
      id: "SEC_CMN_APP_048",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "데이터베이스의 통계적 추론(Inference) 공격을 완화하기 위한 기술적 통제 방법으로 적절하지 않은 것은?",
      options: [
        "일반 통계 사용자에게도 원본 테이블 `SELECT *` 전체 조회를 허용한다.",
        "질의 집합 크기 제어: 결과 레코드 수가 최소 임계 미만이면 응답을 거부한다.",
        "데이터 교란(Perturbation): 통계 경향은 유지하되 개별 값에 미세 오차를 둔다.",
        "질의 중첩 제어: 겹치는 조건을 반복 질의해 차집합을 구하는 시도를 탐지·차단한다.",
      ],
      answer:
        "일반 통계 사용자에게도 원본 테이블 `SELECT *` 전체 조회를 허용한다.",
      explanation:
        "통계 DB 추론 방어 기법에는 셀 억제(Cell Suppression), 최소 질의 집합 크기 제한, 질의 중첩 제한, 데이터 교란(Perturbation/차분 프라이버시), 다중 인스턴스화(Polyinstantiation), 뷰(View) 기반 최소 권한 접근제어가 있습니다. 일반 통계 사용자에게 원본 전체 조회를 허용하면 추론을 막을 수 없습니다.",
      difficulty: "MEDIUM",
      keywords: ["추론 대응", "Perturbation", "질의 집합 크기 제어", "View"],
    },
    {
      id: "SEC_CMN_APP_049",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "데이터베이스 암호화 구현 방식 중 'API 방식(애플리케이션 레벨)', 'Plug-in 방식(DBMS 내부 모듈)', 'TDE(Transparent Data Encryption, 파일/테이블스페이스 레벨)'의 특징을 바르게 비교한 것은?",
      options: [
        "API는 앱 단 처리로 DB 부하가 적으나 소스 수정 필요, Plug-in/TDE는 수정이 적다.",
        "TDE는 애플리케이션 소스를 전면 수정해야 하나, API 방식은 소스 수정이 전혀 없다.",
        "API 방식은 디스크 저장 시에만 암호화하므로 DBMS·메모리 구간의 기밀성이 없다.",
        "Plug-in 방식은 DB 엔진 외부에서 암·복호화하므로 DBMS 서버 CPU 부하가 0이다.",
      ],
      answer:
        "API는 앱 단 처리로 DB 부하가 적으나 소스 수정 필요, Plug-in/TDE는 수정이 적다.",
      explanation:
        "① API 방식: 애플리케이션 서버 단 암복호화로 DB CPU 부하 분산 및 통신 구간 보호가 가능하나 소스 수정 필요, ② Plug-in 방식: DB 엔진 내 암복호화 모듈·뷰/트리거 활용, 앱 수정 최소화, DB 부하 증가, ③ TDE(투명 암호화): 앱 수정 거의 없고 디스크·백업 파일 탈취 방어에 강하지만 메모리 평문 노출과 인가 세션 접근통제를 별도로 관리해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["DB 암호화", "API 방식", "Plug-in 방식", "TDE"],
    },
    {
      id: "SEC_CMN_APP_050",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "다중 등급 보안(MLS) 데이터베이스에서 서로 다른 보안 등급의 사용자가 동일한 기본키(Primary Key)를 가진 튜플을 각자의 등급에 맞는 값으로 독립 저장함으로써, 하위 등급 사용자가 상위 등급 레코드의 존재 자체를 추론하지 못하게 막는 기법은?",
      options: [
        "다중 인스턴스화 (Polyinstantiation)",
        "질의 집합 크기 제어 (Query Set Control)",
        "데이터 교란 (Noise Perturbation)",
        "뷰 기반 접근 통제 (View Separation)",
      ],
      answer: "다중 인스턴스화 (Polyinstantiation)",
      explanation:
        "다중 인스턴스화(Polyinstantiation)는 동일한 키 값에 대해 보안 등급별로 별도 레코드(인스턴스)를 공존시켜, 하위 등급 사용자가 같은 키로 삽입을 시도할 때 '기본키 중복 오류'를 통해 상위 기밀 데이터의 존재를 알아채는 추론 채널(Covert Channel)을 차단하는 기법입니다.",
      difficulty: "HARD",
      keywords: ["Polyinstantiation", "다중 인스턴스화", "MLS DB", "추론 방지"],
    },
    {
      id: "SEC_CMN_APP_051",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "시큐어 코딩(Secure Coding)에서 사용자 비밀번호를 데이터베이스에 저장할 때 가장 안전한 처리 방식으로 올바른 것은?",
      options: [
        "고유 난수 솔트(Salt)와 키 스트레칭을 적용한 단방향 해시(Argon2id·bcrypt)",
        "고정 솔트(Salt)를 결합한 단일 라운드 SHA-256 해시로 빠르게 계산해 저장",
        "AES-128 CBC 양방향 암호화 후 복호화 키를 DB 내 별도 환경 테이블에 저장",
        "사용자 이메일과 비밀번호를 연접해 Base64 인코딩 후 평문과 분리 보관",
      ],
      answer:
        "고유 난수 솔트(Salt)와 키 스트레칭을 적용한 단방향 해시(Argon2id·bcrypt)",
      explanation:
        "비밀번호는 복호화가 불가능한 단방향 해시로 저장해야 하며, 레인보우 테이블(미리 계산된 해시표) 공격을 막기 위해 사용자별 고유 난수 Salt를 추가하고, GPU 무차별 대입 속도를 늦추기 위해 반복 연산·메모리 하드 특성을 가진 Argon2id·bcrypt·scrypt·PBKDF2(키 스트레칭)를 사용해야 합니다.",
      difficulty: "EASY",
      keywords: ["시큐어 코딩", "Salt", "키 스트레칭", "bcrypt", "Argon2id"],
    },
    {
      id: "SEC_CMN_APP_052",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "개발 보안 도구 중 SAST(정적 애플리케이션 보안 테스트)와 DAST(동적 애플리케이션 보안 테스트)를 바르게 비교한 것은?",
      options: [
        "SAST는 미실행 소스(화이트박스) 정밀 분석, DAST는 실행 앱 요청(블랙박스) 탐지다.",
        "SAST는 실행 중인 앱에 공격 요청(블랙박스)을, DAST는 미실행 소스를 분석한다.",
        "SAST는 런타임 환경 설정 오류에 특화되고, DAST는 반드시 전체 소스 코드가 필요하다.",
        "SAST는 오탐이 전혀 없어 검증이 불필요하고, DAST는 정확한 취약 소스 라인을 지목한다.",
      ],
      answer:
        "SAST는 미실행 소스(화이트박스) 정밀 분석, DAST는 실행 앱 요청(블랙박스) 탐지다.",
      explanation:
        "SAST(정적 분석, 화이트박스)는 개발 초기에 소스·바이트코드를 실행하지 않고 취약 코드의 정확한 파일·라인을 식별하지만 언어 의존적이고 오탐이 생길 수 있습니다. DAST(동적 분석, 블랙박스)는 실행 중인 웹 앱에 실제 요청을 보내 런타임·서버 설정·인증 흐름 취약점을 검증하지만 소스 코드 정확한 위치 파악이 어렵습니다.",
      difficulty: "EASY",
      keywords: ["SAST", "DAST", "정적 분석", "동적 분석", "개발 보안 도구"],
    },
    {
      id: "SEC_CMN_APP_053",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "시큐어 코딩 주요 취약점 중 '오류 메시지를 통한 정보 노출(Improper Error Handling)'을 예방하기 위한 올바른 구현 원칙은?",
      options: [
        "사용자에겐 일반 안내만 보여주고 상세 오류는 서버 내부 로그에만 남긴다.",
        "모든 `catch` 블록을 비워 사용자 화면과 서버 로그 모두 오류 기록을 생략한다.",
        "예외 발생 시 스택 트레이스와 SQL 구문을 화면에 띄워 빠른 장애 조치를 돕는다.",
        "HTTP 500 오류 응답 헤더에만 예외 클래스명과 DB 서버 버전 정보를 담아 보낸다.",
      ],
      answer:
        "사용자에겐 일반 안내만 보여주고 상세 오류는 서버 내부 로그에만 남긴다.",
      explanation:
        "상세 에러 메시지(스택 트레이스, DBMS 종류·테이블 구조, 내부 파일 경로)가 사용자 화면·응답 헤더에 노출되면 Error-based SQL Injection과 시스템 정찰에 악용됩니다. 반대로 `catch` 블록을 완전히 비워 오류를 무시하면 보안 이상 징후를 추적할 수 없으므로 접근 통제된 서버 내부 로그에는 기록하되 외부 응답은 추상화해야 합니다.",
      difficulty: "EASY",
      keywords: ["시큐어 코딩", "오류 메시지 정보 노출", "스택 트레이스"],
    },
    {
      id: "SEC_CMN_APP_054",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "소프트웨어 개발 생명주기(SDLC) 전반에 보안을 내재화하는 '시큐어 SDLC(예: Microsoft SDL, CLASP, Seven Touchpoints)'의 핵심 이점으로 가장 적절한 것은?",
      options: [
        "분석·설계부터 보안을 내재화해 운영 후 수정 대비 결함 비용·위험을 줄인다.",
        "개발 완료 후 운영 배포 직전에 WAF·방화벽을 설치해 소스 리뷰를 전면 대체한다.",
        "구현 단계 시큐어 코딩만으로 설계 위협 모델링과 DAST 테스트를 생략할 수 있다.",
        "보안 검증을 배포 완료 후 연 1회 정기 모의해킹에만 집중해 개발 일정 단축한다.",
      ],
      answer:
        "분석·설계부터 보안을 내재화해 운영 후 수정 대비 결함 비용·위험을 줄인다.",
      explanation:
        "시큐어 SDLC(Shift-Left Security)는 요구사항(보안 요구 정의) → 설계(위협 모델링 STRIDE, 아키텍처 검토) → 구현(시큐어 코딩, SAST) → 테스트(DAST, 모의해킹) → 운영·폐기 전 단계에 보안 활동을 통합하여 사후 패치 비용(설계 단계 대비 수십 배)을 절감합니다.",
      difficulty: "EASY",
      keywords: ["시큐어 SDLC", "위협 모델링", "STRIDE", "Shift-Left"],
    },
    {
      id: "SEC_CMN_APP_055",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "Microsoft SDL에서 설계 단계 위협을 6가지 범주로 체계적으로 식별하는 위협 모델링 기법인 'STRIDE'의 각 약어가 뜻하는 위협이 바르게 연결된 것은?",
      options: [
        "Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege",
        "Spoofing, Tracking, Redirect, Injection, Desynchronization, Enumeration",
        "Scanning, Tampering, Repudiation, Integrity, Decryption, Elevation of Privilege",
        "Symmetric, Transport, Replay, Information Disclosure, DoS, Exploitation",
      ],
      answer:
        "Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege",
      explanation:
        "STRIDE 6대 위협은 각각 대응 보안 속성과 짝을 이룹니다: S(Spoofing 위장→인증), T(Tampering 변조→무결성), R(Repudiation 부인→부인방지), I(Information Disclosure 정보 유출→기밀성), D(Denial of Service 서비스 거부→가용성), E(Elevation of Privilege 권한 상승→인가).",
      difficulty: "MEDIUM",
      keywords: ["STRIDE", "위협 모델링", "시큐어 SDLC"],
    },
    {
      id: "SEC_CMN_APP_056",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "전자상거래 보안 프로토콜인 SET(Secure Electronic Transaction)에서 '이중 서명(Dual Signature)' 기법을 도입한 핵심 보안 목적은?",
      options: [
        "상점은 주문(OI)·카드사는 결제(PI)만 보되 두 정보의 동일 거래 연결을 검증한다.",
        "고객과 상점이 동일한 개인키를 공유해 주문(OI)과 결제(PI)를 함께 복호화한다.",
        "카드사가 고객 주문 상세 품목(OI)까지 모두 열람해 상점 매출 세금을 검증한다.",
        "상점이 신용카드 번호(PI)를 평문 보관해 반복 결제 시 재인증 절차를 생략한다.",
      ],
      answer:
        "상점은 주문(OI)·카드사는 결제(PI)만 보되 두 정보의 동일 거래 연결을 검증한다.",
      explanation:
        "SET의 이중 서명은 `OIMD = H(OI)`와 `PIMD = H(PI)`를 결합해 다시 해시한 값 `H(PIMD || OIMD)`에 고객의 개인키로 전자서명합니다. 상점은 OI와 PIMD를 받아 결제 내역을 모른 채 주문과 서명을 검증하고, 지불 게이트웨이(카드사)는 PI와 OIMD를 받아 주문 내역을 모른 채 결제와 서명을 검증할 수 있습니다.",
      difficulty: "MEDIUM",
      keywords: ["SET", "이중 서명", "Dual Signature", "전자상거래 보안"],
    },
    {
      id: "SEC_CMN_APP_057",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "전자상거래 보안 프로토콜인 SSL/TLS와 SET(Secure Electronic Transaction)를 비교한 설명으로 올바른 것은?",
      options: [
        "SSL/TLS는 2자 구간 보호로 범용화됐고, SET은 3자 상호인증·이중서명이나 복잡하다.",
        "SET은 별도 지갑·인증서 부담이 없어 대중 표준이 됐고, SSL/TLS는 3자 서명을 쓴다.",
        "SSL/TLS는 고객·상점·지불 게이트웨이 모두의 전자서명 검증을 기본 내장해 복잡하다.",
        "SET은 상점이 고객의 신용카드 정보를 평문 확인하고 저장하는 구조를 전제로 설계됐다.",
      ],
      answer:
        "SSL/TLS는 2자 구간 보호로 범용화됐고, SET은 3자 상호인증·이중서명이나 복잡하다.",
      explanation:
        "SSL/TLS는 2자 간(사용자-상점) 전송 구간 보호에 집중해 구현이 간편하고 널리 쓰이지만 상점에 카드 정보가 노출될 수 있고, SET은 고객·상점·지불 게이트웨이 3자 간 인증과 이중 서명으로 보안을 강화했으나 모든 참여자의 인증서·전자지갑 설치 부담과 비용 때문에 대중화에 한계가 있었습니다(이후 SSL/TLS + 3D-Secure·토큰화 등으로 발전).",
      difficulty: "EASY",
      keywords: ["SSL/TLS", "SET", "3D-Secure", "전자상거래 보안"],
    },
    {
      id: "SEC_CMN_APP_058",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "시큐어 코딩에서 예측 가능한 난수 생성기(`java.util.Random`, C의 `rand()`)를 세션 ID, 비밀번호 재설정 토큰, 암호화 키 생성에 사용했을 때 발생하는 취약점과 안전한 대체 구현은?",
      options: [
        "약한 난수성으로 토큰 예측 가능 — `SecureRandom`·`secrets` 등 CSPRNG 사용",
        "재귀 호출에 따른 스택 고갈 발생 — 생성 난수 길이를 4바이트 정수로 제한",
        "정수 오버플로우로 세션 ID 충돌 — 현재 밀리초(`time()`) 시드를 매번 고정",
        "해시 충돌로 비밀번호 노출 — 일반 PRNG 출력에 MD5 단일 해시만 추가 적용",
      ],
      answer:
        "약한 난수성으로 토큰 예측 가능 — `SecureRandom`·`secrets` 등 CSPRNG 사용",
      explanation:
        "일반 PRNG(`rand()`, `Math.random()`, `java.util.Random`)는 현재 시간 등 예측 가능한 시드와 선형 합동 알고리즘을 써서 출력 몇 개만 관찰하면 다음 값을 예측할 수 있습니다. 보안 토큰·키·세션 ID·Salt 생성에는 반드시 암호학적으로 안전한 CSPRNG(`SecureRandom`, `crypto.randomBytes`, Python `secrets`, `/dev/urandom`)를 사용해야 합니다.",
      difficulty: "EASY",
      keywords: ["CSPRNG", "SecureRandom", "시큐어 코딩", "난수성"],
    },
    {
      id: "SEC_CMN_APP_059",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "시큐어 코딩에서 소스 코드나 Git 저장소에 데이터베이스 접속 비밀번호, API 키, 암호화 개인키를 직접 문자열로 작성해 두는 취약점과 올바른 관리 방안은?",
      options: [
        "하드코딩된 중요 정보 — 환경변수·KMS/Vault로 분리 및 시크릿 스캔",
        "오류 메시지 정보 노출 — 비밀번호 문자열을 Base64로 인코딩해 소스에 삽입",
        "부적절한 인가(IDOR) — 개인키 파일 이름만 난수화해 동일 Git 저장소에 커밋",
        "메모리 버퍼 누수 — DB 접속 암호 변수를 전역 상수(`final static`)로 선언",
      ],
      answer:
        "하드코딩된 중요 정보 — 환경변수·KMS/Vault로 분리 및 시크릿 스캔",
      explanation:
        "소스 코드에 하드코딩된 비밀 정보(Hardcoded Credentials)는 저장소 유출, 디컴파일, 백업 노출 시 즉시 악용되며 키 교체(Rotation)도 어렵습니다. 환경변수·암호화 설정·비밀 관리 시스템(KMS/Vault/Secret Manager)으로 분리하고 CI/CD 파이프라인에서 시크릿 스캐닝을 수행해야 합니다.",
      difficulty: "EASY",
      keywords: ["하드코딩된 비밀번호", "시큐어 코딩", "Secret Manager", "KMS"],
    },
    {
      id: "SEC_CMN_APP_060",
      category: "데이터베이스·시큐어 코딩·전자상거래 보안",
      question:
        "데이터베이스 보안 관리에서 애플리케이션 전용 DB 계정 권한 설정과 뷰(View) 활용 원칙으로 가장 올바른 것은?",
      options: [
        "앱에 DBA 권한 대신 최소 DML 권한만 주고 민감 컬럼을 제외한 뷰를 쓴다.",
        "편의를 위해 앱이 `root`/`sa` 계정을 공용 사용하되 DB 방화벽 포트만 제한한다.",
        "민감 컬럼 보호를 위해 뷰(View)를 생성하되 일반 사용자에게 `GRANT ALL`을 준다.",
        "감사 로그 저장 부담을 줄이기 위해 앱 계정의 DML 실행 이력 기록을 비활성화한다.",
      ],
      answer:
        "앱에 DBA 권한 대신 최소 DML 권한만 주고 민감 컬럼을 제외한 뷰를 쓴다.",
      explanation:
        "웹 앱이 DBA 최고 권한 계정을 사용하면 SQL Injection 발생 시 `xp_cmdshell` 실행, 파일 읽기/쓰기, 전체 DB 삭제 등 피해가 극대화됩니다. 최소 권한 원칙에 따라 업무별 전용 계정에 필요한 DML 권한만 부여하고, 뷰(View) 기반 컬럼·행 접근통제, 감사 로그 활성화, 불필요한 원격 포트 차단을 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["데이터베이스 접근통제", "최소 권한", "View", "DB 보안"],
    },
  ],
);

export const SECURITY_COMMON_APP_QUESTIONS: Question[] = [
  ...app0101,
  ...app0102,
  ...app0201,
  ...app0202,
];
