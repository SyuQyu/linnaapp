import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import createStyles from "./ListEmployeestyle";
import CardItem from "./components/card-item/CardItem";
import ModalBox from "./components/modal-box/ModalBox";
// import MockData from "./mock/MockData";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import SearchBar from "@shared-components/search-bar/SearchBar";
import useStore from "@services/zustand/store";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Picker } from "@react-native-picker/picker";

interface User {
  user_id: number;
  full_name: string;
  // Add other user properties if needed
}

interface createUserProps {
  email: string;
  password: string;
  full_name: string;
  role_id?: number;
  phone_number: string;
  department_id: number;
  office_id: number;
  address: string;
  gender: string;
}

const RenderContent: React.FC<{
  users: User[];
  handleItemPress: (data: any) => void;
  styles: any;
  colors: any;
  fetchUsers: () => void;
}> = ({ users, handleItemPress, styles, colors, fetchUsers }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleInput = (text: string) => {
    setSearchVal(text);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredData = users.filter((data) =>
    data.full_name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  const {
    register,
    stateData,
    userData,
    departments: dataDepartments,
    offices: dataOffices,
  } = useStore((state) => state);
  const [form, setForm] = useState<createUserProps>({
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
    gender: "",
    address: "",
    department_id: 0,
    office_id: 0,
    role_id: 2,
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
      if (stateData.success) {
        await fetchUsers();
        console.log("userData success create:", userData);
      }
    } catch (error) {
      console.error("error:", error);
      // Handle login error
    }
  };

  const formData = () => (
    <ScrollView contentContainerStyle={styles.containerForm}>
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
          placeholder="Select Office"
          selectedValue={form.office_id}
          onValueChange={(itemValue) =>
            handleInputChange("office_id", itemValue)
          }
        >
          {dataOffices?.offices?.map(
            (
              item: { office_name: string; office_id: number },
              index: number,
            ) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.office_name}
                  value={item.office_id}
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

      <View style={styles.pickerBorder}>
        <Picker
          placeholder="Select Role"
          selectedValue={form.role_id}
          onValueChange={(itemValue) => handleInputChange("role_id", itemValue)}
        >
          <Picker.Item label="Admin" value="3" />
          <Picker.Item label="HR" value="2" />
          <Picker.Item label="User" value="1" />
        </Picker>
      </View>

      <RNBounceable style={styles.buttonStyleForm} onPress={_onRegisterPressed}>
        <Text style={styles.buttonTextStyle} color={colors.white}>
          Create
        </Text>
      </RNBounceable>
    </ScrollView>
  );
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headContent}>
        <Text h1 bold color={colors.text}>
          List Employees
        </Text>
        {userData?.user?.role_id === 3 && (
          <ModalBox
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          >
            {formData()}
          </ModalBox>
        )}
      </View>
      <SearchBar
        searchVal={searchVal}
        handleInput={handleInput}
        handleClearBtn={handleClearBtn}
      >
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => (
              <CardItem data={item} onPress={() => handleItemPress(item)} />
            )}
          />
        </View>
      </SearchBar>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { AllUsers, getAllUsers, stateData, getDepartments, getOffices } =
    useStore((state) => state);

  // Memoize the getAllUsers function to avoid causing re-renders
  const memoizedGetAllUsers = useCallback(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    // Ensure getAllUsers is only called once
    if (!AllUsers) {
      memoizedGetAllUsers();
    }
  }, [AllUsers, memoizedGetAllUsers]);

  const handleItemPress = async (data: any) => {
    await getDepartments();
    await getOffices();
    NavigationService.push(SCREENS.DETAIL, { item: data });
  };

  if (stateData.loading) {
    return (
      <ActivityIndicator
        animating={stateData?.loading}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <RenderContent
        users={AllUsers?.users ?? []}
        handleItemPress={handleItemPress}
        styles={styles}
        colors={colors}
        fetchUsers={getAllUsers}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
