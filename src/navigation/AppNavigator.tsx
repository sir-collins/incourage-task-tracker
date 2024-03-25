import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { Icon, IconButton, useTheme } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen/TaskDetailsScreen";
import InboxScreen from "../screens/InboxScreen/InboxScreen";
import { RootStackParamList, DrawerParamList } from "./types";
import SearchResultsScreen from "../screens/InboxScreen/SearchResultsScreen";
import { Platform, View, Image, Text, TouchableOpacity } from "react-native";
import { getContrastTextColor, primaryColor } from "../constants/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const InboxStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Inbox" component={InboxScreen} />
    <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    <Stack.Screen name="Search" component={SearchResultsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="InboxStack"
      screenOptions={({ navigation }) => ({
        drawerActiveBackgroundColor: colors.secondary,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        headerTitleStyle: {
          color: colors.primary,
          alignSelf: "center",
        },
        headerLeft: (props) => (
          <FontAwesome
            name="bars"
            size={24}
            color={colors.primary}
            onPress={navigation.toggleDrawer}
            style ={{paddingLeft: 8}}
          />
        ),
      })}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: colors.secondary }}
          >
            <Image
              source={require("../../assets/logo-incourage.png")}
              style={{
                width: 100,
                height: 50,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                width: 100,
                fontSize: 12,
                fontWeight: "300",
                alignSelf: "center",
                color: getContrastTextColor(colors.secondary),
              }}
            >
              Simplifying Tasks
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: 10,
                marginTop: Platform.OS === "android" ? 40 : 30,
              }}
            >
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
        </View>
      )}
    >
      <Drawer.Screen
        name="All"
        component={HomeScreen}
        options={{
          drawerLabel: "All",
          title: "All",
          headerTitleAlign: "center",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          drawerLabel: "Inbox",
          title: "Inbox",
          headerTitleAlign: "center",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="inbox" size={size} color={colors.primary} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
