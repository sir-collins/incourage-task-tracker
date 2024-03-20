import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TaskForm from "../../components/TaskForm/TaskForm";
import useTaskStore from "../../store/taskStore";
import { Task } from "../../types/task";

const EditTaskScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { task } = route.params;
  const { updateTask } = useTaskStore();

  useEffect(() => {
    // Additional logic if needed when the screen mounts
  }, []);

  // Function to handle task update
  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask.id, updatedTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TaskForm task={task} onSubmit={handleUpdateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EditTaskScreen;
