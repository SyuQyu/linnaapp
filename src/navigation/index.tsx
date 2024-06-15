import React from "react";
import { useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import useStore from "@services/zustand/store";
import * as NavigationService from "react-navigation-helpers";
import { createStackNavigator } from "@react-navigation/stack";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
// import SearchScreen from "@screens/search/SearchScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import SplashScreen from "@screens/splash/SplashScreen";
import LoginScreen from "@screens/login/LoginScreen";
import RegisterScreen from "@screens/register/RegisterScreen";
import ListEmployeeScreen from "@screens/listEmployee/ListEmployeeScreen";
import AbsenceScreen from "@screens/absence/AbsenceScreen";
import SettingsScreen from "@screens/settings/SettingsScreen";
import DepartmentScreen from "@screens/department/ListDepartmentScreen";
import OfficeScreen from "@screens/office/ListOfficeScreen";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Navigation = () => {
  const { userData } = useStore((state) => state);
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const UserLevel: number = userData?.user?.role_id;
  if (userData === null) {
    NavigationService.navigate(SCREENS.LOGIN);
  }
  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    if (UserLevel === 1) {
      switch (route.name) {
        case SCREENS.HOME:
          iconName = focused ? "home" : "home-outline";
          break;
        case SCREENS.SETTINGS:
          iconName = focused ? "settings" : "settings-outline";
          break;
        default:
          iconName = focused ? "home" : "home-outline";
          break;
      }
      return (
        <Icon
          name={iconName}
          type={IconType.Ionicons}
          size={size}
          color={color}
        />
      );
    } else if (UserLevel === 2) {
      switch (route.name) {
        case SCREENS.HOME:
          iconName = focused ? "home" : "home-outline";
          break;
        case SCREENS.LISTEMPLOYEE:
          iconName = focused ? "people-sharp" : "people-outline";
          break;
        case SCREENS.SETTINGS:
          iconName = focused ? "settings" : "settings-outline";
          break;
        default:
          iconName = focused ? "home" : "home-outline";
          break;
      }
      return (
        <Icon
          name={iconName}
          type={IconType.Ionicons}
          size={size}
          color={color}
        />
      );
    } else {
      switch (route.name) {
        case SCREENS.HOME:
          iconName = focused ? "home" : "home-outline";
          break;
        case SCREENS.LISTEMPLOYEE:
          iconName = focused ? "people-sharp" : "people-outline";
          break;
        case SCREENS.SETTINGS:
          iconName = focused ? "settings" : "settings-outline";
          break;
        default:
          iconName = focused ? "home" : "home-outline";
          break;
      }
      return (
        <Icon
          name={iconName}
          type={IconType.Ionicons}
          size={size}
          color={color}
        />
      );
    }
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        {UserLevel !== 1 ? (
          <Tab.Screen
            name={SCREENS.LISTEMPLOYEE}
            component={ListEmployeeScreen}
          />
        ) : null}
        <Tab.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator
        initialRouteName={SCREENS.SPLASH}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
        <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
        {UserLevel !== 3 ? (
          <Stack.Screen name={SCREENS.ABSENCE} component={AbsenceScreen} />
        ) : (
          <>
            <Stack.Screen
              name={SCREENS.DEPARTMENT}
              component={DepartmentScreen}
            />
            <Stack.Screen name={SCREENS.OFFICE} component={OfficeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
