export type RootStackParamList = {
    Home: undefined;
    CreateTask: undefined;
    EditTask: { taskId: string };
    TaskDetails: { taskId: string };
  };