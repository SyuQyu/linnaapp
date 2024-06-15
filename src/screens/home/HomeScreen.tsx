import React, { useMemo, useState } from "react";
import {
  // Button,
  // FlatList,
  Image,
  View,
} from "react-native";
// import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as NavigationService from "react-navigation-helpers";
import createStyles from "./HomeScreen.style";
// import CardItem from "./components/card-item/CardItem";
import MockData from "./mock/MockData";
import fonts from "@fonts";
// import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import HorizontalDatePicker from "@shared-components/horizontal-date-picker/HorizontalDatePicker";
import CardItem from "./components/card-item/CardItem";
import RNBounceable from "@freakycoder/react-native-bounceable";
import useStore from "@services/zustand/store";
// import { SCREENS } from "@shared-constants";

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const { userData } = useStore((state) => state);
  // const handleItemPress = () => {
  //   NavigationService.push(SCREENS.DETAIL);
  // };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  // const renderMenuButton = () => (
  //   <RNBounceable>
  //     <Icon
  //       name="menu"
  //       type={IconType.Ionicons}
  //       color={colors.iconBlack}
  //       size={30}
  //     />
  //   </RNBounceable>
  // );
  console.log("userData", userData);
  console.log(value, "week", week);
  const renderWelcome = () => (
    <>
      <Text h1 bold color={colors.text}>
        Hello {userData?.user?.full_name}
      </Text>
      <Text
        fontFamily={fonts.montserrat.lightItalic}
        color={colors.placeholder}
      >
        Welcome Back
      </Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImages}>
          <Image
            resizeMode="cover"
            source={{ uri: profileURI }}
            style={styles.profilePicImageStyle}
          />
        </View>
        <View style={styles.headerText}>{renderWelcome()}</View>
      </View>
      <HorizontalDatePicker
        value={value}
        setValue={setValue}
        week={week}
        setWeek={setWeek}
      >
        <View style={styles.dataContainer}>
          <CardItem data={MockData[0]} />
          <CardItem data={MockData[1]} />
        </View>
        <View style={styles.dataContainer}>
          <CardItem data={MockData[2]} />
          <CardItem data={MockData[3]} />
        </View>
        {userData?.user?.role_id !== 2 && (
          <RNBounceable
            style={styles.buttonAbsence}
            // onPress={_onLoginPressed}
          >
            <Text bold color={colors.white}>
              Absence
            </Text>
          </RNBounceable>
        )}
      </HorizontalDatePicker>
    </SafeAreaView>
  );
};

export default HomeScreen;
