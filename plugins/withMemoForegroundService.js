const {
  withAndroidManifest,
  withAppBuildGradle,
  AndroidConfig,
} = require("expo/config-plugins");

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

function ensureReleaseSigningConfig(buildGradle) {
  let updated = buildGradle;

  if (!updated.includes("MYAPP_UPLOAD_STORE_FILE")) {
    const debugSigningBlock = `    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }`;
    const releaseSigningBlock = `    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            def uploadStoreFile = findProperty('MYAPP_UPLOAD_STORE_FILE') ?: System.getenv('ANDROID_KEYSTORE_FILE')
            def uploadStorePassword = findProperty('MYAPP_UPLOAD_STORE_PASSWORD') ?: System.getenv('ANDROID_KEYSTORE_PASSWORD')
            def uploadKeyAlias = findProperty('MYAPP_UPLOAD_KEY_ALIAS') ?: System.getenv('ANDROID_KEY_ALIAS')
            def uploadKeyPassword = findProperty('MYAPP_UPLOAD_KEY_PASSWORD') ?: System.getenv('ANDROID_KEY_PASSWORD')
            if (uploadStoreFile) {
                storeFile file(uploadStoreFile)
                storePassword uploadStorePassword
                keyAlias uploadKeyAlias
                keyPassword uploadKeyPassword
            }
        }
    }`;
    if (updated.includes(debugSigningBlock)) {
      updated = updated.replace(debugSigningBlock, releaseSigningBlock);
    }
  }

  const releaseBuildTypeDebugSign = `        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug`;
  const releaseBuildTypeProperSign = `        release {
            // Use persistent release signingConfig when provided, falling back to debug only for local unsigned checks.
            signingConfig (signingConfigs.release.storeFile != null ? signingConfigs.release : signingConfigs.debug)`;

  if (updated.includes(releaseBuildTypeDebugSign)) {
    updated = updated.replace(
      releaseBuildTypeDebugSign,
      releaseBuildTypeProperSign,
    );
  }

  return updated;
}

module.exports = function withMemoForegroundService(config) {
  config = withAndroidManifest(config, (modConfig) => {
    PERMISSIONS.forEach((permission) =>
      ensurePermission(modConfig.modResults, permission),
    );
    ensureForegroundService(modConfig.modResults);
    return modConfig;
  });

  config = withAppBuildGradle(config, (modConfig) => {
    if (modConfig.modResults.language === "groovy") {
      modConfig.modResults.contents = ensureReleaseSigningConfig(
        modConfig.modResults.contents,
      );
    }
    return modConfig;
  });

  return config;
};
