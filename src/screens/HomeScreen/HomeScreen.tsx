import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useTaskStore from "../../store/taskStore";
import TaskList from "../../components/TaskList/TaskList";
import Button from "../../components/UI/Button";
import { TaskStatus } from "../../types/task";

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

      <Button
        onPress={() => navigation.navigate("CreateTask")}
        title="Create Task"
      />
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
});

export default HomeScreen;
