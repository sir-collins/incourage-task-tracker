
import useTaskStore from '../../src/store/taskStore';

describe('taskStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    it('should add a task to the store', () => {
      const mockTask = { id: '1', title: 'Test Task' };
      useTaskStore.getState().addTask(mockTask);
      expect(useTaskStore.getState().tasks).toContainEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task in the store', () => {
      const mockTask = { id: '1', title: 'Test Task' };
      useTaskStore.getState().addTask(mockTask);
      const updatedTask = { ...mockTask, title: 'Updated Task' };
      useTaskStore.getState().updateTask('1', updatedTask);
      expect(useTaskStore.getState().tasks).toContainEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task from the store', () => {
      const mockTask = { id: '1', title: 'Test Task' };
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().deleteTask('1');
      expect(useTaskStore.getState().tasks).not.toContainEqual(mockTask);
    });
  });

  describe('searchTasks', () => {
    it('should update searchResults with filtered tasks', () => {
      const mockTask = { id: '1', title: 'Test Task' };
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().searchTasks('Test');
      expect(useTaskStore.getState().searchResults).toContainEqual(mockTask);
    });
  });
});
