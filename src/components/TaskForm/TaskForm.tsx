import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TaskFormInput from './TaskFormInput';
import { Task, TaskStatus } from '../../types/task';
import DatePickerComponent from '../UI/DatePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const TaskForm = ({ onSubmit }: { onSubmit: (task: Task) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Task title is required');
      return;
    }
    
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      dueDate,
      status: TaskStatus.Pending,
    };
    onSubmit(newTask); 
    setDescription('');
    setDueDate(new Date());
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) { 
      const dateValue = new Date(selectedDate)
      console.log('dateValue::', dateValue)
      setDueDate(dateValue);
    }
  };

  return (
    <View style={styles.container}>
      <TaskFormInput
        label="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TaskFormInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <DatePickerComponent value={dueDate} onChange={handleDateChange} />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default TaskForm;
