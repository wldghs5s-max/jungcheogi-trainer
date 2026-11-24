import { Question } from "../../../types/question";
import { buildSecuritySectionQuestions } from "./builders";

/**
 * 1과목 시스템 보안 — 공통 범위 창작 문제 (2023~2026 현행 및 공통 기준)
 */
const sys0101 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_SYS_01_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_SYS_011",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스에서 새 디렉터리를 생성할 때 시스템이 적용하는 기본 최대 권한과 일반 파일 생성 시 적용하는 기본 최대 권한을 바르게 짝지은 것은?",
      options: [
        "디렉터리 777 — 일반 파일 666",
        "디렉터리 755 — 일반 파일 644",
        "디렉터리 666 — 일반 파일 777",
        "디렉터리 777 — 일반 파일 755",
      ],
      answer: "디렉터리 777 — 일반 파일 666",
      explanation:
        "리눅스에서 umask 적용 전 기본 최대 권한은 디렉터리 777(rwxrwxrwx), 일반 파일 666(rw-rw-rw-)입니다. 일반 파일은 생성 직후 실행 권한(x)을 자동으로 부여하지 않습니다. 755와 644는 umask가 022일 때 산출되는 최종 결과 권한입니다.",
      difficulty: "EASY",
      keywords: ["umask", "기본 권한", "디렉터리 권한", "파일 권한"],
    },
    {
      id: "SEC_CMN_SYS_012",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스에서 협업용 프로젝트 디렉터리(/project)에 SetGID(2000)를 설정했을 때 나타나는 동작으로 가장 적절한 것은?",
      options: [
        "새로 생성되는 파일과 하위 디렉터리가 상위 디렉터리의 소유 그룹을 상속한다.",
        "디렉터리 내부 파일 삭제가 파일 소유자·디렉터리 소유자·root로만 제한된다.",
        "내부 실행 파일이 실행될 때 항상 디렉터리 소유자(UID) 권한으로 동작한다.",
        "하위 파일의 기타 사용자(Other) 읽기·쓰기 권한 비트가 자동으로 제거된다.",
      ],
      answer:
        "새로 생성되는 파일과 하위 디렉터리가 상위 디렉터리의 소유 그룹을 상속한다.",
      explanation:
        "디렉터리에 SetGID(2000)를 설정하면 내부에 새로 만들어지는 파일과 하위 디렉터리가 생성자의 기본 그룹 대신 해당 디렉터리의 소유 그룹을 상속받아 팀 공유 작업에 활용됩니다. 파일 삭제 제한은 Sticky Bit(1000)의 기능이며, 실행 시 소유자 UID 권한 부여는 실행 파일의 SetUID(4000) 기능입니다.",
      difficulty: "MEDIUM",
      keywords: ["SetGID", "디렉터리 특수 권한", "그룹 상속"],
    },
    {
      id: "SEC_CMN_SYS_013",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 셸의 umask 값이 022로 설정되어 있을 때, 일반 사용자가 새로 생성한 디렉터리와 일반 파일의 최종 8진수 권한으로 올바른 것은?",
      options: [
        "디렉터리 755, 일반 파일 644",
        "디렉터리 750, 일반 파일 640",
        "디렉터리 775, 일반 파일 664",
        "디렉터리 700, 일반 파일 600",
      ],
      answer: "디렉터리 755, 일반 파일 644",
      explanation:
        "umask 022는 그룹과 기타 사용자의 쓰기(w=2) 권한을 제거합니다. 디렉터리는 777에서 022를 마스킹해 755(rwxr-xr-x)가 되고, 일반 파일은 666에서 022를 마스킹해 644(rw-r--r--)가 됩니다. 750/640은 umask 027, 775/664는 umask 002, 700/600은 umask 077의 결과입니다.",
      difficulty: "EASY",
      keywords: ["umask", "022", "755", "644"],
    },
    {
      id: "SEC_CMN_SYS_014",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스에서 umask 값이 033일 때 새 일반 파일을 생성하면 부여되는 최종 권한은 무엇인가?",
      options: [
        "644 (-rw-r--r--)",
        "633 (-rw--wx-wx)",
        "622 (-rw--w--w-)",
        "600 (-rw-------)",
      ],
      answer: "644 (-rw-r--r--)",
      explanation:
        "umask 계산은 단순 십진 뺄셈이 아니라 비트 단위 마스킹(기본권한 AND NOT umask)입니다. 일반 파일 기본 권한 666(rw-rw-rw-)에는 원래 실행 비트(1)가 없으므로 umask 033(--- -wx -wx)을 마스킹하면 쓰기(2)만 제거되어 644(-rw-r--r--)가 됩니다. 단순 뺄셈으로 633을 고르는 함정에 주의해야 합니다.",
      difficulty: "HARD",
      keywords: ["umask", "비트 마스킹", "033", "644"],
    },
    {
      id: "SEC_CMN_SYS_015",
      category: "권한 및 파일시스템 보안",
      question:
        "보안 점검 중 서버에서 불필요한 SetUID 또는 SetGID가 설정된 파일을 전체 파일시스템(`/`)에서 검색하려 한다. 가장 적절한 리눅스 `find` 명령은?",
      options: [
        "find / -type f \\( -perm -4000 -o -perm -2000 \\) -ls",
        "find / -type f \\( -perm 4000 -a -perm 2000 \\) -ls",
        "find / -type d \\( -perm -1000 -o -perm -2000 \\) -ls",
        "find / -type f \\( -perm -4000 -a -perm -1000 \\) -ls",
      ],
      answer: "find / -type f \\( -perm -4000 -o -perm -2000 \\) -ls",
      explanation:
        "`-perm -4000`은 SetUID 비트가 포함된 파일을, `-perm -2000`은 SetGID 비트가 포함된 파일을 찾으며 `-o`는 논리합(OR) 조건입니다. `-a`를 쓰면 두 비트가 동시에 켜진 경우만 검색되고, `-`(포함) 없이 `4000`만 쓰면 정확히 4000 권한만 찾습니다. `-1000`은 Sticky Bit를 검색하는 조건입니다.",
      difficulty: "MEDIUM",
      keywords: ["find", "SetUID", "SetGID", "취약점 점검"],
    },
    {
      id: "SEC_CMN_SYS_016",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 파일시스템에서 디렉터리에 부여되는 읽기(r), 쓰기(w), 실행(x) 권한의 의미를 바르게 연결한 것은?",
      options: [
        "r: 내부 목록 조회(ls), w: 파일 생성·삭제·이름 변경, x: 디렉터리 진입(cd)",
        "r: 디렉터리 진입(cd), w: 내부 파일 내용 수정, x: 내부 목록 조회(ls)",
        "r: 내부 목록 조회(ls), w: 내부 파일 내용만 수정, x: 내부 파일 일괄 실행",
        "r: 내부 파일 내용 읽기, w: 파일 생성·삭제·이름 변경, x: 소유 그룹 변경",
      ],
      answer:
        "r: 내부 목록 조회(ls), w: 파일 생성·삭제·이름 변경, x: 디렉터리 진입(cd)",
      explanation:
        "디렉터리에서 r은 내부 파일 목록 조회(ls), w는 디렉터리 엔트리 변경(파일 생성·삭제·이름 변경), x는 해당 디렉터리로 이동(cd)하고 내부 inode에 접근할 수 있는 통과 권한을 뜻합니다. 특히 디렉터리에 w가 있으면 내부 파일 자체에 쓰기 권한이 없어도(Sticky Bit 미설정 시) 파일 삭제가 가능합니다.",
      difficulty: "EASY",
      keywords: ["디렉터리 권한", "rwx", "파일시스템"],
    },
    {
      id: "SEC_CMN_SYS_017",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스의 하드 링크(Hard Link)와 심볼릭 링크(Symbolic Link)를 비교한 설명으로 올바른 것은?",
      options: [
        "하드 링크는 원본과 inode를 공유해 원본 이름을 지워도 데이터 접근이 가능하다.",
        "하드 링크는 서로 다른 파일시스템 간 연결이나 디렉터리 링크 생성에 주로 쓰인다.",
        "심볼릭 링크는 원본과 동일한 inode 번호를 가지므로 원본 삭제 후에도 유효하다.",
        "심볼릭 링크는 링크 카운트(Link Count)를 1 증가시켜 데이터 블록을 직접 가리킨다.",
      ],
      answer:
        "하드 링크는 원본과 inode를 공유해 원본 이름을 지워도 데이터 접근이 가능하다.",
      explanation:
        "하드 링크는 원본과 같은 inode를 가리키며 링크 카운트가 0이 될 때까지 데이터 블록이 유지됩니다. 반면 서로 다른 파일시스템 간 연결과 디렉터리 연결은 심볼릭 링크만 가능하며, 심볼릭 링크는 별도의 inode에 원본 경로 문자열을 저장하므로 원본 삭제 시 깨진 링크(Dangling Link)가 됩니다.",
      difficulty: "MEDIUM",
      keywords: ["하드 링크", "심볼릭 링크", "inode", "파일시스템"],
    },
    {
      id: "SEC_CMN_SYS_018",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 시스템에서 root 권한을 탈취한 공격자가 시스템 핵심 바이너리나 로그 설정 파일을 수정·삭제하지 못하도록 ext4 파일시스템의 확장 속성으로 변경 불가(Immutable) 플래그를 부여하는 명령은?",
      options: [
        "chattr +i /etc/passwd",
        "chattr +a /etc/passwd",
        "chmod 0444 /etc/passwd",
        "chattr +s /etc/passwd",
      ],
      answer: "chattr +i /etc/passwd",
      explanation:
        "`chattr +i`는 파일에 Immutable(변경 불가) 확장 속성을 부여해 일반 사용자뿐만 아니라 root라도 속성을 해제(`chattr -i`)하기 전에는 수정·삭제·이름 변경·링크 생성을 할 수 없게 합니다. `chattr +a`는 파일 끝 추가(append-only)만 허용하며 로그 파일 보호에 쓰이고, `chmod 0444`는 일반 모드 비트 변경이라 root 쓰기를 막지 못합니다.",
      difficulty: "MEDIUM",
      keywords: ["chattr", "Immutable", "확장 속성", "파일 무결성"],
    },
    {
      id: "SEC_CMN_SYS_019",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 디렉터리 `/var/app/data`의 권한이 `drwxr-x---`이고 소유자가 `app:dev`이다. `dev` 그룹 소속이 아닌 일반 사용자 `guest`에게만 이 디렉터리의 읽기·실행 권한을 예외적으로 부여하려 할 때 사용하는 기능과 명령은?",
      options: [
        "파일시스템 ACL — setfacl -m u:guest:rx /var/app/data",
        "Sticky Bit — chmod o+t,rx /var/app/data",
        "SetGID — chmod g+s,o+rx /var/app/data",
        "확장 속성 — chattr +i u:guest /var/app/data",
      ],
      answer: "파일시스템 ACL — setfacl -m u:guest:rx /var/app/data",
      explanation:
        "전통적인 유닉스 소유자/그룹/기타 3단계 권한으로 표현하기 어려운 특정 사용자·그룹별 세분화 권한은 POSIX ACL(`setfacl`, `getfacl`)을 사용합니다. Sticky Bit는 공용 디렉터리 삭제 제한, SetGID는 디렉터리 그룹 상속, `chattr +i`는 파일 변경 불가 속성 설정 기능입니다.",
      difficulty: "MEDIUM",
      keywords: ["ACL", "setfacl", "접근 권한", "파일시스템"],
    },
    {
      id: "SEC_CMN_SYS_020",
      category: "권한 및 파일시스템 보안",
      question:
        "운영 중인 리눅스 서버에서 보안 담당자가 `/tmp` 디렉터리의 권한을 점검한 결과 `drwxrwxrwx`로 설정되어 있었다. 이 설정에서 발생할 수 있는 보안 위험과 올바른 조치로 짝지어진 것은?",
      options: [
        "타인이 남의 임시 파일 삭제·교체 가능 — chmod 1777 /tmp",
        "임시 파일이 자동 root 권한 실행됨 — chmod 4777 /tmp",
        "일반 사용자가 임시 파일 생성 불가 — chmod 2777 /tmp",
        "파일 생성자도 자기 파일 수정 불가 — chmod 0755 /tmp",
      ],
      answer: "타인이 남의 임시 파일 삭제·교체 가능 — chmod 1777 /tmp",
      explanation:
        "`/tmp`에 Sticky Bit 없이 `0777(drwxrwxrwx)`만 부여되면 쓰기 권한이 있는 임의의 사용자가 타인의 임시 파일을 삭제하거나 악성 심볼릭 링크로 교체할 수 있습니다. `chmod 1777 /tmp`로 Sticky Bit(`t`)를 설정해 파일 소유자·디렉터리 소유자·root만 삭제할 수 있도록 제한해야 합니다.",
      difficulty: "EASY",
      keywords: ["/tmp", "Sticky Bit", "1777", "임시 파일 보안"],
    },
    {
      id: "SEC_CMN_SYS_021",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 파일 권한 표기 `-rwxr-sr-x`에 대한 해석으로 올바른 것은?",
      options: [
        "일반 파일이며 그룹 실행 권한(x)과 함께 SetGID(2000)가 설정되어 있다.",
        "일반 파일이며 그룹 실행 권한(x)이 없는 상태에서 SetGID(2000)가 설정되어 있다.",
        "디렉터리이며 소유자 실행 권한과 함께 SetUID(4000)가 설정되어 있다.",
        "일반 파일이며 기타 사용자에게 Sticky Bit(1000)가 설정되어 있다.",
      ],
      answer:
        "일반 파일이며 그룹 실행 권한(x)과 함께 SetGID(2000)가 설정되어 있다.",
      explanation:
        "맨 앞 문자 `-`는 일반 파일(`d`는 디렉터리)을 뜻하고, 그룹 권한 자리 `r-s`에서 소문자 `s`는 그룹 실행 권한(x)이 존재하는 상태에서 SetGID가 설정되었음을 의미합니다(8진수 2755). 실행 권한(x)이 없을 때는 대문자 `S`로 표기됩니다.",
      difficulty: "MEDIUM",
      keywords: ["SetGID", "권한 표기", "2755", "소문자 s"],
    },
    {
      id: "SEC_CMN_SYS_022",
      category: "권한 및 파일시스템 보안",
      question:
        "리눅스 서버에서 루트 소유 실행 파일에 불필요한 SetUID 비트가 남아 있을 때 공격자가 이를 악용하는 대표적 위협과 가장 우선적인 예방 조치로 바르게 연결된 것은?",
      options: [
        "로컬 권한 상승 — 불필요한 SetUID 제거(chmod u-s)",
        "그룹 소유권 상속 — 불필요한 SetGID 추가(chmod g+s)",
        "파일 무단 삭제 — 공용 디렉터리 Sticky Bit(chmod +t) 해제",
        "비밀번호 평문 노출 — 실행 권한(x)만 제거하고 u+s 유지",
      ],
      answer: "로컬 권한 상승 — 불필요한 SetUID 제거(chmod u-s)",
      explanation:
        "root 소유 파일에 SetUID가 설정되어 있으면 일반 사용자가 해당 프로그램의 취약점(버퍼 오버플로우, 명령어 삽입 등)을 악용해 root 권한을 획득하는 로컬 권한 상승(Privilege Escalation) 공격이 가능합니다. 필수 시스템 명령(`/usr/bin/passwd` 등) 외 불필요한 SetUID 비트를 제거(`chmod u-s`)하고 정기적으로 감사해야 합니다.",
      difficulty: "EASY",
      keywords: ["SetUID", "권한 상승", "chmod u-s", "예방 조치"],
    },
  ],
);

