import { Action } from '@ngrx/store';
import { IUser } from '../../model/users.interface';

export enum UsersActionTypes {
  SAVE_USER = '[Users] Save User',
  LOAD_USERS = '[Users] Load users',
}

export class SaveUser implements Action {
  readonly type = UsersActionTypes.SAVE_USER;
  constructor(public user: IUser) {}
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LOAD_USERS;
}

export type UsersAction = SaveUser | LoadUsers;
