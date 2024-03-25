import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncStorage } from '../../src/utils/storageUtils';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('asyncStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getItem', () => {
    it('should return parsed value when item is found', async () => {
      const mockValue = { foo: 'bar' };
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockValue));
      const value = await asyncStorage.getItem('test');
      expect(value).toEqual(mockValue);
    });
  });

  describe('setItem', () => {
    it('should call AsyncStorage.setItem with stringified value', async () => {
      const mockValue = { foo: 'bar' };
      await asyncStorage.setItem('test', mockValue);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify(mockValue));
    });
  });

  describe('removeItem', () => {
    it('should call AsyncStorage.removeItem with the provided key', async () => {
      await asyncStorage.removeItem('test');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('test');
    });
  });
});