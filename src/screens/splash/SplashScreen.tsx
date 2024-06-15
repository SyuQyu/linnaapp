import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";

const SplashScreen: React.FC = () => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setAnimating(false);
      // const userId = await AsyncStorage.getItem('user_id');
      // if (false) {
      //   NavigationService.push(SCREENS.HOME);
      // } else {
      //   NavigationService.push(SCREENS.LOGIN);
      // }
      NavigationService.push(SCREENS.LOGIN);
    };

    setTimeout(checkUser, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
