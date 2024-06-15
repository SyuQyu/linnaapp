import React, { useMemo } from "react";
import { View } from "react-native";
import createStyles from "./SettingsScreen.style";
import { useTheme } from "@react-navigation/native";
import CardItem from "@screens/settings/components/card-item/CardItem";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Text from "@shared-components/text-wrapper/TextWrapper";
import useStore from "@services/zustand/store";
const SearchScreen: React.FC = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { logout, userData } = useStore((state) => state);

  const _onPress = (name: string) => {
    if (name === "Logout") {
      NavigationService.push(SCREENS.LOGIN);
      logout();
    } else if (name === "Profile") {
      NavigationService.push(SCREENS.PROFILE);
    } else if (name === "Department") {
      NavigationService.push(SCREENS.DEPARTMENT);
    } else if (name === "Office") {
      NavigationService.push(SCREENS.OFFICE);
    }
  };

  return (
    <View style={styles.container}>
      <CardItem
        name="Profile"
        onPress={() => {
          _onPress("Profile");
        }}
      />
      {userData?.user?.role_id === 3 && (
        <>
          <CardItem
            name="Department"
            onPress={() => {
              _onPress("Department");
            }}
          />
          <CardItem
            name="Office"
            onPress={() => {
              _onPress("Office");
            }}
          />
        </>
      )}
      <RNBounceable
        style={styles.buttonLogout}
        onPress={() => {
          _onPress("Logout");
        }}
      >
        <Text bold color="#fff">
          Logout
        </Text>
      </RNBounceable>
    </View>
  );
};

export default SearchScreen;
