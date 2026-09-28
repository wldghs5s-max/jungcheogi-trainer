const { withAndroidManifest, AndroidConfig } = require("expo/config-plugins");

const PERMISSIONS = [
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_DATA_SYNC",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.WAKE_LOCK",
];

const SERVICE_NAMES = [
  "com.asterinet.react.bgactions.RNBackgroundActionsTask",
  ".RNBackgroundActionsTask",
];

function ensurePermission(androidManifest, permission) {
  const uses = androidManifest.manifest["uses-permission"] || [];
  const exists = uses.some((item) => item.$?.["android:name"] === permission);
  if (!exists) {
    uses.push({ $: { "android:name": permission } });
  }
  androidManifest.manifest["uses-permission"] = uses;
}

function ensureForegroundService(androidManifest) {
  const application =
    AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  application.service = application.service || [];
  let service = application.service.find((item) =>
    SERVICE_NAMES.includes(item.$?.["android:name"]),
  );
  if (!service) {
    service = {
      $: {
        "android:name": SERVICE_NAMES[0],
      },
    };
    application.service.push(service);
  }
  service.$["android:foregroundServiceType"] = "dataSync";
  service.$["android:exported"] = "false";
}

module.exports = function withMemoForegroundService(config) {
  return withAndroidManifest(config, (config) => {
    PERMISSIONS.forEach((permission) =>
      ensurePermission(config.modResults, permission),
    );
    ensureForegroundService(config.modResults);
    return config;
  });
};
