import { createReducer, on, Action } from '@ngrx/store';
import { initialAppState, IApp } from '../stories.interface';
import { login, loginSuccess, loginFail } from '../actions/stories.action';

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState as IApp,
  on(login, (state) => ({
    ...state,
  })),
  on(loginSuccess, (state) => ({
    ...state,
    authenticationMessage: null,
  })),
  on(loginFail, (state, { message }) => ({
    ...state,
    authenticationMessage: message,
  }))
);

export function AppReducer(state: IApp, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}