const sys0102 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_SYS_01_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_SYS_023",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 `/etc/passwd` 파일의 한 행이 `dev01:x:1005:1005:Developer:/home/dev01:/bin/bash`로 구성되어 있을 때, 두 번째 필드(`x`)와 세 번째 필드(`1005`)가 의미하는 바를 바르게 짝지은 것은?",
      options: [
        "2번째: 패스워드 섀도잉 적용 — 3번째: 사용자 식별자(UID)",
        "2번째: 계정 로그인 잠금 표시 — 3번째: 기본 그룹 식별자(GID)",
        "2번째: 섀도 파일 미사용 표시 — 3번째: 패스워드 최대 사용일",
        "2번째: 실제 암호화된 해시값 — 3번째: 보조 그룹 식별자(GID)",
      ],
      answer: "2번째: 패스워드 섀도잉 적용 — 3번째: 사용자 식별자(UID)",
      explanation:
        "`/etc/passwd`는 콜론(`:`)으로 구분된 7개 필드(계정명:패스워드:UID:GID:설명:홈디렉터리:로그인셸)로 구성됩니다. 두 번째 필드의 `x`는 실제 해시된 패스워드가 root만 읽을 수 있는 `/etc/shadow`에 분리 보관됨(섀도잉 적용)을 뜻하며, 세 번째 필드는 UID, 네 번째 필드는 기본 GID입니다.",
      difficulty: "EASY",
      keywords: ["/etc/passwd", "/etc/shadow", "UID", "패스워드 섀도잉"],
    },
    {
      id: "SEC_CMN_SYS_024",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 `/etc/shadow` 파일에서 패스워드 해시 문자열이 `$6$salt$hash...` 형태로 시작할 때, `$6$`가 의미하는 해시 알고리즘은?",
      options: [
        "SHA-512",
        "MD5",
        "DES (초기 56비트)",
        "Blowfish (bcrypt)",
      ],
      answer: "SHA-512",
      explanation:
        "리눅스 crypt 형식에서 `$1$`은 MD5, `$2a$`/`$2y$`는 Blowfish(bcrypt), `$5$`는 SHA-256, `$6$`는 SHA-512, `$y$`는 yescrypt를 의미합니다. 보안 강화를 위해 MD5(`$1$`) 대신 SHA-512(`$6$`) 또는 yescrypt 사용이 권장됩니다.",
      difficulty: "MEDIUM",
      keywords: ["/etc/shadow", "SHA-512", "$6$", "패스워드 해시"],
    },
    {
      id: "SEC_CMN_SYS_025",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 `/etc/shadow` 파일의 두 번째 패스워드 필드에 `!` 또는 `*` 기호가 들어 있을 때의 의미로 가장 올바른 것은?",
      options: [
        "해당 계정의 패스워드 로그인을 잠그거나 비활성화해 인증을 차단한 상태이다.",
        "패스워드 없이 콘솔이나 SSH로 즉시 로그인할 수 있는 무인증 계정 상태이다.",
        "비밀번호 만료 기간이 무제한으로 설정되어 재변경 없이 영구 사용 가능한 상태이다.",
        "최초 로그인 시 사용자가 새 패스워드를 즉시 강제 변경하도록 예약된 상태이다.",
      ],
      answer:
        "해당 계정의 패스워드 로그인을 잠그거나 비활성화해 인증을 차단한 상태이다.",
      explanation:
        "`/etc/shadow` 패스워드 필드 맨 앞의 `!`는 `passwd -l`이나 `usermod -L`로 잠긴 계정을, `*`는 시스템 데몬 계정처럼 패스워드 로그인이 허용되지 않는 계정을 뜻합니다(단, SSH 공개키 인증은 별도 통제가 필요합니다). 필드가 완전히 비어 있으면 패스워드 없는 로그인 위험이 발생하고, 3번째 필드(마지막 변경일)가 `0`이면 최초 로그인 시 변경 강제입니다.",
      difficulty: "MEDIUM",
      keywords: ["/etc/shadow", "계정 잠금", "시스템 계정"],
    },
    {
      id: "SEC_CMN_SYS_026",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 서버에서 로그인할 필요가 없는 시스템 서비스 계정(예: `apache`, `mysql`)의 셸 로그인을 차단하기 위해 `/etc/passwd`의 마지막 필드에 설정하는 가장 적절한 값은?",
      options: [
        "/sbin/nologin",
        "/bin/rbash",
        "/bin/sh",
        "/bin/bash",
      ],
      answer: "/sbin/nologin",
      explanation:
        "데몬·서비스 계정은 대화형 로그인을 할 필요가 없으므로 `/etc/passwd`의 로그인 셸을 `/sbin/nologin`(또는 `/bin/false`)로 지정해 계정 탈취 시 셸 획득을 차단해야 합니다. `/bin/rbash`는 제한 셸이긴 하나 여전히 대화형 로그인 셸을 제공하므로 서비스 계정 로그인 차단용으로 적절하지 않습니다.",
      difficulty: "EASY",
      keywords: ["/etc/passwd", "/sbin/nologin", "불필요한 셸 제한"],
    },
    {
      id: "SEC_CMN_SYS_027",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 주요 로그인 관련 바이너리 로그 파일과 조회 명령어가 바르게 짝지어진 것은?",
      options: [
        "/var/run/utmp (현재 로그인) — who / /var/log/btmp (로그인 실패) — lastb",
        "/var/log/wtmp (로그인 실패) — lastb / /var/log/btmp (현재 로그인) — who",
        "/var/log/lastlog (로그인 실패) — last / /var/log/wtmp (계정별 최종) — lastlog",
        "/var/run/utmp (성공 이력) — last / /var/log/lastlog (현재 로그인) — w",
      ],
      answer:
        "/var/run/utmp (현재 로그인) — who / /var/log/btmp (로그인 실패) — lastb",
      explanation:
        "리눅스 4대 로그인 바이너리 로그는 ① `utmp`(현재 로그인 상태: `w`, `who`, `users`), ② `wtmp`(성공한 로그인·로그아웃·재부팅 이력: `last`), ③ `btmp`(실패한 로그인 시도: `lastb`), ④ `lastlog`(각 계정별 마지막 로그인 기록: `lastlog`)로 구분합니다. 무차별 대입 공격 징후 탐지에는 `btmp`(`lastb`)와 `/var/log/secure`(또는 `auth.log`)가 핵심입니다.",
      difficulty: "EASY",
      keywords: ["utmp", "wtmp", "btmp", "lastlog", "lastb"],
    },
    {
      id: "SEC_CMN_SYS_028",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 보안 점검 결과 `/etc/passwd` 파일에 `root` 외에 `admin_bak` 계정의 UID가 `0`으로 설정되어 있었다. 이 설정이 위험한 이유와 조치 방법으로 올바른 것은?",
      options: [
        "커널이 UID 0을 최고 관리자로 인식하므로 삭제하거나 일반 UID로 바꾼다.",
        "계정명이 `root`가 아니면 일반 권한만 적용되므로 로그인 셸만 점검한다.",
        "UID 0은 로그인할 수 없는 데몬 예약 번호이므로 비밀번호만 잠그면 안전하다.",
        "보조 관리자 위임용 표준 번호이므로 `/etc/sudoers` 등록 여부만 확인한다.",
      ],
      answer:
        "커널이 UID 0을 최고 관리자로 인식하므로 삭제하거나 일반 UID로 바꾼다.",
      explanation:
        "리눅스/유닉스 커널은 계정 문자열이 아니라 UID 숫자로 권한을 판별합니다. UID가 0인 계정은 `root`와 완전히 동일한 슈퍼유저 권한을 가지므로 백도어 계정 점검 시 `/etc/passwd`에서 UID 0 계정이 `root` 하나뿐인지 확인하고 불필요한 계정을 즉시 제거해야 합니다.",
      difficulty: "EASY",
      keywords: ["UID 0", "백도어 계정", "/etc/passwd", "계정 점검"],
    },
    {
      id: "SEC_CMN_SYS_029",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 `rsyslog` 설정(`/etc/rsyslog.conf`)에서 `authpriv.* /var/log/secure`와 `*.emerg *`가 각각 의미하는 바로 올바른 것은?",
      options: [
        "인증·보안 전체 레벨을 `/var/log/secure`에 기록하고, 최고 심각도 로그는 접속자 전체 터미널에 출력한다.",
        "인증 실패 로그만 `/var/log/secure`에 저장하고, 최고 심각도 로그는 원격 SIEM으로만 별도 전송한다.",
        "커널·시스템 부팅 로그를 `/var/log/secure`에 저장하고, 최고 심각도 로그는 `/dev/null`로 폐기한다.",
        "관리자 `su` 이력만 기록하고, 최고 심각도 로그 발생 시 로그인된 모든 사용자 세션을 즉시 종료한다.",
      ],
      answer:
        "인증·보안 전체 레벨을 `/var/log/secure`에 기록하고, 최고 심각도 로그는 접속자 전체 터미널에 출력한다.",
      explanation:
        "`rsyslog` 규칙은 `facility.priority action` 형식을 따릅니다. `authpriv.*`는 인증·권한 관련(`su`, `sudo`, `sshd` 등) 모든 레벨 로그를 `/var/log/secure`에 기록하며, `*.emerg *`는 가장 높은 심각도(0: emerg) 발생 시 접속 중인 모든 사용자(`*`) 터미널로 긴급 경고를 방송합니다.",
      difficulty: "MEDIUM",
      keywords: ["rsyslog", "authpriv", "emerg", "시스템 로그"],
    },
    {
      id: "SEC_CMN_SYS_030",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 `syslog` 우선순위(Severity) 레벨을 심각도가 가장 높은 것부터 낮은 순으로 바르게 나열한 것은?",
      options: [
        "emerg(0) > alert(1) > crit(2) > err(3) > warning(4) > notice(5) > info(6) > debug(7)",
        "debug(0) > info(1) > notice(2) > warning(3) > err(4) > crit(5) > alert(6) > emerg(7)",
        "crit(0) > emerg(1) > err(2) > alert(3) > info(4) > warning(5) > debug(6) > notice(7)",
        "alert(0) > err(1) > emerg(2) > warning(3) > crit(4) > debug(5) > notice(6) > info(7)",
      ],
      answer:
        "emerg(0) > alert(1) > crit(2) > err(3) > warning(4) > notice(5) > info(6) > debug(7)",
      explanation:
        "RFC 5424 / syslog 심각도 숫자는 작을수록 더 치명적입니다. 0: emerg(시스템 사용 불가) → 1: alert(즉시 조치) → 2: crit(치명적) → 3: err(오류) → 4: warning(경고) → 5: notice(정상이나 중요) → 6: info(정보) → 7: debug(디버그) 순서를 암기해 두어야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["syslog", "Severity", "emerg", "우선순위"],
    },
    {
      id: "SEC_CMN_SYS_031",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 서버에서 원격 SSH로 root 직접 로그인을 차단하고 일반 계정으로 접속한 뒤 `su` 또는 `sudo`로 권한을 전환하도록 강제하려 한다. `/etc/ssh/sshd_config`에서 수정해야 할 핵심 지시자는?",
      options: [
        "PermitRootLogin no",
        "PermitEmptyPasswords no",
        "PasswordAuthentication no",
        "AllowAgentForwarding no",
      ],
      answer: "PermitRootLogin no",
      explanation:
        "`/etc/ssh/sshd_config`에 `PermitRootLogin no`를 설정하고 sshd를 재시작하면 외부에서 root 계정으로 직접 SSH 로그인하는 시도를 차단할 수 있습니다. `PermitEmptyPasswords no`는 빈 비밀번호 로그인 차단, `PasswordAuthentication no`는 비밀번호 인증 비활성화(공개키 인증 강제), `AllowAgentForwarding no`는 SSH 에이전트 포워딩 제한 지시자입니다.",
      difficulty: "EASY",
      keywords: ["SSH", "PermitRootLogin", "sshd_config", "계정 보안"],
    },
    {
      id: "SEC_CMN_SYS_032",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 서버에서 패스워드 정책(최대 사용 기간 `PASS_MAX_DAYS`, 최소 사용 기간 `PASS_MIN_DAYS`, 최소 길이 `PASS_MIN_LEN`, 만료 경고일 `PASS_WARN_AGE`)의 전역 기본값을 설정하는 파일과 개별 계정에 이를 즉시 조회·적용하는 명령은?",
      options: [
        "/etc/login.defs — chage 명령어",
        "/etc/shadow — passwd -l 명령어",
        "/etc/security/limits.conf — usermod 명령어",
        "/etc/pam.d/su — grpconv 명령어",
      ],
      answer: "/etc/login.defs — chage 명령어",
      explanation:
        "`/etc/login.defs`는 새 계정 생성 시 적용되는 패스워드 만료·길이 등 기본 정책을 정의하며, 이미 생성된 계정의 패스워드 만료 주기를 확인하거나 변경할 때는 `chage -l <계정>`, `chage -M 90 <계정>` 명령을 사용합니다. `/etc/security/limits.conf`는 사용자별 자원 한도를, `passwd -l`은 계정 잠금을 처리합니다.",
      difficulty: "MEDIUM",
      keywords: ["/etc/login.defs", "chage", "패스워드 정책"],
    },
    {
      id: "SEC_CMN_SYS_033",
      category: "계정 및 시스템 로그",
      question:
        "윈도우(Windows) 서버에서 로컬 계정 패스워드 해시(LM/NTLM)를 저장하는 데이터베이스 파일과, 로컬에서 관리자가 아닌 일반 프로세스가 이 파일에 직접 접근하지 못하도록 운영체제가 실행 중 잠금을 거는 경로로 올바른 것은?",
      options: [
        "SAM — %SystemRoot%\\System32\\config\\SAM",
        "NTDS — %SystemRoot%\\System32\\config\\SYSTEM",
        "LSASS — %SystemRoot%\\System32\\drivers\\etc\\hosts",
        "SECURITY — %SystemRoot%\\System32\\spool\\SECURITY",
      ],
      answer: "SAM — %SystemRoot%\\System32\\config\\SAM",
      explanation:
        "윈도우 로컬 계정과 패스워드 해시는 `%SystemRoot%\\System32\\config\\SAM` 레지스트리 하이브에 저장되며(AD 도메인 컨트롤러는 `NTDS.dit`), 부팅 후 커널이 배타적 잠금을 걸어 보호합니다. `SYSTEM` 하이브에는 SAM 암호화에 쓰이는 부트 키가 저장되고, `hosts`는 로컬 이름 해석 파일입니다.",
      difficulty: "EASY",
      keywords: ["Windows SAM", "NTLM", "계정 보안"],
    },
    {
      id: "SEC_CMN_SYS_034",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 침해사고 초기 분석 중 공격자가 로그인 성공 후 자신의 SSH 접속 흔적을 지우기 위해 `/var/log/wtmp`를 임의로 삭제하거나 크기를 0으로 만든 정황이 의심된다. 이러한 로그 위·변조 및 삭제를 사전에 예방하기 위한 가장 효과적인 로그 운영 아키텍처는?",
      options: [
        "격리된 원격 로그 서버로 실시간 전송하고 로컬 로그는 append-only(`chattr +a`)로 보호한다.",
        "로컬 `/var/log`의 접근 권한을 `644`로 유지해 일반 사용자도 백업 사본을 수시로 복사하게 한다.",
        "로그 파일 위·변조를 막기 위해 `logrotate` 주기를 1시간으로 줄여 로컬 디스크에 다중 압축 저장한다.",
        "시스템 종료 시에만 일괄로 원격 서버에 전송하고 평상시에는 로컬 `rsyslog` 쓰기를 비활성화한다.",
      ],
      answer:
        "격리된 원격 로그 서버로 실시간 전송하고 로컬 로그는 append-only(`chattr +a`)로 보호한다.",
      explanation:
        "단일 서버 로컬 디스크에만 로그를 두면 공격자가 root 획득 후 로그를 쉽게 삭제·변조할 수 있습니다. 따라서 발생 즉시 격리된 원격 로그 서버/SIEM으로 실시간 전송(TLS 암호화 권장)하고, 로컬 로그에는 추가 쓰기만 허용하는 `chattr +a` 속성과 엄격한 파일 권한(640/600)을 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["원격 로그 서버", "SIEM", "chattr +a", "로그 무결성"],
    },
    {
      id: "SEC_CMN_SYS_035",
      category: "계정 및 시스템 로그",
      question:
        "리눅스 서버에서 특정 일반 사용자 계정에 꼭 필요한 일부 관리 명령만 root 권한으로 실행할 수 있게 허용하고 실행 이력을 감사 로그로 남기려 한다. 가장 안전한 설정 파일과 편집 도구는?",
      options: [
        "/etc/sudoers — visudo 명령어",
        "/etc/passwd — chage -l 명령어",
        "/etc/group — usermod -aG root 명령어",
        "/etc/pam.d/su — chmod u+s 명령어",
      ],
      answer: "/etc/sudoers — visudo 명령어",
      explanation:
        "`/etc/sudoers`에 최소 권한 원칙에 따라 허용할 특정 명령만 지정하면 root 비밀번호를 공유하지 않고도 감사 로그를 남기며 권한 위임이 가능합니다. 편집 시 반드시 `visudo`를 사용해야 저장 전 문법 오류를 자동 검증하여 sudo가 먹통이 되는 사고를 방지할 수 있습니다.",
      difficulty: "EASY",
      keywords: ["sudo", "/etc/sudoers", "visudo", "최소 권한"],
    },
  ],
);

