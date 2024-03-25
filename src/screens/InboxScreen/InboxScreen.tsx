import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FAB, Modal, Portal, Text } from "react-native-paper";
import { TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import CollapsibleSection from "../HomeScreen/CollapsibleSection";
import CreateTaskScreen from "../CreateTaskScreen/CreateTaskScreen";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { primaryColor } from "../../constants/colors";

const InboxScreen = ({ navigation }: { navigation: any }) => {
  const { getTodayTasks, getTasksByStatus, getOverdueTasks } = useTaskStore();

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  const sections = [
    { title: "Overdue", getTasks: getOverdueTasks, isCollapsed: true },
    { title: "Today", getTasks: getTodayTasks, isCollapsed: true },
    {
      title: "Completed",
      getTasks: () => getTasksByStatus(TaskStatus.Completed),
      isCollapsed: false,
    },
  ];

  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] =
    useState(false);
  const toggleCreateTaskModal = () => {
    setIsCreateTaskModalVisible(!isCreateTaskModalVisible);
  };

  return (
    <View style={[styles.container, {backgroundColor: '#f5f5f5'}]}>
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearch}>
      <FontAwesome name="search" size={20} style={styles.searchIcon} />
      <Text style={styles.searchPlaceholder}>Search</Text>
    </TouchableOpacity>
      <ScrollView>
        {sections.map((section, index) => (
        <CollapsibleSection
          key={index}
          title={section.title}
          tasks={section.getTasks()}
        />
      ))}
      </ScrollView>
      
      <FAB
        style={styles.addButton}
        icon="plus"
        onPress={toggleCreateTaskModal}
      />
      <Portal>
        <Modal
          visible={isCreateTaskModalVisible}
          onDismiss={toggleCreateTaskModal}
          contentContainerStyle={styles.modalContent}
        >
          <CreateTaskScreen onClose={toggleCreateTaskModal} />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  searchInput: {
    marginBottom: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: primaryColor,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 21,
  },
  searchPlaceholder: {
    color: 'black',
    fontSize: 17
  },
  modalContent: {
    backgroundColor: "white",
    padding: 0,
    minWidth: "100%",
    alignSelf: "center",
    maxHeight: "20%",
    justifyContent: "center",
  },
});

export default InboxScreen;
