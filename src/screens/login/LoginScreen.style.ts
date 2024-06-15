import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  header: TextStyle;
  input: ViewStyle;
  errorInput: ViewStyle;
  error: TextStyle;
  forgotPassword: ViewStyle;
  label: TextStyle;
  link: TextStyle;
  row: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  activityIndicator: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      marginRight: 16,
      marginLeft: 16,
      backgroundColor: colors.background,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.primary,
    },
    input: {
      height: 40,
      width: "100%",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    errorInput: {
      borderColor: "red",
    },
    error: {
      color: "red",
      marginBottom: 30,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: 20,
    },
    label: {
      color: "blue", // Set your label color here
    },
    link: {
      color: "blue", // Set your link color here
    },
    row: {
      flexDirection: "row",
      marginTop: 20,
    },
    buttonStyle: {
      height: 45,
      width: "90%",
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
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    activityIndicator: {
      alignItems: "center",
      height: 80,
    },
  });
};
