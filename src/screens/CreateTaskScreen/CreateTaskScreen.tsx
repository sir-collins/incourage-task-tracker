import React from "react";
import { View, StyleSheet } from "react-native";
import TaskForm from "../../components/TaskForm/TaskForm";
import useTaskStore from "../../store/taskStore";
import { Task } from "../../types/task";

const CreateTaskScreen = ({ navigation }: { navigation: any }) => {
  const { addTask } = useTaskStore();

  const handleCreateTask = (newTask: Task) => {
    addTask(newTask);
    navigation.navigate("Home"); 
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CreateTaskScreen;
