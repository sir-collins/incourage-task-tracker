import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  FAB,
  Modal,
  Portal,
} from "react-native-paper";
import { TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import CollapsibleSection from "../HomeScreen/CollapsibleSection";
import CreateTaskScreen from "../CreateTaskScreen/CreateTaskScreen";

const InboxScreen = () => {
  const { getTodayTasks, getTasksByStatus, getOverdueTasks } = useTaskStore();

  const handleSearch = () => {
    // Implement your search functionality here
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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
        // Add any necessary props for the search input
      />
      {sections.map((section, index) => (
        <CollapsibleSection
          key={index}
          title={section.title}
          tasks={section.getTasks()}
        />
      ))}
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
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "green",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 0,
    minWidth: "100%",
    alignSelf: "center", // Center horizontally
    maxHeight: "20%",
    justifyContent: "center", // Center vertically
  },
});

export default InboxScreen;
