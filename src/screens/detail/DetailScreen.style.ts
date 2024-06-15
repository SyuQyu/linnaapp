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
  containerAbsence: ViewStyle;
  headerContainer: ViewStyle;
  headerImages: ViewStyle;
  profilePicImageStyle: ImageStyle;
  headerText: ViewStyle;
  containerDataUser: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  buttonTextUpdateData: TextStyle;
  modalBoxContainer: ViewStyle;
  pickerBorder: ViewStyle;
  activityIndicator: ViewStyle;
  upperButton: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dataContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 10,
      height: "auto",
    },
    listContainer: {
      height: ScreenHeight * 0.7,
      marginTop: 8,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    containerAbsence: {},
    buttonStyle: {
      width: ScreenWidth * 0.85,
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    containerDataUser: {
      marginTop: 16,
      width: ScreenWidth * 0.9,
      flexDirection: "column",
    },
    headerContainer: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      marginTop: 16,
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
    modalBoxContainer: {
      flex: 1,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
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
    upperButton: {
      marginLeft: 28,
      marginTop: 40,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
  });
};
