import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
interface Style {
  appContainer: ViewStyle;
  container: ViewStyle;
  inputWrap: ViewStyle;
  icon: TextStyle;
  input: TextStyle;
  resultsWrap: ViewStyle;
  listItem: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    appContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      marginTop: 20,
      width: "90%",
      alignItems: "center",
    },
    inputWrap: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    icon: {
      fontSize: 20,
      marginRight: 5,
    },
    input: {
      flex: 1,
      height: 40,
      color: colors.text,
    },
    resultsWrap: {
      width: "100%",
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
  });
};