const sys0201 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_SYS_02_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_SYS_036",
      category: "시스템 취약점 공격 및 방어",
      question:
        "스택 버퍼 오버플로우(Stack Buffer Overflow) 공격에서 공격자가 지역 변수 버퍼의 크기를 초과하는 입력값을 주입해 최종적으로 덮어쓰려 하는 핵심 스택 영역과, 이를 통해 달성하려는 목표는?",
      options: [
        "함수의 복귀 주소(RET)를 공격 코드 주소로 덮어써 실행 흐름을 탈취한다.",
        "지역 변수의 자료형 크기 필드를 덮어써 컴파일러 경계 검사를 무력화한다.",
        "전역 데이터 세그먼트(BSS) 주소를 덮어써 커널 모드 권한으로 직접 전환한다.",
        "환경 변수 영역의 포인터를 덮어써 ASLR 메모리 배치 테이블을 초기화한다.",
      ],
      answer:
        "함수의 복귀 주소(RET)를 공격 코드 주소로 덮어써 실행 흐름을 탈취한다.",
      explanation:
        "스택 프레임에는 지역 변수(버퍼) 위쪽에 이전 프레임 포인터(SFP/EBP)와 함수 복귀 주소(RET)가 위치합니다. `strcpy`, `gets`처럼 경계 검사가 없는 함수에 버퍼 크기 이상의 입력을 넣어 RET를 셸코드나 ROP 가젯 주소로 변조하면 함수 종료(`ret`) 시 공격 흐름이 실행됩니다. 예방을 위해 `strncpy`·`fgets` 등 경계 검사 함수 사용과 ASLR/DEP/Stack Canary 적용이 필수입니다.",
      difficulty: "EASY",
      keywords: ["Stack Buffer Overflow", "RET", "셸코드", "경계 검사"],
    },
    {
      id: "SEC_CMN_SYS_037",
      category: "시스템 취약점 공격 및 방어",
      question:
        "메모리 보호 기법 중 ASLR, DEP(NX Bit), Stack Canary의 방어 원리를 바르게 연결한 것은?",
      options: [
        "ASLR: 주소 공간 무작위화 / DEP: 데이터 영역 실행 차단 / Canary: RET 앞 변조 감시",
        "ASLR: 데이터 영역 실행 차단 / DEP: 주소 공간 무작위화 / Canary: 힙 할당 크기 검증",
        "ASLR: RET 앞 변조 감시 / DEP: 컴파일 시 경계 검사 / Canary: 주소 공간 무작위화",
        "ASLR: 주소 공간 무작위화 / DEP: RET 앞 변조 감시 / Canary: 데이터 영역 실행 차단",
      ],
      answer:
        "ASLR: 주소 공간 무작위화 / DEP: 데이터 영역 실행 차단 / Canary: RET 앞 변조 감시",
      explanation:
        "버퍼 오버플로우 3대 핵심 방어 기법은 자주 혼동되므로 명확히 구분해야 합니다. ASLR은 스택·힙·라이브러리 메모리 배치 무작위화, DEP/NX(Non-Executable)는 데이터 영역(스택·힙)의 실행 권한 제거, Stack Canary(StackGuard)는 지역 변수와 복귀 주소(RET) 사이에 비밀 값을 넣어 함수 복귀 직전 변조 여부를 검증합니다.",
      difficulty: "EASY",
      keywords: ["ASLR", "DEP", "NX", "Stack Canary"],
    },
    {
      id: "SEC_CMN_SYS_038",
      category: "시스템 취약점 공격 및 방어",
      question:
        "스택과 힙 영역에 실행 불가(DEP/NX) 보호 기법이 적용되어 셸코드를 직접 실행할 수 없을 때, 공격자가 이미 실행 권한이 부여된 공유 라이브러리(`libc`의 `system()` 함수 등)나 기존 바이너리 내 명령어 조각(Gadget)을 연쇄 호출해 DEP를 우회하는 공격 기법으로 짝지어진 것은?",
      options: [
        "RTL / ROP (기존 실행 가능 코드 조각 재사용)",
        "Heap Spray / NOP Sled (힙·스택 셸코드 직접 실행)",
        "TOCTOU / Race Condition (임시 파일 심볼릭 링크 치환)",
        "Integer Overflow / Sign Extension (할당 크기 음수 우회)",
      ],
      answer: "RTL / ROP (기존 실행 가능 코드 조각 재사용)",
      explanation:
        "DEP/NX가 스택의 셸코드 실행을 막자 공격자들은 이미 실행 가능(`r-x`)한 코드 영역을 재사용하는 기법을 고안했습니다. RTL(Return-to-Libc)은 RET를 `libc`의 `system()` 주소로 덮어 `/bin/sh`를 실행하며, ROP(Return-Oriented Programming)는 코드 영역 끝에 `ret`이 붙은 짧은 명령 조각(Gadget)들을 스택에 이어 붙여 임의 로직을 실행합니다. 방어에는 ASLR, PIE, CFI가 함께 쓰입니다.",
      difficulty: "MEDIUM",
      keywords: ["DEP 우회", "RTL", "ROP", "Gadget", "ASLR"],
    },
    {
      id: "SEC_CMN_SYS_039",
      category: "시스템 취약점 공격 및 방어",
      question:
        "C 언어의 `printf(user_input);`처럼 포맷 문자열 인자 자리에 사용자 입력을 직접 전달할 때 발생하는 '포맷 스트링(Format String) 취약점'에서, 공격자가 임의 메모리 주소의 값을 읽거나 특정 주소에 원하는 값을 덮어쓰기 위해 각각 주로 사용하는 서식 지정자는?",
      options: [
        "메모리 읽기: `%x`, `%s` — 메모리 쓰기: `%n`",
        "메모리 읽기: `%n`, `%p` — 메모리 쓰기: `%s`",
        "메모리 읽기: `%d`, `%u` — 메모리 쓰기: `%x`",
        "메모리 읽기: `%c`, `%f` — 메모리 쓰기: `%p`",
      ],
      answer: "메모리 읽기: `%x`, `%s` — 메모리 쓰기: `%n`",
      explanation:
        "포맷 스트링 공격에서 `%x`·`%p`는 스택 메모리 값을 16진수로 노출시키고 `%s`는 해당 주소의 문자열을 읽으며, `%n`은 지금까지 출력된 바이트 수를 스택에 지정된 포인터 주소에 기록(Write)하므로 임의 메모리 변조로 이어집니다. 예방 방법은 반드시 `printf(\"%s\", user_input);`처럼 포맷 문자열을 상수로 고정하는 것입니다.",
      difficulty: "MEDIUM",
      keywords: ["Format String", "%n", "%x", "포맷 스트링 취약점"],
    },
    {
      id: "SEC_CMN_SYS_040",
      category: "시스템 취약점 공격 및 방어",
      question:
        "레이스 컨디션(Race Condition) 중 TOCTOU(Time-of-Check to Time-of-Use) 취약점이 SetUID 프로그램의 임시 파일 처리 과정에서 악용되는 시나리오와 근본적인 예방 대책은?",
      options: [
        "검사 후 열기 전 심볼릭 링크 치환 — O_CREAT|O_EXCL 및 mkstemp 사용",
        "열기 직후 파일 크기 초과 기록 — snprintf로 버퍼 길이 제한",
        "고정 경로 임시 파일 중복 생성 — access 호출 전 lstat만 1회 추가",
        "파일 디스크립터 누수 발생 — SetUID 유지한 채 umask 022 적용",
      ],
      answer:
        "검사 후 열기 전 심볼릭 링크 치환 — O_CREAT|O_EXCL 및 mkstemp 사용",
      explanation:
        "TOCTOU는 검사 시점(Time of Check)과 사용 시점(Time of Use) 사이의 시간 차를 노리는 경쟁 상태 공격입니다. 특히 `/tmp`에 예측 가능한 이름으로 임시 파일을 만들 때 `access`/`stat`과 `open` 사이에 심볼릭 링크로 중요 파일을 가리키게 해 덮어쓰기가 발생합니다. `mkstemp()`와 `O_CREAT | O_EXCL | O_NOFOLLOW`로 원자적 생성을 수행하고 `fs.protected_symlinks=1`을 유지해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["TOCTOU", "Race Condition", "심볼릭 링크", "mkstemp"],
    },
    {
      id: "SEC_CMN_SYS_041",
      category: "시스템 취약점 공격 및 방어",
      question:
        "C/C++ 프로그램에서 메모리 할당 크기 계산 시 부호 없는 정수(unsigned int)가 표현 범위를 넘어 0에 가까운 작은 값으로 되돌아간 뒤, 그 작은 크기로 `malloc()`을 호출하고 원래의 큰 데이터를 복사하여 힙 버퍼 오버플로우를 유발하는 취약점은?",
      options: [
        "정수 오버플로우 (Integer Overflow)",
        "오프바이원 오류 (Off-by-One Error)",
        "이중 해제 (Double Free Vulnerability)",
        "유즈 애프터 프리 (Use-After-Free)",
      ],
      answer: "정수 오버플로우 (Integer Overflow)",
      explanation:
        "정수 오버플로우(Wrap-around)는 예를 들어 `len + 1`이 32비트 최대값(`0xFFFFFFFF`)을 넘어 `0`이 된 뒤 `malloc(0)`으로 극소 버퍼를 할당받고, 이어지는 `memcpy(..., len)`에서 대량 데이터를 복사해 힙 손상 및 원격 코드 실행을 일으키는 취약점입니다. 연산 전 범위 검사(SafeInt 등)와 적절한 자료형 선택으로 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["Integer Overflow", "정수 오버플로우", "힙 오버플로우"],
    },
    {
      id: "SEC_CMN_SYS_042",
      category: "시스템 취약점 공격 및 방어",
      question:
        "동적 메모리(`malloc`/`new`)를 해제(`free`/`delete`)한 뒤에도 해당 메모리를 가리키는 포인터를 `NULL`로 초기화하지 않고 계속 참조하거나, 공격자가 해제된 청크에 악성 객체를 재할당해 프로그램 흐름을 제어하는 메모리 취약점은?",
      options: [
        "Use-After-Free (UAF) 및 댕글링 포인터",
        "Double Free 및 힙 메타데이터 중복 해제",
        "Integer Overflow 및 힙 크기 오산정",
        "Off-by-One 및 인접 힙 청크 1바이트 침범",
      ],
      answer: "Use-After-Free (UAF) 및 댕글링 포인터",
      explanation:
        "Use-After-Free(UAF)는 이미 해제된 힙 메모리 주소를 가리키는 댕글링 포인터(Dangling Pointer)를 재사용할 때 발생하며, 공격자가 해당 위치에 악성 데이터를 재할당해 가상 함수 테이블(vtable) 변조 등으로 코드 실행에 악용합니다. Double Free는 동일 청크를 두 번 `free()`하는 취약점입니다. 해제 직후 포인터를 `NULL`로 초기화해 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["Use-After-Free", "UAF", "Dangling Pointer", "힙 취약점"],
    },
    {
      id: "SEC_CMN_SYS_043",
      category: "시스템 취약점 공격 및 방어",
      question:
        "C 언어 표준 함수 중 입력 버퍼 크기를 검사하지 않아 버퍼 오버플로우에 취약한 함수와 이를 대체하는 안전한(길이 제한) 함수가 바르게 짝지어진 것은?",
      options: [
        "gets() → fgets() / strcpy() → strncpy() / sprintf() → snprintf()",
        "fgets() → gets() / strncpy() → strcpy() / snprintf() → sprintf()",
        "strcmp() → gets() / strlen() → strcat() / memcpy() → scanf(\"%s\")",
        "snprintf() → printf() / fgets() → scanf(\"%s\") / strncpy() → strcat()",
      ],
      answer: "gets() → fgets() / strcpy() → strncpy() / sprintf() → snprintf()",
      explanation:
        "`gets`, `strcpy`, `strcat`, `sprintf`, 길이 지정 없는 `scanf(\"%s\")`는 대상 버퍼 크기를 확인하지 않아 버퍼 오버플로우의 주원인이 됩니다. `fgets`, `strncpy`/`strlcpy`, `strncat`, `snprintf`처럼 최대 복사 길이를 명시하는 안전 함수로 대체하고 널 종료 문자(`\\0`) 처리까지 검증해야 합니다.",
      difficulty: "EASY",
      keywords: ["안전한 함수", "fgets", "strncpy", "snprintf", "버퍼 오버플로우 예방"],
    },
    {
      id: "SEC_CMN_SYS_044",
      category: "시스템 취약점 공격 및 방어",
      question:
        "리눅스 시스템에서 ASLR(Address Space Layout Randomization)의 동작 수준을 제어하는 커널 파라미터 `/proc/sys/kernel/randomize_va_space`의 설정값 `0`, `1`, `2`의 의미로 올바른 것은?",
      options: [
        "0: 비활성 / 1: 스택·공유 라이브러리·VDSO 랜덤 / 2: 힙(brk) 포함 전체 랜덤",
        "0: 전체 랜덤 / 1: 힙·brk 영역만 부분 랜덤 / 2: ASLR 기능 완전 비활성",
        "0: 비활성 / 1: 힙 영역만 단독 랜덤화 / 2: 스택·코드 세그먼트만 제한 랜덤",
        "0: ASLR 비활성 / 1: 스택·공유 라이브러리·PIE만 / 2: 커널 스택·BIOS만 랜덤",
      ],
      answer:
        "0: 비활성 / 1: 스택·공유 라이브러리·VDSO 랜덤 / 2: 힙(brk) 포함 전체 랜덤",
      explanation:
        "리눅스의 `kernel.randomize_va_space`는 `0`(비활성), `1`(보수적 랜덤화: 스택, mmap/공유 라이브러리, VDSO), `2`(완전 랜덤화: 힙/brk 포함, 현대 리눅스 기본 권장값)로 동작합니다. 운영 서버 보안 점검 시 값이 `2`로 유지되는지 확인해야 합니다.",
      difficulty: "HARD",
      keywords: ["ASLR", "randomize_va_space", "리눅스 커널 보안"],
    },
    {
      id: "SEC_CMN_SYS_045",
      category: "시스템 취약점 공격 및 방어",
      question:
        "사회공학적 시스템 공격 기법 중 특정 조직의 핵심 임직원·협력사를 사전에 치밀하게 정찰한 뒤, 업무와 밀접한 맞춤형 이메일·문서(악성 매크로·취약점 포함)를 발송해 내부망에 장기간 잠복하며 핵심 기밀을 탈취하는 지능형 지속 위협 공격은?",
      options: [
        "APT 및 스피어 피싱 (Spear Phishing)",
        "워터링 홀 및 드라이브 바이 다운로드",
        "대규모 스팸 피싱 및 랜섬웨어 무작위 유포",
        "크리덴셜 스터핑 및 SSH 무차별 대입 공격",
      ],
      answer: "APT 및 스피어 피싱 (Spear Phishing)",
      explanation:
        "APT는 특정 표적(기업·기관)을 대상으로 정찰 → 스피어 피싱(맞춤형 표적 이메일) 초기 침투 → 거점 확보(C&C) → 권한 상승·측면 이동 → 장기 잠복 및 데이터 유출 단계를 거치는 지능형 지속 위협입니다. 워터링 홀은 표적이 자주 찾는 웹사이트를 미리 감염시켜 대기하는 기법이라는 점에서 표적 이메일 방식과 구분됩니다.",
      difficulty: "EASY",
      keywords: ["APT", "스피어 피싱", "사회공학", "지속 위협"],
    },
    {
      id: "SEC_CMN_SYS_046",
      category: "시스템 취약점 공격 및 방어",
      question:
        "표적 조직 임직원이 자주 방문하는 특정 업계 협회 웹사이트나 커뮤니티를 사전에 해킹하여 악성 스크립트(드라이브 바이 다운로드)를 심어 두고, 표적 사용자가 해당 사이트에 접속하기를 기다려 감염시키는 침투 기법은?",
      options: [
        "워터링 홀 (Watering Hole) 공격",
        "스미싱 (Smishing) 공격",
        "비싱 (Vishing) 공격",
        "테일게이팅 (Tailgating) 공격",
      ],
      answer: "워터링 홀 (Watering Hole) 공격",
      explanation:
        "워터링 홀(Watering Hole)은 맹수가 물웅덩이에서 먹잇감을 기다리듯, 표적 집단이 신뢰하고 자주 방문하는 정상 웹사이트를 미리 침해해 악성코드를 유포하는 APT 초기 침투 기법입니다. 스미싱은 문자메시지(SMS), 비싱은 음성 통화(Voice), 테일게이팅은 물리적 출입문 뒤따라 들어가기입니다.",
      difficulty: "EASY",
      keywords: ["워터링 홀", "Watering Hole", "APT", "사회공학"],
    },
    {
      id: "SEC_CMN_SYS_047",
      category: "시스템 취약점 공격 및 방어",
      question:
        "Stack Canary(StackGuard) 보호 기법에서 카나리 값에 널 바이트(`0x00`), 개행(`0x0a`, `0x0d`), EOF(`0xff`) 등을 의도적으로 포함하는 '종료 카나리(Terminator Canary)' 방식의 주된 목적은?",
      options: [
        "`strcpy` 등 문자열 함수가 널·개행에서 복사를 멈춰 카나리 재주입을 방해",
        "실행마다 난수를 생성해 스택 주소를 무작위화하고 RET 오프셋을 은닉",
        "스택과 힙 데이터 영역의 실행 권한(x) 비트를 하드웨어 수준에서 제거",
        "함수 종료 시 스택 프레임 전체를 `0x00`으로 초기화해 정보 누출을 차단",
      ],
      answer:
        "`strcpy` 등 문자열 함수가 널·개행에서 복사를 멈춰 카나리 재주입을 방해",
      explanation:
        "종료 카나리(Terminator Canary)는 `0x00`(NULL), `0x0d`(CR), `0x0a`(LF), `0xff`(EOF)로 구성되어 문자열 기반 함수(`strcpy`, `gets` 등)로 동일한 카나리 값을 입력 스트림에 주입하는 것 자체를 어렵게 만듭니다. 난수 기반 무작위화는 Random Canary/ASLR, 데이터 영역 실행 차단은 DEP/NX의 기능입니다.",
      difficulty: "HARD",
      keywords: ["Stack Canary", "Terminator Canary", "스택 보호"],
    },
  ],
);

