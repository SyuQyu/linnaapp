import React, { useMemo, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./LoginScreen.style";
// import useStore from "@services/zustand/store";
// import RNBounceable from "@freakycoder/react-native-bounceable";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { emailValidator, passwordValidator } from "utils";
import RNBounceable from "@freakycoder/react-native-bounceable";
import useStore from "@services/zustand/store";

const LoginScreen: React.FC = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, userData, stateData } = useStore((state) => state);

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    try {
      const credientials = { email, password };
      await login(credientials);
      console.log("userData:", userData);
      if (stateData.success) {
        NavigationService.navigate(SCREENS.HOME);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back.</Text>

      <View
        style={{
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
      </View>

      {/* <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => NavigationService.navigate('ForgotPasswordScreen')}
      >
        <Text style={styles.label}>Forgot your password?</Text>
      </TouchableOpacity> */}

      {/* <Button mode="contained" onPress={_onLoginPressed} title="Login" /> */}

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => NavigationService.push(SCREENS.REGISTER)}
        >
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
      <RNBounceable style={styles.buttonStyle} onPress={_onLoginPressed}>
        {stateData.loading ? (
          <ActivityIndicator
            animating={stateData?.loading}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <Text style={styles.buttonTextStyle}>Login</Text>
        )}
      </RNBounceable>
    </View>
  );
};

export default LoginScreen;
