import React, { useMemo, useState } from "react";
import { ActivityIndicator, Image, TextInput, View } from "react-native";
import createStyles from "./ProfileScreen.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import fonts from "@fonts";
import useStore from "@services/zustand/store";
import { Picker } from "@react-native-picker/picker";
import * as NavigationService from "react-navigation-helpers";
interface DetailScreenProps {}

const ProfileScreen: React.FC<DetailScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { userData, updateUser, stateData } = useStore((state) => state);

  const profileURI = "https://picsum.photos/seed/picsum/200/300";

  const [buttonVisible, setButtonVisible] = useState(false);

  const [state, setState] = useState({
    fullName: userData?.user?.full_name,
    email: userData?.user?.email,
    phoneNumber: userData?.user?.phone_number,
    department: userData?.user?.department?.department_name,
    office: userData?.user?.office?.office_name,
    password: "",
    gender: userData?.user?.gender,
    address: userData?.user?.address,
    verified: parseInt(userData?.user?.verified),
  });

  const handleInputChange = (field: any, value: any) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleVisibileButton = (value: boolean) => {
    setButtonVisible(value);
  };

  const handleUpdateData = async () => {
    const formData = {
      full_name: state.fullName ? state.fullName : userData?.user?.full_name,
      email: state.email ? state.email : userData?.user?.email,
      phone_number: state.phoneNumber
        ? state.phoneNumber
        : userData?.user?.phone_number,
      gender: state.gender ? state.gender : userData?.user?.gender,
      address: state.address ? state.address : userData?.user?.address,
      verified:
        parseInt(state.verified ? state.verified : userData?.user?.verified) ===
        1
          ? true
          : false,
    };
    await updateUser(formData, userData?.user?.user_id, true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <RNBounceable
          style={styles.buttonBack}
          onPress={() => NavigationService.goBack()}
        >
          <Icon
            name="chevron-left"
            type={IconType.Entypo}
            color={colors.text}
          />
        </RNBounceable>
        <View style={styles.headerContainer}>
          <View style={styles.headerImages}>
            <Image
              resizeMode="cover"
              source={{ uri: profileURI }}
              style={styles.profilePicImageStyle}
            />
            <View style={styles.headerText}>
              <Text h2 bold color={colors.text}>
                {userData?.user?.full_name}
              </Text>
              <Text
                fontFamily={fonts.montserrat.lightItalic}
                color={colors.placeholder}
              >
                {userData?.user?.department?.name}
              </Text>
            </View>
          </View>
          <View style={styles.updateButton}>
            <RNBounceable
              style={styles.buttonStyle}
              onPress={() => handleVisibileButton(!buttonVisible)}
            >
              <Icon name="edit" type={IconType.Entypo} color={colors.text} />
            </RNBounceable>
          </View>
        </View>
        <View style={styles.containerDataUser}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            editable={buttonVisible}
            style={styles.input}
            onChangeText={(value) => handleInputChange("fullName", value)}
            value={state.fullName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            editable={buttonVisible}
            style={styles.input}
            onChangeText={(value) => handleInputChange("email", value)}
            value={state.email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            editable={buttonVisible}
            style={styles.input}
            onChangeText={(value) => handleInputChange("password", value)}
            value={state.password}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            editable={buttonVisible}
            style={styles.input}
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
            value={state.phoneNumber}
          />

          <Text style={styles.label}>Department</Text>
          <TextInput
            editable={false}
            style={styles.input}
            // onChangeText={(value) => handleInputChange("department", value)}
            value={state.department}
          />

          <Text style={styles.label}>Office</Text>
          <TextInput
            editable={false}
            style={styles.input}
            // onChangeText={(value) => handleInputChange("phoneNumber", value)}
            value={state.office}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            editable={buttonVisible}
            style={styles.input}
            onChangeText={(value) => handleInputChange("address", value)}
            value={state.address}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerBorder}>
            <Picker
              enabled={buttonVisible}
              selectedValue={state.gender}
              onValueChange={(itemValue) =>
                handleInputChange("gender", itemValue)
              }
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        {buttonVisible && (
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
  );
};

// export default DetailScreen;

export default ProfileScreen;
