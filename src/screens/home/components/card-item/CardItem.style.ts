import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { ExtendedTheme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  descriptionTextStyle: TextStyle;
  contentContainer: ViewStyle;
  languageContainer: ViewStyle;
  languageColorStyle: ViewStyle;
  starContainer: ViewStyle;
  valueTextStyle: TextStyle;
  forkContainer: ViewStyle;
  containerHead: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      borderWidth: 1,
      borderRadius: 8,
      width: "48%",
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    containerHead: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      justifyContent: "flex-start",
    },
    descriptionTextStyle: {
      marginTop: 14,
      color: colors.text,
      fontWeight: "700",
    },
    contentContainer: {
      marginTop: 14,
      flexDirection: "row",
    },
    languageContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    languageColorStyle: {
      width: 15,
      height: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.borderColor,
      backgroundColor: colors.calpyse,
    },
    starContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    valueTextStyle: {
      fontWeight: "700",
    },
    forkContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
  });
};