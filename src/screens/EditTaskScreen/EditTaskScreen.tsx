import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper"; // Import IconButton, TextInput, and Button from React Native Paper
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";

interface EditTaskScreenProps {
  task: Task;
  onClose: () => void;
}

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");

  // Function to handle task update
  const handleUpdateTask = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const updatedTask: Task = {
      ...task,
      title: title.trim(),
      description: description.trim(),
    };

    updateTask(task.id, updatedTask);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="What would you like to do?"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          mode="outlined" // Use outlined mode to remove borders
        />
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={[styles.input, styles.descriptionInput]}
          mode="outlined" // Use outlined mode to remove borders
        />
        {error !== "" && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <IconButton
            icon="calendar"
            onPress={() => console.log("Date selected")}
            style={styles.iconButton}
            size={24} // Set icon size
          />
          <IconButton
            icon="delete" // Use the delete icon
            onPress={() => {
              deleteTask(task.id); // Call the deleteTask function with the task ID
              onClose(); // Close the modal after deleting the task
            }}
            style={styles.iconButton}
            size={24} // Set icon size
          />
          <IconButton
            icon="close"
            onPress={onClose}
            style={[styles.iconButton]}
            size={24} // Set icon size
          />
          <IconButton
            icon="check"
            onPress={handleUpdateTask}
            style={styles.iconButton}
            size={24} // Set icon size
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    marginBottom: 0,
  },
  input: {
    marginBottom: 0,
    borderWidth: 0,
  },
  descriptionInput: {
    height: 50, // Increase height for description input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Add horizontal padding for button container
    paddingBottom: 16, // Add bottom padding for button container
  },
  iconButton: {
    backgroundColor: "transparent",
  },
  error: {
    color: "red",
    marginBottom: 10,
    paddingHorizontal: 16, // Add horizontal padding for error text
  },
});

export default EditTaskScreen;
