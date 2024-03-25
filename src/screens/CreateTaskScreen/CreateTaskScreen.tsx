import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme, TextInput, IconButton } from "react-native-paper";
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { primaryColor } from "../../constants/colors";

interface CreateTaskScreenProps {
  onClose: () => void;
}

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ onClose }) => {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
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

  const handleCreateTask = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const newTask: Task = {
      id: String(Math.random()),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate,
      status: TaskStatus.Pending,
    };

    addTask(newTask);
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
          icon="arrow-up"
          onPress={handleCreateTask}
          iconColor={theme.colors.primary}
          size={24}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionInput: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  addButton: {
    color: "green",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: primaryColor,
  },
});

export default CreateTaskScreen;
