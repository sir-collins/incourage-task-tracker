import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper"; // Import List from React Native Paper
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import { Portal, Modal } from "react-native-paper";
import EditTaskScreen from "../../screens/EditTaskScreen/EditTaskScreen";
import { format } from "date-fns";
import { primaryColor } from "../../constants/colors";

const TaskItem = ({ task }: { task: Task }) => {
  const [isChecked, setIsChecked] = useState(false);
  const taskStore = useTaskStore();

  useEffect(() => {
    setIsChecked(task.status === TaskStatus.Completed);
  }, [task.status]);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
    const updatedTask = {
      ...task,
      status: isChecked ? TaskStatus.Pending : TaskStatus.Completed,
    };
    taskStore.updateTask(task.id, updatedTask);
  };
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);

  const toggleEditTaskModal = () => {
    setIsEditTaskModalVisible(!isEditTaskModalVisible);
  };

  return (
    <>
      <List.Item
        title={task.title}
        description={
          <View style={styles.descriptionContainer}>
            <Text
              style={
                isChecked || task.status === TaskStatus.Completed
                  ? styles.checkedDescription
                  : styles.description
              }
            >
              {task.description}
            </Text>
            <Text
              style={
                isChecked || task.status === TaskStatus.Completed
                  ? styles.checkedDescription
                  : { fontSize: 13, color: primaryColor }
              }
            >
              {format(task.dueDate, "d MMMM")}
            </Text>
          </View>
        }
        titleStyle={
          isChecked || task.status === TaskStatus.Completed
            ? styles.checkedTitle
            : styles.title
        }
        descriptionStyle={
          isChecked || task.status === TaskStatus.Completed
            ? styles.checkedDueDate
            : styles.dueDate
        }
        onPress={toggleEditTaskModal}
        style={{
          backgroundColor: "white",
          padding: 8,
        }}
        left={() => (
          <TouchableOpacity onPress={handleCheckboxToggle}>
            <List.Icon
              icon={
                isChecked || task.status === TaskStatus.Completed
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
            />
          </TouchableOpacity>
        )}
      />

      <Portal>
        <Modal
          visible={isEditTaskModalVisible}
          onDismiss={toggleEditTaskModal}
          contentContainerStyle={styles.modalContent}
        >
          <EditTaskScreen task={task} onClose={toggleEditTaskModal} />
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  checkedTitle: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#808080",
  },
  dueDate: {
    fontSize: 13,
  },
  checkedDueDate: {
    fontSize: 13,
    color: "#808080",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 0,
    minWidth: "100%",
    alignSelf: "center", // Center horizontally
    maxHeight: "20%",
    justifyContent: "center", // Center vertically
  },
  descriptionContainer: {},
  description: {
    fontSize: 14,
    color: "#808080"
  },
  checkedDescription: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#808080",
  },
});

export default TaskItem;
