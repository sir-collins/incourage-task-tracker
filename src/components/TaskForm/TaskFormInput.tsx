import React from 'react';
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import Input from '../UI/Input';

interface TaskFormInputProps {
  label: string;
  value: string;
  editable?: boolean;
  onChangeText: (text: string) => void;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  multiline?: boolean; // New prop for multiline capability
}

const TaskFormInput: React.FC<TaskFormInputProps> = ({ label, value, editable = true, onChangeText, onPressIn, multiline = false }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        style={[styles.input, multiline && styles.multiline]} // Apply multiline style if enabled
        onPressIn={onPressIn}
        multiline={multiline} // Pass multiline prop to Input component
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
  multiline: {
    height: 100, // Customize height for multiline input
    textAlignVertical: 'top', // Start text from top for multiline input
  },
});

export default TaskFormInput;
