import React, { useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import createStyles from "./CardItem.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  name?: string;
  onPress: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, name, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderHeader = () => (
    <>
      <Text h4 bold color={colors.text}>
        {name}
      </Text>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      {renderHeader()}
    </RNBounceable>
  );
};

export default CardItem;
