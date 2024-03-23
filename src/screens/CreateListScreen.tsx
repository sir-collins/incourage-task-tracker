import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import useTaskStore from '../store/taskStore';

interface CreateListScreenProps {
  onClose: () => void;
}

const CreateListScreen: React.FC<CreateListScreenProps> = ({ onClose }) => {
  const { createList } = useTaskStore();
  const [listLabel, setListLabel] = useState('');
  const [error, setError] = useState('');

  const handleCreateList = () => {
    if (!listLabel.trim()) {
      setError('List label is required');
      return;
    }

    createList(listLabel.trim());
    onClose();
    setListLabel('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter list label"
          value={listLabel}
          onChangeText={(text) => setListLabel(text)}
          style={styles.input}
        />
      </View>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <IconButton
          icon="close"
          onPress={onClose}
          style={[styles.iconButton]}
        />
        <IconButton
          icon="check"
          onPress={handleCreateList}
          style={[styles.iconButton]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default CreateListScreen;