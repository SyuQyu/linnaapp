import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
// import { ScreenWidth } from "@freakycoder/react-native-helpers";
import type { ExtendedTheme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  centeredView: ViewStyle;
  modalView: TextStyle;
  button: TextStyle;
  buttonClose: TextStyle;
  textStyle: TextStyle;
  modalText: TextStyle;
  buttonContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    centeredView: {
      width: "auto",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    modalView: {
      width: ScreenWidth * 0.9,
      height: "auto",
      backgroundColor: colors.dynamicBackground,
      borderRadius: 10,
      padding: 24,
      marginTop: ScreenHeight * 0.3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      width: 120,
      elevation: 2,
      marginHorizontal: 10,
    },
    buttonClose: {
      textAlign: "right",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
  });
};
