export interface IApp {
  username: string;
  password: string;
  authenticationMessage: string;
}

export interface IAppState {
  appState: IApp;
}

export const initialAppState: IApp = {
  username: null,
  password: null,
  authenticationMessage: null,
};

export interface IStory {
  id?: string;
  title: string;
  content: string;
}
