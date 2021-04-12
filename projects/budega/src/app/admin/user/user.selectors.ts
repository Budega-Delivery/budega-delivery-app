import { createSelector } from '@ngrx/store';
import { BudegaUser } from './models/models';

export interface BudegaUserState {
  budegaUserList: BudegaUser[];
}

export interface AppState {
  user: BudegaUserState;
}

export const selectBudegaUsers = (state: AppState) => state.user;

export const selectBudegaUserList = createSelector(
  selectBudegaUsers,
  (state: BudegaUserState) => state.budegaUserList
);
