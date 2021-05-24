export interface IApp {
  username: string;
  password: string;
  authenticationMessage: string;
}

export interface IAppState {
  AppState: IApp;
}

export const initialAppState: IApp = {
  username: null,
  password: null,
  authenticationMessage: null,
};
