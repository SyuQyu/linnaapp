import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Modal, Text, Pressable, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import createStyles from "./ModalBox.styles";

interface ModalBoxProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  children?: React.ReactNode;
  fetchData?: () => void;
  button?: boolean;
}

const ModalBox = ({
  modalVisible,
  setModalVisible,
  fetchData,
  children,
  button,
}: ModalBoxProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="cross" type={IconType.Entypo} color={colors.text} />
            </Pressable>
            {children}
          </View>
        </View>
      </Modal>
      {button && (
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          onPress={() => {
            setModalVisible(true);
            if (fetchData) {
              fetchData();
            }
          }}
        >
          <Text style={styles.textStyle}>Create</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ModalBox;
