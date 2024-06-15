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
import createStyles from "./ListDepartmentstyle";
import CardItem from "./components/card-item/CardItem";
import ModalBox from "./components/modal-box/ModalBox";
// import MockData from "./mock/MockData";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SearchBar from "@shared-components/search-bar/SearchBar";
import useStore from "@services/zustand/store";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ModalBoxConfirmation from "@shared-components/modal-box-confirmation/ModalBoxConfirmation";
interface Departments {
  department_id: number;
  department_name: string;
  // Add other user properties if needed
}

const RenderContent: React.FC<{
  dataDepartments: Departments[];
  styles: any;
  colors: any;
  fetchDepartments: () => void;
}> = ({ dataDepartments, styles, colors, fetchDepartments }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [modalVisible, setModalVisible] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const handleInput = (text: string) => {
    setSearchVal(text);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const [data, setData] = useState<Departments>();

  const filteredData = dataDepartments.filter((data) =>
    data.department_name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  const {
    createDepartment,
    stateData,
    userData,
    updateDepartment,
    deleteDepartment,
  } = useStore((state) => state);
  const [form, setForm] = useState<Departments>({
    department_id: 0,
    department_name: "",
  });

  // const [errors, setErrors] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleInputChange = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };

  const handleChangeModal = (field: any, value: any) => {
    setModalVisible((prevState) => ({ ...prevState, [field]: value }));
  };

  const _onCreateOrUpdatePressed = async (
    data: Departments,
    update?: boolean,
  ) => {
    // const emailError = emailValidator(form.email);
    // const passwordError = passwordValidator(form.password);

    // if (emailError || passwordError) {
    //   setErrors({ email: emailError, password: passwordError });
    //   return;
    // }
    // Implement your registration logic here
    // For now, let's just navigate to the home screen
    try {
      if (update) {
        await updateDepartment(data?.department_id, {
          department_name: form.department_name,
        });
      } else {
        await createDepartment({ department_name: form.department_name });
      }
      if (stateData.success) {
        await fetchDepartments();
        console.log("departments success:", dataDepartments);
      }
    } catch (error) {
      console.error("error:", error);
      // Handle login error
    }
  };

  const _OnUpdatePressed = async (data: Departments) => {
    setData(data);
    setForm({ ...form, ["department_name"]: data.department_name });
    handleChangeModal("update", true);
    // try {
    //   await updateDepartment(data?.department_id, { department_name: form.department_name });
    //   if (stateData.success) {
    //     await fetchDepartments();
    //     console.log("departments success create:", dataDepartments);
    //   }
    // } catch (error) {
    //   console.error("error:", error);
    //   // Handle login error
    // }
  };

  const _OnDeletePressed = async (data: Departments) => {
    setData(data);
    handleChangeModal("delete", true);
  };

  const handleConfirm = async () => {
    try {
      if (data !== undefined) {
        await deleteDepartment(data.department_id);
        if (stateData.success) {
          await fetchDepartments();
          console.log("departments success delete:", dataDepartments);
        }
      }
    } catch (error) {
      console.error("error:", error);
      // Handle login error
    }
  };

  const handleCancel = () => {
    handleChangeModal("delete", false);
  };

  const formData = (data?: any, update?: boolean) => (
    <ScrollView contentContainerStyle={styles.containerForm}>
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter department name"
          value={form.department_name}
          onChangeText={(text) => handleInputChange("department_name", text)}
          style={styles.input}
        />
        {/* {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null} */}
      </View>

      <RNBounceable
        style={styles.buttonStyleForm}
        onPress={() => _onCreateOrUpdatePressed(data, update)}
      >
        <Text style={styles.buttonTextStyle} color={colors.white}>
          {update ? "Update" : "Create"}
        </Text>
      </RNBounceable>
    </ScrollView>
  );
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headContent}>
        <Text h1 bold color={colors.text}>
          List Departments
        </Text>
        {userData?.user?.role_id === 3 && (
          <>
            <ModalBox
              button={true}
              modalVisible={modalVisible.create}
              setModalVisible={(visible) =>
                handleChangeModal("create", visible)
              }
            >
              {formData()}
            </ModalBox>
            <ModalBox
              modalVisible={modalVisible.update}
              setModalVisible={(visible) =>
                handleChangeModal("update", visible)
              }
            >
              {formData(data, true)}
            </ModalBox>
            <ModalBoxConfirmation
              modalVisible={modalVisible.delete}
              setModalVisible={(visible) =>
                handleChangeModal("delete", visible)
              }
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            >
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Are you sure you want to proceed?
              </Text>
            </ModalBoxConfirmation>
          </>
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
            keyExtractor={(item) => item.department_id.toString()}
            renderItem={({ item }) => (
              <CardItem
                data={item}
                onPressUpdate={() => _OnUpdatePressed(item)}
                onPressDelete={() => _OnDeletePressed(item)}
              />
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
  const {
    getDepartments,
    departments: DataDepartments,
    stateData,
  } = useStore((state) => state);

  // Memoize the getAllUsers function to avoid causing re-renders
  const memoizedGetAllDepartments = useCallback(() => {
    getDepartments();
  }, [getDepartments]);

  useEffect(() => {
    // Ensure getAllDepartments is only called once
    if (!DataDepartments) {
      memoizedGetAllDepartments();
    }
  }, [DataDepartments, memoizedGetAllDepartments]);

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
      <RNBounceable
        style={styles.buttonBack}
        onPress={() => NavigationService.goBack()}
      >
        <Icon name="chevron-left" type={IconType.Entypo} color={colors.text} />
      </RNBounceable>
      <RenderContent
        dataDepartments={DataDepartments?.departments ?? []}
        // handleItemPress={handleItemPress}
        styles={styles}
        colors={colors}
        fetchDepartments={getDepartments}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
