import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  headerText: ViewStyle;
  contentContainer: ViewStyle;
  dataContainer: ViewStyle;
  listContainer: ViewStyle;
  profilePicImageStyle: ImageStyle;
  headerContainer: ViewStyle;
  headerImages: ViewStyle;
  buttonAbsence: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      height: 45,
      width: ScreenWidth * 0.9,
      marginTop: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    headerContainer: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      marginTop: 16,
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerText: {
      width: ScreenWidth * 0.9,
      flexDirection: "column",
      marginLeft: 10,
      justifyContent: "space-between",
    },
    headerImages: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      flex: 1,
      marginTop: 16,
    },
    dataContainer: {
      marginTop: 12,
      gap: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    listContainer: {
      marginTop: 8,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    buttonAbsence: {
      height: 45,
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
