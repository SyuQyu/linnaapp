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
import createStyles from "./ListOfficestyle";
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
interface Offices {
  office_id: number;
  office_name: string;
  office_lang: string;
  office_long: string;
  // Add other user properties if needed
}

const RenderContent: React.FC<{
  dataOffice: Offices[];
  styles: any;
  colors: any;
  fetchOffice: () => void;
}> = ({ dataOffice, styles, colors, fetchOffice }) => {
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

  const [data, setData] = useState<Offices>();

  const filteredData = dataOffice.filter((data) =>
    data.office_name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  const { createOffice, stateData, userData, updateOffice, deleteOffice } =
    useStore((state) => state);
  const [form, setForm] = useState<Offices>({
    office_id: 0,
    office_name: "",
    office_lang: "",
    office_long: "",
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

  const _onCreateOrUpdatePressed = async (data: Offices, update?: boolean) => {
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
        await updateOffice(data?.office_id, {
          office_name: form.office_name,
          office_lang: form.office_lang,
          office_long: form.office_long,
        });
      } else {
        await createOffice({
          office_name: form.office_name,
          office_lang: form.office_lang,
          office_long: form.office_long,
        });
      }
      if (stateData.success) {
        await fetchOffice();
        console.log("departments success:", dataOffice);
      }
    } catch (error) {
      console.error("error:", error);
      // Handle login error
    }
  };

  const _OnUpdatePressed = async (data: Offices) => {
    setData(data);
    setForm({
      ...form,
      office_name: data.office_name,
      office_lang: data.office_lang,
      office_long: data.office_long,
    });
    handleChangeModal("update", true);
    // try {
    //   await updateDepartment(data?.department_id, { department_name: form.department_name });
    //   if (stateData.success) {
    //     await fetchOffice();
    //     console.log("departments success create:", dataOffice);
    //   }
    // } catch (error) {
    //   console.error("error:", error);
    //   // Handle login error
    // }
  };

  const _OnDeletePressed = async (data: Offices) => {
    setData(data);
    handleChangeModal("delete", true);
  };

  const handleConfirm = async () => {
    try {
      if (data !== undefined) {
        await deleteOffice(data.office_id);
        if (stateData.success) {
          await fetchOffice();
          console.log("departments success delete:", dataOffice);
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
          placeholder="Enter office name"
          value={form.office_name}
          onChangeText={(text) => handleInputChange("office_name", text)}
          style={styles.input}
        />
        {/* {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null} */}
      </View>
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter office langtitude"
          value={form.office_lang}
          onChangeText={(text) => handleInputChange("office_lang", text)}
          style={styles.input}
        />
        {/* {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null} */}
      </View>
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Enter office longtitude"
          value={form.office_long}
          onChangeText={(text) => handleInputChange("office_long", text)}
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
          List Offices
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
            keyExtractor={(item) => item.office_id.toString()}
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
    getOffices,
    offices: DataOffice,
    stateData,
  } = useStore((state) => state);

  // Memoize the getAllUsers function to avoid causing re-renders
  const memoizedGetAllOffices = useCallback(() => {
    getOffices();
  }, [getOffices]);

  useEffect(() => {
    // Ensure getAllDepartments is only called once
    if (!DataOffice) {
      memoizedGetAllOffices();
    }
  }, [DataOffice, memoizedGetAllOffices]);

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
        dataOffice={DataOffice?.offices ?? []}
        // handleItemPress={handleItemPress}
        styles={styles}
        colors={colors}
        fetchOffice={getOffices}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
