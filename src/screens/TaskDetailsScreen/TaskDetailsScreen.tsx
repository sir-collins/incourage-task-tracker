import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskDetailsScreen = ({ route }: { route: any }) => {
  // Extract task details from route params
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.dueDate}>Due Date: {task.dueDate}</Text>
      <Text style={styles.status}>Status: {task.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#555',
  },
});

export default TaskDetailsScreen;
