import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';
export interface AppState {
  users: fromUsers.UsersState;
}
export const appReducer: ActionReducerMap<AppState> = {
  users: fromUsers.reducer,
};
