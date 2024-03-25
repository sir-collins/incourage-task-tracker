import React, { useState } from "react";
import useTaskStore from "../store/taskStore";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Divider, List, Avatar, Portal, Modal } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
import CreateListScreen from "../screens/CreateListScreen";

const CustomDrawerContent = (props: any) => {
  const { lists, deleteList } = useTaskStore((state) => ({
    lists: state.lists,
    deleteList: state.deleteList,
  }));

  const [isCreateListModalVisible, setIsCreateListModalVisible] =
    useState(false);

  const toggleCreateListModal = () => {
    setIsCreateListModalVisible(!isCreateListModalVisible);
  };

  const renderListItem = (data: any, rowMap: any) => {
    const { id, label } = data.item;

    if (!label) {
      return null;
    }

    const renderRightAction = () => (
      <View style={styles.deleteContainer}>
        <FontAwesome name="trash" size={24} color="#fff" />
      </View>
    );

    return (
      <Swipeable
        renderRightActions={renderRightAction}
        onSwipeableOpen={(direction) => {
          if (direction === "right") {
            deleteList(id);
          }
        }}
        key={id}
      >
        <DrawerItem
          label={label}
          onPress={() => {}}
          icon={({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          )}
        />
      </Swipeable>
    );
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
          <View style={styles.dividerContainer}>
            <Divider />
            <Text style={styles.listHeading}>Lists</Text>
          </View>
          {lists.map((list) => renderListItem({ item: list }, null))}
        </View>
        <DrawerItem
          label="Create List"
          onPress={toggleCreateListModal}
          icon={({ color, size }) => (
            <FontAwesome name="plus" size={size} color={color} />
          )}
          style={styles.createListButton}
        />
      </DrawerContentScrollView>

      <Portal>
        <Modal
          visible={isCreateListModalVisible}
          onDismiss={toggleCreateListModal}
          contentContainerStyle={styles.modalContent}
        >
          <CreateListScreen onClose={toggleCreateListModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  dividerContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  listHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  createListButton: {
    marginTop: "auto",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    minWidth: "100%",
    alignSelf: "center",
    maxHeight: "20%",
    justifyContent: "center",
  },
});
