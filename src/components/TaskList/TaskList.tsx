import React from "react";
import { FlatList } from "react-native";
import { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";
interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