const sys0202 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_SYS_02_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_SYS_048",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "사용자 모드(User-mode) 루트킷과 커널 모드(Kernel-mode) 루트킷의 차이 및 탐지·대응 원칙으로 가장 올바른 것은?",
      options: [
        "사용자 모드는 명령 바이너리를, 커널 모드는 시스템 콜·LKM을 변조하므로 외부 매체 점검 후 재설치한다.",
        "사용자 모드는 커널 테이블을, 커널 모드는 `ps`·`ls` 바이너리만 교체하므로 OS 내부에서 삭제한다.",
        "커널 모드 루트킷은 백신의 실시간 시그니처 검사로 즉시 완전 복구되므로 재설치 없이 유지한다.",
        "사용자 모드 루트킷은 감염 서버의 `netstat` 출력은 정상 표시되므로 로컬 점검만으로 충분하다.",
      ],
      answer:
        "사용자 모드는 명령 바이너리를, 커널 모드는 시스템 콜·LKM을 변조하므로 외부 매체 점검 후 재설치한다.",
      explanation:
        "사용자 모드 루트킷은 `ps`, `ls`, `netstat` 같은 명령 바이너리나 공유 라이브러리를 변조하고, 커널 모드 루트킷은 LKM이나 OS 커널 시스템 콜(`getdents`, `read` 등) 자체를 후킹해 프로세스·파일·포트를 은폐합니다. 따라서 감염된 OS 내부 명령 결과를 신뢰할 수 없으며, 외부 신뢰 매체·오프라인 이미지로 점검하고 원칙적으로 포맷 후 클린 재설치해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["루트킷", "커널 모드 루트킷", "사용자 모드 루트킷", "대응 원칙"],
    },
    {
      id: "SEC_CMN_SYS_049",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "호스트 기반 파일 무결성 점검 도구(Tripwire, AIDE 등)를 실무에서 가장 안전하게 운영하기 위한 핵심 원칙으로 올바른 것은?",
      options: [
        "클린 설치 직후 기준 해시 DB를 생성해 읽기 전용 매체나 격리 서버에 보관한다.",
        "침해 의심 파일이 탐지되면 즉시 현재 파일 기준으로 해시 DB를 자동 갱신한다.",
        "성능 향상을 위해 주요 시스템 바이너리의 inode 변경 감시 항목을 제외한다.",
        "기준 해시 DB를 점검 대상 서버의 `/var/tmp`에 저장해 로컬 비교 속도를 높인다.",
      ],
      answer:
        "클린 설치 직후 기준 해시 DB를 생성해 읽기 전용 매체나 격리 서버에 보관한다.",
      explanation:
        "Tripwire·AIDE 같은 무결성 점검 도구는 클린 설치 직후(네트워크 연결 전) 생성한 기준 해시 DB와 현재 파일의 해시·권한·inode 변화를 비교해 위·변조를 탐지합니다. 기준 DB가 같은 서버의 쓰기 가능한 경로에 있으면 공격자가 시스템 파일을 변조한 뒤 기준 DB까지 같이 갱신해 탐지를 회피할 수 있으므로 오프라인·읽기 전용·원격 격리 보관이 핵심입니다.",
      difficulty: "EASY",
      keywords: ["Tripwire", "AIDE", "파일 무결성 점검", "기준 DB"],
    },
    {
      id: "SEC_CMN_SYS_050",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 PAM(Pluggable Authentication Modules)의 4가지 제어 플래그(`required`, `requisite`, `sufficient`, `optional`) 중 `required`와 `requisite`의 차이점으로 올바른 것은?",
      options: [
        "`required`는 실패해도 남은 모듈을 모두 실행한 뒤 거부하고, `requisite`는 실패 즉시 중단한다.",
        "`required`는 실패 즉시 인증을 종료하고, `requisite`는 실패해도 남은 모듈을 끝까지 실행한다.",
        "`required`는 성공 시 즉시 인증을 통과시키고, `requisite`는 이전 실패와 무관하게 허용한다.",
        "`required`는 선택적 보조 모듈로 동작하고, `requisite`는 실패해도 로그만 남기고 통과시킨다.",
      ],
      answer:
        "`required`는 실패해도 남은 모듈을 모두 실행한 뒤 거부하고, `requisite`는 실패 즉시 중단한다.",
      explanation:
        "① `required`: 반드시 성공해야 하며, 실패해도 스택의 남은 모듈을 모두 수행한 뒤 거부(공격자에게 어느 단계에서 실패했는지 힌트를 주지 않음), ② `requisite`: 반드시 성공해야 하며 실패 시 즉시 중단·거부, ③ `sufficient`: 이전 `required` 실패가 없었다면 성공 즉시 인증 통과, ④ `optional`: 단독으로 성패를 결정하지 않음.",
      difficulty: "MEDIUM",
      keywords: ["PAM", "required", "requisite", "sufficient", "제어 플래그"],
    },
    {
      id: "SEC_CMN_SYS_051",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 PAM 모듈 유형 4가지(`auth`, `account`, `password`, `session`) 중, 사용자의 계정 만료 여부·접속 허용 시간대·계정 잠금 상태 등을 확인하는 모듈 유형은?",
      options: [
        "account",
        "auth",
        "password",
        "session",
      ],
      answer: "account",
      explanation:
        "PAM 4대 모듈 유형은 ① `auth`(신원 확인: 패스워드·지문·OTP 검증), ② `account`(계정 유효성 검증: 계정 만료, 허용 시간, 접근 권한 확인), ③ `password`(패스워드 변경 시 복잡도·이력 정책 적용), ④ `session`(로그인 전후 환경 구성: 홈 디렉터리 마운트, 로깅, 자원 한도 설정)으로 구분됩니다.",
      difficulty: "EASY",
      keywords: ["PAM", "auth", "account", "password", "session"],
    },
    {
      id: "SEC_CMN_SYS_052",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "악성코드 유형 중 '바이러스(Virus)', '웜(Worm)', '트로이목마(Trojan Horse)'를 자기 복제 및 숙주 파일 의존 여부로 바르게 구분한 것은?",
      options: [
        "바이러스: 숙주+복제 / 웜: 무숙주+자가복제 / 트로이목마: 정상위장+복제없음",
        "바이러스: 무숙주+복제 / 웜: 숙주+자가복제 / 트로이목마: 정상위장+복제없음",
        "바이러스: 숙주+복제 / 웜: 무숙주+복제없음 / 트로이목마: 숙주+네트워크전파",
        "바이러스: 정상위장+복제없음 / 웜: 숙주+복제 / 트로이목마: 무숙주+자가복제",
      ],
      answer:
        "바이러스: 숙주+복제 / 웜: 무숙주+자가복제 / 트로이목마: 정상위장+복제없음",
      explanation:
        "악성코드 3대 기본 유형 구분은 필수입니다. 바이러스=숙주 파일 필요+자기 복제, 웜=숙주 불필요+네트워크 자가 전파·복제, 트로이목마=정상 SW 위장+자기 복제 없음(사용자 실행 유도). 랜섬웨어는 파일·시스템을 암호화해 금전을 요구하는 악성코드로 웜·트로이목마 등 다양한 전파 수단과 결합됩니다.",
      difficulty: "EASY",
      keywords: ["바이러스", "웜", "트로이목마", "악성코드 분류"],
    },
    {
      id: "SEC_CMN_SYS_053",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "랜섬웨어(Ransomware) 침해사고가 내부 업무 PC와 파일 서버에서 동시 다발적으로 발생했을 때의 올바른 초기 대응 순서와 근본 예방 대책은?",
      options: [
        "감염 단말 네트워크 즉시 격리·확산 차단 + 오프라인·불변(3-2-1) 백업 복구 준비",
        "감염 단말 전원 즉시 강제 차단 후 전사 백업 서버에 복원 이미지 직접 마운트",
        "감염 서버 공유 폴더 유지 상태에서 AV 전체 검사 실행 후 협상용 복호화 키 요청",
        "네트워크 연결은 유지한 채 감염 확장자 파일만 일괄 삭제하고 온라인 백업 덮어쓰기",
      ],
      answer:
        "감염 단말 네트워크 즉시 격리·확산 차단 + 오프라인·불변(3-2-1) 백업 복구 준비",
      explanation:
        "랜섬웨어 징후(확장자 일괄 변조, 랜섬노트 생성, 비정상 대량 파일 I/O)가 발견되면 즉시 네트워크 격리(전원 임의 차단 전 휘발성 메모리·키 확보 검토)로 SMB 등 수평 확산을 막아야 합니다. 백업까지 동시에 암호화되는 사고를 예방하려면 3-2-1 백업 원칙(3개 사본, 2개 이종 매체, 1개 오프라인/불변 격리 보관)과 정기 복구 훈련이 핵심입니다.",
      difficulty: "EASY",
      keywords: ["랜섬웨어", "초기 대응", "네트워크 격리", "3-2-1 백업"],
    },
    {
      id: "SEC_CMN_SYS_054",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "시스템 및 네트워크 포트·서비스 취약점 점검 도구인 `Nmap`의 주요 스캔 옵션과 기능이 바르게 연결된 것은?",
      options: [
        "-sS: TCP SYN 스캔 / -sT: TCP Connect / -sU: UDP / -sV: 버전 / -O: OS 탐지",
        "-sS: TCP Connect / -sT: TCP SYN 스캔 / -sU: OS 탐지 / -sV: UDP / -O: 버전 탐지",
        "-sS: TCP FIN 스캔 / -sT: ICMP 핑 스캔 / -sU: TCP ACK / -sV: OS / -O: 버전 탐지",
        "-sS: TCP Xmas 스캔 / -sT: UDP 스캔 / -sU: TCP SYN / -sV: 방화벽 / -O: 버전 탐지",
      ],
      answer:
        "-sS: TCP SYN 스캔 / -sT: TCP Connect / -sU: UDP / -sV: 버전 / -O: OS 탐지",
      explanation:
        "Nmap에서 `-sS`는 Half-Open(TCP SYN 스텔스) 스캔, `-sT`는 3-Way Handshake를 완료하는 TCP Connect 스캔, `-sU`는 UDP 포트 스캔, `-sV`는 배너·프로브 기반 서비스 버전 탐지, `-O`는 TCP/IP 스택 지문 기반 운영체제(OS) 탐지 옵션입니다.",
      difficulty: "EASY",
      keywords: ["Nmap", "-sS", "-sT", "-sU", "-sV", "-O"],
    },
    {
      id: "SEC_CMN_SYS_055",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 시스템에서 `su` 명령으로 일반 사용자가 root 권한으로 전환하는 것을 허용된 특정 관리자 그룹(`wheel`) 소속 사용자로만 제한하려 한다. 가장 적절한 PAM 설정 모듈은?",
      options: [
        "/etc/pam.d/su — auth required pam_wheel.so use_uid",
        "/etc/pam.d/su — account sufficient pam_faillock.so",
        "/etc/pam.d/sshd — auth requisite pam_nologin.so",
        "/etc/pam.d/sudo — session required pam_limits.so",
      ],
      answer: "/etc/pam.d/su — auth required pam_wheel.so use_uid",
      explanation:
        "`pam_wheel.so` 모듈을 `/etc/pam.d/su`에 `auth required pam_wheel.so use_uid`로 설정하면 `wheel` 그룹에 속한 인가 관리자만 `su` 명령으로 root 전환을 시도할 수 있습니다. `pam_faillock.so`는 로그인 실패 잠금, `pam_nologin.so`는 `/etc/nologin` 존재 시 로그인 차단, `pam_limits.so`는 자원 한도 적용 모듈입니다.",
      difficulty: "MEDIUM",
      keywords: ["PAM", "pam_wheel.so", "wheel 그룹", "su 제한"],
    },
    {
      id: "SEC_CMN_SYS_056",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 서버에 대한 무차별 대입(Brute-Force) 로그인 공격을 방어하기 위해 연속 인증 실패 시 계정을 일정 시간 자동 잠그도록 PAM에 설정하는 최신 모듈(구 `pam_tally2` 대체)은?",
      options: [
        "pam_faillock.so",
        "pam_wheel.so",
        "pam_nologin.so",
        "pam_mkhomedir.so",
      ],
      answer: "pam_faillock.so",
      explanation:
        "최신 리눅스(RHEL 8/9, Ubuntu 등)에서는 기존 `pam_tally2.so` 대신 `pam_faillock.so`를 사용해 지정 횟수(예: `deny=5`) 이상 로그인 실패 시 일정 시간(`unlock_time`) 계정을 자동 잠급니다. `pam_wheel.so`는 su 허용 그룹 제한, `pam_nologin.so`는 `/etc/nologin` 존재 시 일반 사용자 로그인 차단, `pam_mkhomedir.so`는 최초 로그인 시 홈 디렉터리 자동 생성 모듈입니다.",
      difficulty: "MEDIUM",
      keywords: ["PAM", "pam_faillock.so", "계정 잠금 임계값"],
    },
    {
      id: "SEC_CMN_SYS_057",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "악성코드 분석 기법 중 '정적 분석(Static Analysis)'과 '동적 분석(Dynamic Analysis)'의 특징을 바르게 비교한 것은?",
      options: [
        "정적은 미실행 분석으로 패킹에 취약하고, 동적은 격리 실행으로 안티-VM에 우회된다.",
        "정적은 격리 실행으로 C&C 행위를 탐지하고, 동적은 미실행 디스어셈블로만 점검한다.",
        "정적은 패킹·난독화 시 항상 원본 코드가 복원되고, 동적은 안티-디버깅 영향을 안 받는다.",
        "정적은 실제 운영 서버에서 직접 실행해 분석하고, 동적은 해시·문자열만 추출해 판단한다.",
      ],
      answer:
        "정적은 미실행 분석으로 패킹에 취약하고, 동적은 격리 실행으로 안티-VM에 우회된다.",
      explanation:
        "정적 분석(해시, `strings`, PE 헤더, IDA/Ghidra)은 실행 위험이 없지만 패킹·암호화·난독화된 샘플 분석에 제약이 있습니다. 동적 분석(Process Monitor, Wireshark, 샌드박스)은 격리 환경에서 실제 런타임 행위(C&C 통신, 드롭 파일, 지속성 등록)를 확인하기 좋지만 가상환경(VM/샌드박스) 탐지 시 행위를 멈추는 회피 기법에 유의해야 합니다.",
      difficulty: "EASY",
      keywords: ["정적 분석", "동적 분석", "악성코드 분석", "패킹", "샌드박스"],
    },
    {
      id: "SEC_CMN_SYS_058",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "디스크에 악성 실행 파일(`.exe`, ELF)을 저장하지 않고, PowerShell·WMI 같은 정상 내장 관리 도구나 메모리 인젝션을 이용해 메모리(RAM) 상에서만 동작함으로써 전통적 파일 시그니처 기반 백신 탐지를 회피하는 공격 기법은?",
      options: [
        "파일리스 악성코드 및 LotL 기법",
        "다형성 파일 감염형 바이러스",
        "부트 섹터 바이러스 및 MBR 변조",
        "매크로 기반 문서 드로퍼 악성코드",
      ],
      answer: "파일리스 악성코드 및 LotL 기법",
      explanation:
        "파일리스(Fileless) 악성코드는 디스크에 바이너리를 남기지 않고 메모리와 레지스트리, OS 기본 도구(PowerShell, certutil, WMI 등 — LotL, Living off the Land)를 악용해 시그니처 기반 AV를 우회합니다. 대응을 위해 행위 기반 탐지(EDR), PowerShell 스크립트 블록 로깅·제약 언어 모드, 메모리 포렌식이 필요합니다.",
      difficulty: "MEDIUM",
      keywords: ["파일리스 악성코드", "LotL", "EDR", "PowerShell"],
    },
    {
      id: "SEC_CMN_SYS_059",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 시스템에서 커널 수준의 강제적 접근통제(MAC)를 구현하여 웹 서버 프로세스(`httpd`)가 침해되더라도 인가된 컨텍스트(`/var/www/html`) 외의 시스템 파일(`/etc/shadow` 등)에 접근하지 못하도록 차단하는 리눅스 보안 모듈(LSM) 프레임워크는?",
      options: [
        "SELinux / AppArmor",
        "PAM / sudoers",
        "Netfilter / iptables",
        "AIDE / Tripwire",
      ],
      answer: "SELinux / AppArmor",
      explanation:
        "SELinux(보안 레이블/컨텍스트 기반, RHEL 계열 기본)와 AppArmor(파일 경로 프로파일 기반, Ubuntu/SUSE 계열 기본)는 리눅스 커널 LSM 기반의 강제적 접근통제(MAC) 메커니즘입니다. 서비스 데몬이 취약점으로 탈취되더라도 허용된 정책 범위를 벗어난 파일·포트 접근을 커널이 차단하여 피해를 격리합니다.",
      difficulty: "MEDIUM",
      keywords: ["SELinux", "AppArmor", "LSM", "MAC"],
    },
    {
      id: "SEC_CMN_SYS_060",
      category: "악성코드·루트킷 및 인증 프레임워크",
      question:
        "리눅스 서버에 침입한 공격자가 시스템 재부팅 이후에도 악성 백도어가 자동 재실행되도록 지속성(Persistence)을 유지할 때 흔히 악용하며, 침해사고 점검 시 우선 확인해야 하는 경로·설정이 아닌 것은?",
      options: [
        "/dev/null (쓰여진 데이터를 즉시 폐기하는 특수 장치 파일)",
        "/etc/crontab 및 /var/spool/cron/ (예약 작업 스케줄러)",
        "/etc/systemd/system/ 및 /etc/rc.local (부팅 시 자동 실행 서비스)",
        "~/.ssh/authorized_keys (무비밀번호 원격 SSH 공개키 등록 파일)",
      ],
      answer: "/dev/null (쓰여진 데이터를 즉시 폐기하는 특수 장치 파일)",
      explanation:
        "리눅스 지속성(Persistence) 점검 핵심 위치는 cron 예약 작업, systemd 유닛/init 스크립트, `~/.ssh/authorized_keys`, `/etc/ld.so.preload`, 셸 초기화 파일(`~/.bashrc`, `/etc/profile`) 등입니다. `/dev/null`은 출력 데이터를 버리는 블랙홀 장치 파일로 백도어 저장·자동 실행 경로가 아닙니다.",
      difficulty: "EASY",
      keywords: ["지속성 점검", "crontab", "systemd", "authorized_keys"],
    },
  ],
);

export const SECURITY_COMMON_SYS_QUESTIONS: Question[] = [
  ...sys0101,
  ...sys0102,
  ...sys0201,
  ...sys0202,
];
