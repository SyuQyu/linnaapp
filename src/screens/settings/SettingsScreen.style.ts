import type { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  buttonLogout: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      marginTop: 42,
      justifyContent: "flex-start",
    },
    buttonLogout: {
      height: 45,
      width: ScreenWidth * 0.9,
      marginTop: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
  });
};
