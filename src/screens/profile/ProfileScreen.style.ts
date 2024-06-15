import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";
interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonUpdateData: ViewStyle;
  listContainer: ViewStyle;
  dataContainer: ViewStyle;
  headerContainer: ViewStyle;
  headerImages: ViewStyle;
  profilePicImageStyle: ImageStyle;
  headerText: ViewStyle;
  containerDataUser: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  buttonTextUpdateData: TextStyle;
  pickerBorder: ViewStyle;
  activityIndicator: ViewStyle;
  updateButton: ViewStyle;
  buttonBack: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    dataContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 10,
      width: "100%",
      height: "auto",
    },
    listContainer: {
      height: ScreenHeight * 0.7,
      marginTop: 8,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    buttonBack: {
      width: "100%",
      justifyContent: "flex-start",
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 24,
    },
    containerDataUser: {
      marginTop: 16,
      width: ScreenWidth * 0.9,
      flexDirection: "column",
    },
    headerContainer: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerImages: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    headerText: {
      flexDirection: "column",
      marginLeft: 10,
      justifyContent: "space-between",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    buttonUpdateData: {
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
    buttonTextUpdateData: {
      color: "white",
      fontWeight: "700",
    },
    pickerBorder: {
      borderWidth: 1,
      width: "100%",
      borderRadius: 5,
      borderColor: "gray",
      marginBottom: 10,
    },
    activityIndicator: {
      alignItems: "center",
      height: 80,
    },
    updateButton: {
      marginRight: 23,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  });
};
