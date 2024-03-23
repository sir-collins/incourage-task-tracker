import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { List } from 'react-native-paper'; // Import List from React Native Paper
import { Task, TaskStatus } from "../../types/task";
import useTaskStore from "../../store/taskStore";
import { Portal, Modal } from 'react-native-paper';
import EditTaskScreen from "../../screens/EditTaskScreen/EditTaskScreen";

const TaskItem = ({ task }: { task: Task }) => {
  const [isChecked, setIsChecked] = useState(false);
  const taskStore = useTaskStore();

  useEffect(() => {
    setIsChecked(task.status === TaskStatus.Completed);
  }, [task.status]);

  const handleCheckboxToggle = () => {
    const updatedTask = { ...task, status: isChecked ? TaskStatus.Pending : TaskStatus.Completed };
    taskStore.updateTask(task.id, updatedTask);
  };
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);

  const toggleEditTaskModal = () => {
    setIsEditTaskModalVisible(!isEditTaskModalVisible);
  };

  return (<>
 
    <List.Item
      title={task.title}
      description={task.dueDate ? (new Date(task.dueDate)).toDateString() : ''}
      titleStyle={isChecked ? styles.checkedTitle : styles.title}
      descriptionStyle={isChecked ? styles.checkedDueDate : styles.dueDate}
      onPress={toggleEditTaskModal} // Handle press event to navigate to EditTaskScreen
      left={() => (
        <TouchableOpacity onPress={handleCheckboxToggle}>
          <List.Icon icon={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} />
        </TouchableOpacity>
      )}
    />

    <Portal>

        <Modal visible={isEditTaskModalVisible} onDismiss={toggleEditTaskModal} contentContainerStyle={styles.modalContent}>

          <EditTaskScreen task={task} onClose={toggleEditTaskModal} />
        </Modal>
      </Portal>

      </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    color: "#808080",
  },
  dueDate: {
    fontSize: 14,
  },
  checkedDueDate: {
    fontSize: 14,
    color: "#808080",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    minWidth: '100%',
    alignSelf: 'center', // Center horizontally
    maxHeight: '20%',
    justifyContent: 'center', // Center vertically
  },
});

export default TaskItem;
