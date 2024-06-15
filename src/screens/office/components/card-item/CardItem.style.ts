import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
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
  buttonModal: ViewStyle;
  buttonContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: ScreenWidth * 0.9,
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    buttonContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    descriptionTextStyle: {
      marginTop: 8,
    },
    buttonModal: {},
    contentContainer: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
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
      marginLeft: 8,
    },
    forkContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
