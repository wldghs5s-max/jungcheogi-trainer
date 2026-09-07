import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Home, BookX, BarChart3, Settings } from "lucide-react-native";
import { useSettingsStore } from "../../store/settingsStore";
import { triggerHaptic } from "../../utils/haptics";
import { COLORS } from "../../utils/theme";

export type TabType = "home" | "wrong_note" | "statistics" | "settings";

interface BottomTabBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const handleTabPress = (tab: TabType) => {
    if (currentTab !== tab) {
      triggerHaptic.selection();
      onTabChange(tab);
    }
  };

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: "home", label: "홈", icon: Home },
    { key: "wrong_note", label: "오답노트", icon: BookX },
    { key: "statistics", label: "통계", icon: BarChart3 },
    { key: "settings", label: "설정", icon: Settings },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderTopColor: theme.border },
      ]}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.key;
        const color = isActive ? theme.primary : theme.mutedText;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab.key)}
            style={styles.tabButton}
          >
            <Icon size={22} color={color} strokeWidth={isActive ? 2.5 : 2} />
            <Text
              style={[
                styles.tabLabel,
                {
                  color,
                  fontWeight: isActive ? "700" : "500",
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? 84 : 102,
    paddingBottom: Platform.OS === "ios" ? 24 : 44,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
});
