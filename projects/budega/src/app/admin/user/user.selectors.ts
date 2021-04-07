import { createSelector } from '@ngrx/store';
import { BudegaUser } from './models/models';

export interface UserState {
  usersList: BudegaUser[];
}

export interface AppState {
  user: UserState;
}

export const selectUsers = (state: AppState) => state.user;

export const selectUsersList = createSelector(
  selectUsers,
  (state: UserState) => state.usersList
);
