import { SchedulerAction } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/users.interface';
import { UsersAction, UsersActionTypes } from './users.action';
export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  loaded: boolean;
  currentUser: IUser;
  users: IUser[];
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialState: UsersState = {
  loaded: false,
  currentUser: {
    uid: null,
    firstName: null,
    lastName: null,
    biography: null,
    displayName: null,
    email: null,
    emailVerified: null,
    phoneNumber: null,
    photoURL: null,
  },
  users: [],
};

export function reducer(
  state: UsersState = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UsersActionTypes.SAVE_USER: {
      const currentUser = action.user;
      return {
        ...state,
        currentUser,
      };
    }
    default: {
      return { ...state };
    }
  }
}
