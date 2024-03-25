export type RootStackParamList = {
    Home: undefined;
    CreateTask: undefined;
    Inbox: undefined; 
    Search: undefined;
    ListView: undefined;
    EditTask: { taskId: string };
    TaskDetails: { taskId: string };
  };

  export type DrawerParamList = {
    All: undefined;
    Home: undefined;
    Inbox: undefined;
    ListView: undefined;
    InboxStack: undefined;
    ListViewStack: undefined;
   
    CreateTask: undefined;
  };