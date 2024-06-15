import React, { useMemo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import createStyles from "./CardItem.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data?: {
    id?: number;
    name?: string;
    place?: string;
  };
  onPress?: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderHeader = () => (
    <>
      {/* <Text h4 bold color={colors.text}>
        {data?.name}
      </Text> */}
      {/* <Text h5 color={colors.placeholder} style={styles.descriptionTextStyle}>
        {data?.place}
      </Text> */}
      <View style={styles.containerHead}>
        <Icon
          style={{
            fontSize: 15,
          }}
          name={"calendar"}
          type={IconType.Entypo}
          color={colors.text}
        />
        <Text h5 bold color={colors.text}>
          10 April 2024
        </Text>
      </View>
      <View style={styles.containerHead}>
        <Icon
          style={{
            fontSize: 15,
          }}
          name={"login"}
          type={IconType.Entypo}
          color={colors.text}
        />
        <Text h5 color={colors.text}>
          10.30 PM
        </Text>
      </View>
      <View style={styles.containerHead}>
        <Icon
          style={{
            fontSize: 15,
          }}
          name={"log-out"}
          type={IconType.Entypo}
          color={colors.text}
        />
        <Text h5 color={colors.text}>
          10.30 PM
        </Text>
      </View>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      {renderHeader()}
    </RNBounceable>
  );
};

export default CardItem;
