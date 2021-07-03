import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users.reducer';

export const getUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const getCurrentUser = createSelector(
  getUsersState,
  (state: UsersState) => state.currentUser
);

const getAllUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.users
);

export const usersQuery = {
  getCurrentUser,
  getAllUsers,
};
