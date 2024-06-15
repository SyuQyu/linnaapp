import React, { useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import createStyles from "./CardItem.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data?: {
    name?: string;
    description?: string;
    time?: string;
    icon?: string;
  };
  onPress?: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const description = () => (
    <View style={styles.languageContainer}>
      <Text style={styles.valueTextStyle}>{data?.description}</Text>
    </View>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.containerHead}>
        <Icon
          name={data?.icon ? data?.icon : "login"}
          type={IconType.Entypo}
          color={colors.text}
        />
        <Text h4 bold color={colors.text}>
          {data?.name}
        </Text>
      </View>
      <Text h2 color={colors.text} style={styles.descriptionTextStyle}>
        {data?.time}
      </Text>
      <View style={styles.contentContainer}>{description()}</View>
    </RNBounceable>
  );
};

export default CardItem;
