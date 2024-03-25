import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton, TextInput, Button, useTheme } from "react-native-paper"; // Import IconButton, TextInput, and Button from React Native Paper
import { Task } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { primaryColor } from "../../constants/colors";

interface EditTaskScreenProps {
  task: Task;
  onClose: () => void;
}

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useTheme();
  const titleRef = useRef<any>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: React.SetStateAction<Date>) => {
    setDueDate(date);
    hideDatePicker();
  };

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
      dueDate: dueDate,
    };

    updateTask(task.id, updatedTask);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={titleRef}
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
        <View style={styles.iconContainer}>
          <IconButton
            icon="calendar"
            onPress={showDatePicker}
            iconColor={theme.colors.primary}
            size={24}
          />
          <Text style={styles.dateText}>{format(dueDate, "d MMMM")}</Text>
        </View>
        <IconButton
          icon="delete"
          onPress={() => {
            deleteTask(task.id);
            onClose();
          }}
          style={styles.iconButton}
          iconColor={theme.colors.error}
          size={24}
        />
        <IconButton
          icon="arrow-up"
          onPress={handleUpdateTask}
          style={styles.iconButton}
          iconColor={theme.colors.primary}
          size={24}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(dueDate)}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
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
    height: 40,
    backgroundColor: "white",
  },
  descriptionInput: {
    height: 60, // Increase height for description input
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  iconButton: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: primaryColor,
  },
  error: {
    color: "red",
    marginBottom: 10,
    paddingHorizontal: 16, // Add horizontal padding for error text
  },
});

export default EditTaskScreen;
