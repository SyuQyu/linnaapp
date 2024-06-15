import { ScreenHeight } from "@freakycoder/react-native-helpers";
import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Modal, Text, Pressable, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import createStyles from "./ModalBox.styles";

interface ModalBoxProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  buttonName?: string;
  customButton?: React.ReactNode;
}

const ModalBox = ({
  modalVisible,
  setModalVisible,
  onConfirm,
  onCancel,
  children,
  buttonName,
  customButton,
}: ModalBoxProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          height: ScreenHeight * 0.7,
        }}
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
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => {
                  onConfirm();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => {
                  onCancel();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {customButton ? customButton : null}
      {buttonName ? (
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>{buttonName}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ModalBox;
