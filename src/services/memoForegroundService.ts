import { PermissionsAndroid, Platform } from "react-native";
import BackgroundService from "react-native-background-actions";

type ForegroundProgress = {
  savedCount: number;
  targetCount: number;
  queuedCount?: number;
};

const TASK_NAME = "jungcheogi-memo-generate";

async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return true;
  if (typeof Platform.Version === "number" && Platform.Version < 33) {
    return true;
  }
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
}

function notificationOptions(progress: ForegroundProgress | null) {
  const saved = progress?.savedCount ?? 0;
  const target = progress?.targetCount ?? 0;
  const queued = progress?.queuedCount ?? 0;
  const queueLabel = queued > 0 ? ` · 다음에 ${queued}개` : "";
  return {
    taskName: TASK_NAME,
    taskTitle: "암기 문제 생성 중",
    taskDesc:
      target > 0
        ? `${saved}/${target}문제 저장됨${queueLabel} · 화면을 꺼도 계속 만듭니다`
        : "빈 챕터 암기 문제를 만들고 있습니다",
    taskIcon: {
      name: "ic_launcher",
      type: "mipmap",
    },
    color: "#4F46E5",
    progressBar:
      target > 0
        ? {
            max: target,
            value: Math.min(saved, target),
            indeterminate: saved === 0,
          }
        : { max: 1, value: 0, indeterminate: true },
    foregroundServiceType: ["dataSync" as const],
  };
}

export async function startMemoForegroundService(
  runJob: () => Promise<void>,
  progress: ForegroundProgress | null,
): Promise<boolean> {
  if (Platform.OS !== "android") return false;
  const allowed = await requestNotificationPermission();
  if (!allowed) return false;
  try {
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
    }
    await BackgroundService.start(async () => {
      await runJob();
    }, notificationOptions(progress));
    return true;
  } catch (error) {
    console.warn("[memoForegroundService] start failed:", error);
    return false;
  }
}

export async function updateMemoForegroundNotification(
  progress: ForegroundProgress | null,
): Promise<void> {
  if (Platform.OS !== "android" || !BackgroundService.isRunning()) return;
  try {
    await BackgroundService.updateNotification(notificationOptions(progress));
  } catch (error) {
    console.warn("[memoForegroundService] update failed:", error);
  }
}

export async function stopMemoForegroundService(): Promise<void> {
  if (Platform.OS !== "android") return;
  try {
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
    }
  } catch (error) {
    console.warn("[memoForegroundService] stop failed:", error);
  }
}
