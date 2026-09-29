import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AppState,
  Alert,
} from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { Moon, ShieldCheck, Clock, X } from "lucide-react-native";

export interface NightModeOverlayProps {
  visible: boolean;
  targetCount: number;
  savedCount: number;
  isRunning: boolean;
  statusMessage?: string;
  onDismiss: () => void;
  onCancelGeneration?: () => void;
}

const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 3시간 하드 리밋
const PIXEL_SHIFT_INTERVAL_MS = 30000; // 30초마다 픽셀 시프트

export const NightModeOverlay: React.FC<NightModeOverlayProps> = ({
  visible,
  targetCount,
  savedCount,
  isRunning,
  statusMessage,
  onDismiss,
  onCancelGeneration,
}) => {
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const keepAwakeTag = "jungcheogi-night-mode";

  useEffect(() => {
    if (!visible) {
      void deactivateKeepAwake(keepAwakeTag);
      return;
    }

    // 1. 화면 켜짐 유지 활성화
    startTimeRef.current = Date.now();
    setElapsedMinutes(0);
    void activateKeepAwakeAsync(keepAwakeTag).catch((err) => {
      console.warn("[NightMode] activateKeepAwakeAsync error:", err);
    });

    // 2. 번인 방지 픽셀 시프트 타이머 (30초 주기 ±15px 미세 이동)
    const shiftTimer = setInterval(() => {
      const randomX = Math.floor(Math.random() * 31) - 15; // -15px ~ +15px
      const randomY = Math.floor(Math.random() * 31) - 15;
      setShiftX(randomX);
      setShiftY(randomY);

      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
      setElapsedMinutes(elapsed);
    }, PIXEL_SHIFT_INTERVAL_MS);

    // 3. 3시간 하드 리밋 자동 종료 안전 타이머 (OLED 및 배터리 수명 보호)
    const watchdogTimer = setTimeout(() => {
      void deactivateKeepAwake(keepAwakeTag);
      onDismiss();
      Alert.alert(
        "야간 모드 자동 종료",
        "기기 및 배터리 보호를 위한 3시간 제한에 도달하여 화면 켜짐 유지가 안전하게 해제되었습니다.",
      );
    }, THREE_HOURS_MS);

    return () => {
      clearInterval(shiftTimer);
      clearTimeout(watchdogTimer);
      void deactivateKeepAwake(keepAwakeTag);
    };
  }, [visible, onDismiss]);

  // 작업이 완료되었을 때 KeepAwake 해제
  useEffect(() => {
    if (visible && !isRunning && savedCount >= targetCount && targetCount > 0) {
      void deactivateKeepAwake(keepAwakeTag);
    }
  }, [visible, isRunning, savedCount, targetCount]);

  if (!visible) return null;

  const isCompleted = !isRunning && savedCount >= targetCount && targetCount > 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onDismiss}
      style={styles.fullScreenContainer}
    >
      <StatusBar hidden backgroundColor="#000000" barStyle="light-content" />

      {/* OLED 번인 방지 픽셀 시프트 컨테이너 */}
      <View
        style={[
          styles.contentWrapper,
          { transform: [{ translateX: shiftX }, { translateY: shiftY }] },
        ]}
      >
        <View style={styles.iconRow}>
          <Moon size={20} color="#444444" />
          <Text style={styles.modeTitle}>야간 무중단 번인 방지 모드</Text>
        </View>

        <Text style={styles.countText}>
          {savedCount} / {targetCount} 문항
        </Text>

        <Text style={styles.statusSubText}>
          {isCompleted
            ? "생성이 완료되었습니다!"
            : isRunning
              ? statusMessage || "문제 생성 및 저장 진행 중..."
              : "일시정지 중"}
        </Text>

        <View style={styles.safetyInfoBox}>
          <View style={styles.safetyItem}>
            <ShieldCheck size={12} color="#333333" />
            <Text style={styles.safetyLabel}>OLED 완전 소등 블랙(#000000)</Text>
          </View>
          <View style={styles.safetyItem}>
            <Clock size={12} color="#333333" />
            <Text style={styles.safetyLabel}>
              경과 {elapsedMinutes}분 / 최대 3시간 하드 리밋
            </Text>
          </View>
        </View>

        <Text style={styles.touchHint}>화면 아무 곳이나 터치하면 일반 화면으로 돌아갑니다</Text>

        {onCancelGeneration && isRunning && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={(e) => {
              e.stopPropagation();
              onCancelGeneration();
            }}
          >
            <X size={14} color="#555555" />
            <Text style={styles.cancelText}>생성 중단하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000", // OLED True Black (전력 0 소모)
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999,
  },
  contentWrapper: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  modeTitle: {
    fontSize: 13,
    color: "#444444",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  countText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#555555",
    marginBottom: 8,
    fontVariant: ["tabular-nums"],
  },
  statusSubText: {
    fontSize: 13,
    color: "#3a3a3a",
    marginBottom: 24,
    textAlign: "center",
  },
  safetyInfoBox: {
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
    paddingTop: 16,
    marginBottom: 24,
    gap: 6,
    alignItems: "center",
  },
  safetyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  safetyLabel: {
    fontSize: 11,
    color: "#333333",
  },
  touchHint: {
    fontSize: 12,
    color: "#2f2f2f",
    marginTop: 8,
    textAlign: "center",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222222",
  },
  cancelText: {
    fontSize: 12,
    color: "#555555",
  },
});
