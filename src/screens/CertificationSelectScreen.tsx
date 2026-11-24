import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Code2,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react-native";
import { CertificationType } from "../types/question";
import { useSettingsStore } from "../store/settingsStore";
import { COLORS } from "../utils/theme";
import { Card } from "../components/common/Card";
import { triggerHaptic } from "../utils/haptics";

interface CertificationSelectScreenProps {
  onSelect: (certification: CertificationType) => void;
}

export const CertificationSelectScreen: React.FC<
  CertificationSelectScreenProps
> = ({ onSelect }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const handleSelect = (cert: CertificationType) => {
    triggerHaptic.selection();
    onSelect(cert);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 안내 헤더 */}
        <View style={styles.headerBlock}>
          <View
            style={[
              styles.badgePill,
              { backgroundColor: theme.primaryLight },
            ]}
          >
            <Sparkles size={14} color={theme.primary} />
            <Text style={[styles.badgePillText, { color: theme.primary }]}>
              출퇴근 지하철 10분 합격 트레이너
            </Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            학습할 자격증을 선택하세요
          </Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            선택한 자격증에 맞춰 학습 화면, 진도, 오답노트가 구분됩니다.{"\n"}
            언제든 홈 상단이나 설정에서 자격증을 전환할 수 있습니다.
          </Text>
        </View>

        {/* 1. 정보처리기사 선택 카드 */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handleSelect("JUNGCHEOGI")}
        >
          <Card
            style={[
              styles.certCard,
              {
                borderColor: theme.primary,
                borderWidth: 1.5,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme.primaryLight },
                ]}
              >
                <Code2 size={28} color={theme.primary} />
              </View>
              <View style={styles.cardTitleWrap}>
                <View style={styles.tagRow}>
                  <View
                    style={[
                      styles.modeTag,
                      { backgroundColor: theme.primary },
                    ]}
                  >
                    <Text style={styles.modeTagText}>실기 · 주관식/코드</Text>
                  </View>
                </View>
                <Text style={[styles.certName, { color: theme.text }]}>
                  정보처리기사
                </Text>
              </View>
              <ChevronRight size={24} color={theme.primary} />
            </View>

            <Text style={[styles.certDesc, { color: theme.subText }]}>
              단답형·주관식 이론, C/Java/Python 코드 실행 결과 추적, SQL 실무 및
              1초 두음 암기장으로 실기 시험을 완벽 대비합니다.
            </Text>

            <View
              style={[
                styles.subjectBox,
                { backgroundColor: theme.surfaceSecondary },
              ]}
            >
              <Text style={[styles.subjectLabel, { color: theme.mutedText }]}>
                주요 학습 구성
              </Text>
              <Text style={[styles.subjectListText, { color: theme.text }]}>
                소프트웨어설계 · 데이터베이스구축 · 프로그래밍언어활용 ·
                정보시스템구축관리 · 신기술/보안
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* 2. 정보보안기사 선택 카드 */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handleSelect("SECURITY")}
        >
          <Card
            style={[
              styles.certCard,
              {
                borderColor: "#059669",
                borderWidth: 1.5,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: isDarkMode ? "#132E27" : "#D1FAE5",
                  },
                ]}
              >
                <ShieldCheck size={28} color="#059669" />
              </View>
              <View style={styles.cardTitleWrap}>
                <View style={styles.tagRow}>
                  <View
                    style={[
                      styles.modeTag,
                      { backgroundColor: "#059669" },
                    ]}
                  >
                    <Text style={styles.modeTagText}>
                      필기 · 이론/객관식/암기
                    </Text>
                  </View>
                </View>
                <Text style={[styles.certName, { color: theme.text }]}>
                  정보보안기사
                </Text>
              </View>
              <ChevronRight size={24} color="#059669" />
            </View>

            <Text style={[styles.certDesc, { color: theme.subText }]}>
              핵심 이론 요약, 4지선다 객관식 문제 풀이 및 즉시 채점·해설, 출퇴근길
              카드 한 장에 개념 하나를 보는 필수 암기 카드로 학습합니다.
            </Text>

            <View
              style={[
                styles.subjectBox,
                { backgroundColor: theme.surfaceSecondary },
              ]}
            >
              <Text style={[styles.subjectLabel, { color: theme.mutedText }]}>
                주요 학습 구성
              </Text>
              <Text style={[styles.subjectListText, { color: theme.text }]}>
                시스템 보안 · 네트워크 보안 · 애플리케이션 보안 · 정보보안 일반
                · 정보보안 관리 및 법규
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* 하단 기록 보존 안내 */}
        <View
          style={[
            styles.noticeBox,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <CheckCircle2 size={18} color={theme.correct} />
          <Text style={[styles.noticeText, { color: theme.subText }]}>
            기존에 학습하던 정보처리기사 풀이 기록, 오답노트, 북마크는 그대로
            안전하게 보존됩니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },
  headerBlock: {
    marginBottom: 22,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 10,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  certCard: {
    padding: 18,
    marginBottom: 16,
    borderRadius: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardTitleWrap: {
    flex: 1,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  modeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  modeTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  certName: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  certDesc: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 14,
  },
  subjectBox: {
    padding: 12,
    borderRadius: 10,
  },
  subjectLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
  },
  subjectListText: {
    fontSize: 12.5,
    fontWeight: "600",
    lineHeight: 18,
  },
  noticeBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  noticeText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    marginLeft: 10,
    fontWeight: "500",
  },
});
