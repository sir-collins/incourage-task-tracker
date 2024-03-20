import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import { TextStyle } from "react-native";

const TaskItem = ({
  task,
}: {
  task: Task;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const taskStore = useTaskStore();

  const handleCheckboxToggle = () => {
    const updatedTask = { ...task, status: isChecked ? TaskStatus.Pending : TaskStatus.Completed };
    taskStore.updateTask(task.id, updatedTask);
  };

  useEffect(() => {
    setIsChecked(task.status === TaskStatus.Completed);
  }, [task.status]);

  // Check if task.dueDate is a valid Date object before calling toDateString()
  const dueDateString = task.dueDate ? (new Date(task.dueDate)).toDateString() : '';



  const strikeThroughStyle: TextStyle | null = isChecked ? { textDecorationLine: "line-through", color: "#808080"} : null;
  const dueDateColor: TextStyle = { color: isChecked ? "#808080" : "#007bff" };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        toggleCheckbox();
        handleCheckboxToggle();
      }} style={styles.checkbox}>
        {isChecked && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, strikeThroughStyle]}>{task.title}</Text>
        {/* Display due date only if it's a valid Date object */}
        {dueDateString && <Text style={[styles.dueDate, dueDateColor]}>{dueDateString}</Text>}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 10,
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: "#808080",
    fontSize: 18,
  },
});

export default TaskItem;
