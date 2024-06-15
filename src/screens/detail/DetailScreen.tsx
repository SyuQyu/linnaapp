import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import * as NavigationService from "react-navigation-helpers";
import createStyles from "./DetailScreen.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import MockData from "./mock/MockData";
import CardItem from "./components/card-item/CardItem";
import { SCREENS } from "@shared-constants";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import fonts from "@fonts";
import ModalBox from "./components/modal-box/ModalBox";
import ModalBoxConfirmation from "@shared-components/modal-box-confirmation/ModalBoxConfirmation";
import useStore from "@services/zustand/store";
import { Picker } from "@react-native-picker/picker";

interface DetailScreenProps {}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }: any) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { item: itemData }: any = route.params;
  const {
    userData,
    updateUser,
    stateData,
    deleteUser,
    departments: dataDepartments,
    offices: dataOffices,
  } = useStore((state) => state);

  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.DETAILABSENCE, {
      userId: id,
      absence: "data",
    });
  };

  const profileURI = "https://picsum.photos/seed/picsum/200/300";

  const [modalVisible, setModalVisible] = useState({
    modalVisibleAbsence: false,
    modalVisibleDelete: false,
    modalVisibleEdit: false,
  });

  const [state, setState] = useState({
    fullName: itemData.full_name,
    email: itemData.email,
    phoneNumber: itemData.phone_number,
    department_id: itemData.department?.department_id,
    office_id: itemData.office?.office_id,
    gender: itemData.gender,
    address: itemData.address,
    role_id: itemData.role_id,
    verified: parseInt(itemData.verified),
  });

  const handleConfirm = async () => {
    await deleteUser(itemData.user_id);
    if (stateData.success) {
      NavigationService.navigate(SCREENS.LISTEMPLOYEE);
    }
  };

  const handleCancel = () => {
    handleInputChangeModal("modalVisibleDelete", false);
  };

  const renderList = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={MockData}
        renderItem={({ item }) => (
          <CardItem data={item} onPress={() => handleItemPress(item.id)} />
        )}
      />
    </View>
  );

  const handleInputChange = (field: any, value: any) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleInputChangeModal = (field: any, value: any) => {
    setModalVisible((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleUpdateData = async () => {
    const formData = {
      full_name: state.fullName ? state.fullName : itemData.full_name,
      email: state.email ? state.email : itemData.email,
      phone_number: state.phoneNumber
        ? state.phoneNumber
        : itemData.phone_number,
      department_id: parseInt(
        state.department_id
          ? state.department_id
          : itemData.department?.department_id,
      ),
      office_id: parseInt(
        state.office_id ? state.office_id : itemData.office?.office_id,
      ),
      gender: state.gender ? state.gender : itemData.gender,
      address: state.address ? state.address : itemData.address,
      role_id: parseInt(state.role_id ? state.role_id : itemData.role_id),
      verified:
        parseInt(state.verified ? state.verified : itemData.verified) === 1
          ? true
          : false,
    };
    console.log("Update Data", formData);
    console.log("Item Data", itemData);
    await updateUser(formData, itemData.user_id, false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.upperButton}>
          <RNBounceable
            style={styles.buttonStyle}
            onPress={() => NavigationService.goBack()}
          >
            <Icon
              name="chevron-left"
              type={IconType.Entypo}
              color={colors.text}
            />
            <Text color={colors.white}>Back</Text>
          </RNBounceable>
          <ModalBoxConfirmation
            modalVisible={modalVisible.modalVisibleDelete}
            setModalVisible={(visible) =>
              handleInputChangeModal("modalVisibleDelete", visible)
            }
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            customButton={
              <RNBounceable
                style={styles.buttonStyle}
                onPress={() =>
                  handleInputChangeModal("modalVisibleDelete", true)
                }
              >
                <Icon name="trash" type={IconType.Entypo} color={colors.text} />
              </RNBounceable>
            }
          >
            <Text style={{ marginBottom: 20, textAlign: "center" }}>
              Are you sure you want to proceed?
            </Text>
          </ModalBoxConfirmation>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerImages}>
              <Image
                resizeMode="cover"
                source={{ uri: profileURI }}
                style={styles.profilePicImageStyle}
              />
              <View style={styles.headerText}>
                <Text h2 bold color={colors.text}>
                  {itemData.full_name}
                </Text>
                <Text
                  fontFamily={fonts.montserrat.lightItalic}
                  color={colors.placeholder}
                >
                  {itemData.department?.department_name}
                </Text>
              </View>
            </View>
            <ModalBox
              modalVisible={modalVisible.modalVisibleAbsence}
              setModalVisible={(visible) =>
                handleInputChangeModal("modalVisibleAbsence", visible)
              }
              butttonName="Show Absence"
            >
              {renderList()}
            </ModalBox>
          </View>
          <View style={styles.containerDataUser}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("fullName", value)}
              value={state.fullName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("email", value)}
              value={state.email}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              value={state.phoneNumber}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("address", value)}
              value={state.address}
            />

            <Text style={styles.label}>Department</Text>
            <View style={styles.pickerBorder}>
              <Picker
                selectedValue={state.department_id}
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

            <Text style={styles.label}>Office</Text>
            <View style={styles.pickerBorder}>
              <Picker
                selectedValue={state.office_id}
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

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerBorder}>
              <Picker
                selectedValue={state.gender}
                onValueChange={(itemValue) =>
                  handleInputChange("gender", itemValue)
                }
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            <Text style={styles.label}>Role</Text>
            <View style={styles.pickerBorder}>
              <Picker
                placeholder="Select Role"
                selectedValue={state.role_id.toString()}
                onValueChange={(itemValue) =>
                  handleInputChange("role_id", itemValue)
                }
              >
                <Picker.Item label="Admin" value="3" />
                <Picker.Item label="HR" value="2" />
                <Picker.Item label="User" value="1" />
              </Picker>
            </View>

            <Text style={styles.label}>Account Verified</Text>
            <View style={styles.pickerBorder}>
              <Picker
                selectedValue={state.verified}
                onValueChange={(itemValue) =>
                  handleInputChange("verified", itemValue)
                }
              >
                <Picker.Item label="Verified" value="1" />
                <Picker.Item label="Not Verified" value="0" />
              </Picker>
            </View>
          </View>
          {userData?.user?.role_id === 3 && (
            <RNBounceable
              style={styles.buttonUpdateData}
              onPress={() => handleUpdateData()}
            >
              {stateData.loading ? (
                <ActivityIndicator
                  animating={stateData?.loading}
                  color="#FFFFFF"
                  size="large"
                  style={styles.activityIndicator}
                />
              ) : (
                <Text bold color={colors.white}>
                  Update
                </Text>
              )}
            </RNBounceable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
