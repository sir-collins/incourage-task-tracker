import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../../types/task';

interface TaskItemStatusProps {
  task: Task;
}

const TaskItemStatus: React.FC<TaskItemStatusProps> = ({ task }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>{task.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  status: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskItemStatus;
