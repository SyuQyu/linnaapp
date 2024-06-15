import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  header: ViewStyle;
  contentContainer: ViewStyle;
  listContainer: ViewStyle;
  profilePicImageStyle: ImageStyle;
  searchContainer: ViewStyle;
  headContent: ViewStyle;
  input: TextStyle;
  buttonBack: ViewStyle;
  // form
  containerForm: ViewStyle;
  activityIndicator: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    headContent: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttonBack: {
      width: "100%",
      justifyContent: "flex-start",
      marginTop: 16,
      marginLeft: 24,
    },
    searchContainer: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
    },
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
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      justifyContent: "space-between",
    },
    contentContainer: {
      flex: 1,
    },
    listContainer: {
      height: ScreenHeight * 0.7,
      marginTop: 8,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    // form
    containerForm: {
      width: "100%",
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
      gap: 4,
    },
    buttonStyleForm: {
      height: 45,
      width: "100%",
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
    activityIndicator: {
      alignItems: "center",
      height: 80,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    pickerBorder: {
      borderWidth: 1,
      width: "100%",
      borderRadius: 5,
      borderColor: "gray",
      marginBottom: 10,
    },
  });
};
