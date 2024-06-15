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
    office_id?: number;
    office_name?: string;
    office_lang?: string;
    office_long?: string;
  };
  onPressUpdate?: () => void;
  onPressDelete?: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({
  style,
  data,
  onPressUpdate,
  onPressDelete,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderHeader = () => (
    <>
      <Text h4 bold color={colors.text}>
        {data?.office_name}
      </Text>
      <View style={styles.buttonContainer}>
        <RNBounceable style={styles.buttonModal} onPress={onPressUpdate}>
          <Icon name="edit" type={IconType.Entypo} color={colors.text} />
        </RNBounceable>
        <RNBounceable style={styles.buttonModal} onPress={onPressDelete}>
          <Icon name="trash" type={IconType.Entypo} color={colors.text} />
        </RNBounceable>
      </View>
      {/* <Text h5 color={colors.placeholder} style={styles.descriptionTextStyle}>
        {data?.department?.department_name}
      </Text> */}
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]}>
      {renderHeader()}
    </RNBounceable>
  );
};

export default CardItem;
