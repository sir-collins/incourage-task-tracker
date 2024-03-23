import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput, IconButton } from "react-native-paper"; // Import IconButton from React Native Paper
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";

interface CreateTaskScreenProps {
  onClose: () => void;
}

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ onClose }) => {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const newTask: Task = {
      id: String(Math.random()),
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(),
      status: TaskStatus.Pending,
    };

    addTask(newTask);
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
        />
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={[styles.input, styles.descriptionInput]}
        />
      </View>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <IconButton
          icon="calendar"
          onPress={() => console.log("Date selected")}
          style={styles.iconButton}
        />
        <IconButton
          icon="close"
          onPress={onClose}
          style={[styles.iconButton]}
        />
        <IconButton
          icon="check"
          onPress={handleCreateTask}
          style={[styles.iconButton]}
        />
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
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  descriptionInput: {
    height: 50, // Increase height for description input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "transparent",
  },
  addButton: {
    color: "green", // Change color for add button
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});


export default CreateTaskScreen;
