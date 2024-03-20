import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useTaskStore from "../../store/taskStore";
import TaskList from "../../components/TaskList/TaskList";
import Button from "../../components/UI/Button";
import { TaskStatus } from "../../types/task";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const {
    getTodayTasks,
    getTomorrowTasks,
    getThisWeekTasks,
    deleteTask,
    getTasksByStatus,
    tasks,
  } = useTaskStore();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <View style={styles.container}>
      {/* Today Section */}
      <Text style={styles.sectionTitle}>Today</Text>
      <TaskList tasks={getTodayTasks()} onDeleteTask={handleDeleteTask} />

      {/* Tomorrow Section */}
      <Text style={styles.sectionTitle}>Tomorrow</Text>
      <TaskList tasks={getTomorrowTasks()} onDeleteTask={handleDeleteTask} />

      {/* This Week Section */}
      <Text style={styles.sectionTitle}>This Week</Text>
      <TaskList tasks={getThisWeekTasks()} onDeleteTask={handleDeleteTask} />

      {/* Completed Section */}
      <Text style={styles.sectionTitle}>Completed</Text>
      <TaskList
        tasks={getTasksByStatus(TaskStatus.Completed)}
        onDeleteTask={handleDeleteTask}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <FontAwesome name="plus" size={17} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007AFF",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});

export default HomeScreen;
