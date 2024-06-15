import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import createStyles from "./SearchBar.style";

export default function SearchBar({
  children,
  searchVal,
  handleInput,
  handleClearBtn,
}: any) {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // const [searchVal, setSearchVal] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <Icon
          name={"search"}
          type={IconType.FontAwesome}
          style={styles.icon}
          color={colors.text}
        />
        <TextInput
          onChangeText={handleInput}
          value={searchVal}
          style={styles.input}
          placeholder="Search Data"
        />
        <TouchableOpacity onPress={handleClearBtn}>
          <Icon
            name={"remove"}
            type={IconType.FontAwesome}
            style={styles.icon}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}
