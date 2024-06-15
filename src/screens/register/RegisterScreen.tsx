import React, { useMemo, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./RegisterScreen.style";
// import useStore from "@services/zustand/store";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import useStore from "@services/zustand/store";
import { Picker } from "@react-native-picker/picker";
// import { emailValidator, passwordValidator } from "utils";
interface registerProps {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  department_id: number;
  address: string;
  gender: string;
}

const RegisterScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    register,
    stateData,
    userData,
    departments: dataDepartments,
  } = useStore((state) => state);
  const [form, setForm] = useState<registerProps>({
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
    department_id: 0,
    address: "",
    gender: "",
  });

  // const [errors, setErrors] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleInputChange = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };

  const _onRegisterPressed = async () => {
    // const emailError = emailValidator(form.email);
    // const passwordError = passwordValidator(form.password);

    // if (emailError || passwordError) {
    //   setErrors({ email: emailError, password: passwordError });
    //   return;
    // }
    // Implement your registration logic here
    // For now, let's just navigate to the home screen
    try {
      await register(form);
      console.log("userData:", userData);
      if (stateData.success) {
        NavigationService.navigate(SCREENS.HOME);
      }
    } catch (error) {
      console.error("Register error:", error);
      // Handle login error
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Register.</Text>

      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => handleInputChange("email", text)}
          style={styles.input}
        />
        {/* {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null} */}
      </View>

      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
          style={styles.input}
        />
        {/* {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null} */}
      </View>

      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter your full name"
          value={form.full_name}
          onChangeText={(text) => handleInputChange("full_name", text)}
          style={styles.input}
        />
      </View>

      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter your phone number"
          value={form.phone_number}
          onChangeText={(text) => handleInputChange("phone_number", text)}
          style={styles.input}
        />
      </View>

      <TextInput
        placeholder="Enter your address"
        style={styles.input}
        onChangeText={(value) => handleInputChange("address", value)}
        value={form.address}
      />

      <View style={styles.pickerBorder}>
        <Picker
          placeholder="Select Department"
          selectedValue={form.department_id}
          onValueChange={(itemValue) =>
            handleInputChange("department_id", itemValue)
          }
        >
          {dataDepartments?.departments?.map(
            (
              item: { department_name: string; department_id: number },
              index: number,
            ) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.department_name}
                  value={item.department_id}
                />
              );
            },
          )}
        </Picker>
      </View>

      <View style={styles.pickerBorder}>
        <Picker
          placeholder="Select Gender"
          selectedValue={form.gender}
          onValueChange={(itemValue) => handleInputChange("gender", itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => NavigationService.push(SCREENS.LOGIN)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <RNBounceable style={styles.buttonStyle} onPress={_onRegisterPressed}>
        {stateData.loading ? (
          <ActivityIndicator
            animating={stateData?.loading}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <Text style={styles.buttonTextStyle}>Register</Text>
        )}
      </RNBounceable>
    </ScrollView>
  );
};

export default RegisterScreen;
