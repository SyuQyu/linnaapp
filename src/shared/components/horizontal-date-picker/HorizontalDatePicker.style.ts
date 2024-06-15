import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle, Dimensions } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
interface Style {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  picker: ViewStyle;
  subtitle: TextStyle;
  footer: ViewStyle;
  item: ViewStyle;
  itemRow: ViewStyle;
  itemWeekday: TextStyle;
  itemDate: TextStyle;
  placeholder: ViewStyle;
  placeholderInset: ViewStyle;
  btn: ViewStyle;
  btnText: TextStyle;
}

const { width } = Dimensions.get("window");

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      width: ScreenWidth,
      marginTop: 5,
    },
    header: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: "#1d1d1d",
      marginBottom: 12,
    },
    picker: {
      flex: 1,
      maxHeight: 74,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    subtitle: {
      fontSize: 17,
      fontWeight: "600",
      color: "#999999",
      marginBottom: 12,
    },
    footer: {
      marginTop: "auto",
      paddingHorizontal: 16,
    },
    /** Item */
    item: {
      flex: 1,
      height: 50,
      marginHorizontal: 4,
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#e3e3e3",
      flexDirection: "column",
      alignItems: "center",
    },
    itemRow: {
      width: width,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: 12,
    },
    itemWeekday: {
      fontSize: 13,
      fontWeight: "500",
      color: "#737373",
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 15,
      fontWeight: "600",
      color: "#111",
    },
    /** Placeholder */
    placeholder: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      height: 400,
      marginTop: 0,
      padding: 0,
      backgroundColor: "transparent",
    },
    placeholderInset: {
      borderWidth: 4,
      borderColor: "#e5e7eb",
      borderStyle: "dashed",
      borderRadius: 9,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    /** Button */
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      backgroundColor: "#007aff",
      borderColor: "#007aff",
    },
    btnText: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: "600",
      color: colors.white,
    },
  });
};
