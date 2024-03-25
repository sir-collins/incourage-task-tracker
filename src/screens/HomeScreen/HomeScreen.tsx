import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FAB, Modal, Portal } from "react-native-paper";
import { TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import CollapsibleSection from "./CollapsibleSection";
import CreateTaskScreen from "../CreateTaskScreen/CreateTaskScreen";
import { getContrastBackgroundColor } from "../../constants/colors";

const HomeScreen = () => {
  const {
    getTodayTasks,
    getTomorrowTasks,
    getThisWeekTasks,
    getTasksByStatus,
    getOverdueTasks,
  } = useTaskStore();

  const sections = [
    { title: "Overdue", getTasks: getOverdueTasks, isCollapsed: true },
    { title: "Today", getTasks: getTodayTasks, isCollapsed: true },
    { title: "Tomorrow", getTasks: getTomorrowTasks, isCollapsed: true },
    {
      title: "Next Seven Days",
      getTasks: getThisWeekTasks,
      isCollapsed: false,
    },
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

export default HomeScreen;
