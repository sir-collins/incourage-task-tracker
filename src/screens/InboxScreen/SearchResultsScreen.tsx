import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import useTaskStore from "../../store/taskStore";
import TaskItem from "../../components/TaskItem/TaskItem";

const SearchResultsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { searchResults, searchTasks, clearSearchResults } = useTaskStore();
  const [searchText, setSearchText] = useState(route.params?.searchText || "");
  const searchbarRef = useRef<any>(null); 

  useEffect(() => {
    searchbarRef.current?.focus();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    searchTasks(text);
  };
  const handleCancel = () => {
    clearSearchResults();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          ref={searchbarRef}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchText}
          style={styles.searchBar}
        />
        <Button onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}> Cancel </Text>
        </Button>
      </View>
      {/* Display the search results here */}
      {searchResults.map((task, index) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flex: 1,
    marginRight: 0,
    borderRadius: 5,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cancelText: {
    fontSize: 13,
  },
  cancelButton: {
    margin: 0,
    padding: 0,
  },
});

export default SearchResultsScreen;
