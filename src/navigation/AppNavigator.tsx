import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen/CreateTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen/EditTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen/TaskDetailsScreen';
import { RootStackParamList } from './types';



const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', 
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;