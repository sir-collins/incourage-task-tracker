import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";

interface Props {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDeleteTask }) => {
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem task={item}/>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskList;
