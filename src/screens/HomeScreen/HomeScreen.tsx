import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Collapsible from 'react-native-collapsible'; 
import TaskList from '../../components/TaskList/TaskList';
import { TaskStatus } from '../../types/task';
import useTaskStore from '../../store/taskStore';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { getTodayTasks, getTomorrowTasks, getThisWeekTasks, getTasksByStatus, deleteTask } = useTaskStore();
  const [isTomorrowCollapsed, setIsTomorrowCollapsed] = useState(true);
  const [isThisWeekCollapsed, setIsThisWeekCollapsed] = useState(true);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(true);

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <View style={styles.container}>
      {/* Today Section */}
      <Text style={styles.sectionTitle}>Today</Text>
      <TaskList tasks={getTodayTasks()} onDeleteTask={handleDeleteTask} />

      {/* Tomorrow Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsTomorrowCollapsed(!isTomorrowCollapsed)}>
        <Text style={styles.sectionTitle}>Tomorrow</Text>
        <FontAwesome name={isTomorrowCollapsed ? 'caret-down' : 'caret-up'} size={24} color="green" />
      </TouchableOpacity>
      <Collapsible collapsed={isTomorrowCollapsed}>
        <TaskList tasks={getTomorrowTasks()} onDeleteTask={handleDeleteTask} />
      </Collapsible>

      {/* This Week Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsThisWeekCollapsed(!isThisWeekCollapsed)}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <FontAwesome name={isThisWeekCollapsed ? 'caret-down' : 'caret-up'} size={24} color="green" />
      </TouchableOpacity>
      <Collapsible collapsed={isThisWeekCollapsed}>
        <TaskList tasks={getThisWeekTasks()} onDeleteTask={handleDeleteTask} />
      </Collapsible>

      {/* Completed Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsCompletedCollapsed(!isCompletedCollapsed)}>
        <Text style={styles.sectionTitle}>Completed</Text>
        <FontAwesome name={isCompletedCollapsed ? 'caret-down' : 'caret-up'} size={24} color="green" />
      </TouchableOpacity>
      <Collapsible collapsed={isCompletedCollapsed}>
        <TaskList tasks={getTasksByStatus(TaskStatus.Completed)} onDeleteTask={handleDeleteTask} />
      </Collapsible>

      {/* Create Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <FontAwesome name="plus" size={17} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'green',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
