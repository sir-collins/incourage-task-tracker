import React from 'react';
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import Input from '../UI/Input';

interface TaskFormInputProps {
  label: string;
  value: string;
  editable?: boolean;
  onChangeText: (text: string) => void;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const TaskFormInput: React.FC<TaskFormInputProps> = ({ label, value, editable = true, onChangeText, onPressIn }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        editable = {editable}
        style={styles.input}
        onPressIn={onPressIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    marginTop: 5,
  },
});

export default TaskFormInput;
