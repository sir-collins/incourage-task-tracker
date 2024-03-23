import AsyncStorage from "@react-native-async-storage/async-storage";

export type AsyncStorage = {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
};

export const asyncStorage: AsyncStorage = {
  getItem: async (key) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (key, newValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  },
};
