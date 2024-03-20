import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: any;
}

const Input: React.FC<InputProps> = ({ style, ...props }) => {
  return <TextInput {...props} style={[styles.input, style]} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Input;
