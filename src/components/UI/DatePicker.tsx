import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import TaskFormInput from "../TaskForm/TaskFormInput";

interface Props {
  value: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

const DatePickerComponent: React.FC<Props> = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDatePicked = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const { type } = event;
    if(type !== 'set'){return;}
    if(Platform.OS === 'android') {
      togglePicker();
    }
    if (selectedDate) {
      onChange(event, selectedDate);
      setShowPicker(false);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const renderIOSButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setShowPicker(false)}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(false)}>
          <Text style={styles.confirmButton}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={togglePicker}>
      {/* <TextInput  style={styles.textInputText}>
        {value.toLocaleString()}
      </TextInput> */}
      <TaskFormInput
        label="Set the Due Date"
        value={value.toLocaleString()}
        onChangeText={(e)=>{console.log("event::", e)}}
        onPressIn={togglePicker}
        editable = {false}
      />
      {showPicker && (
        <View>
          {Platform.OS === 'ios' && renderIOSButtons()}
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode="date"
            display="spinner"
            onChange={handleDatePicked}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cancelButton: {
    color: "red",
  },
  confirmButton: {
    color: "blue",
  },
});

export default DatePickerComponent;
