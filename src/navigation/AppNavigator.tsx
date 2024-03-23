import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen/TaskDetailsScreen";
import InboxScreen from "../screens/InboxScreen/InboxScreen";
import { RootStackParamList, DrawerParamList } from "./types";
import CustomDrawerContent from "./CustomDrawerContent";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const InboxStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen name="Inbox" component={InboxScreen} />
    <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Drawer.Navigator initialRouteName="InboxStack" >
    <Drawer.Screen
      name="All"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <FontAwesome name="home" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="InboxStack"
      component={InboxStack}
      options={{
        drawerLabel: "Inbox",
        drawerIcon: ({ color, size }) => (
          <FontAwesome name="inbox" size={size} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;

const styles = StyleSheet.create({
  listsHeading: {
    fontWeight: "bold",
    marginLeft: 16,
    marginVertical: 8,
  },
});
