import { Action, createReducer, on } from '@ngrx/store';
import { BudegaUser } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';
import {
  activeBudegaUser,
  activeBudegaUserFailure,
  activeBudegaUserSuccess,
  loadBudegaUsers,
  loadBudegaUsersFailure,
  loadBudegaUsersSuccess,
  loadBudegaUserToUpdate,
  loadBudegaUserToUpdateFailure,
  loadBudegaUserToUpdateSuccess,
  updateBudegaUser,
  updateBudegaUserFailure,
  updateBudegaUserSuccess
} from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  budegaUserList: BudegaUser[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  budegaUserList: []
};

export const reducer = createReducer(
  initialState,
  on(loadBudegaUsers, (state) => state),
  on(loadBudegaUsersSuccess, (state, { budegaUserList }) => ({
    ...state,
    budegaUserList: budegaUserList
  })),
  on(loadBudegaUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(loadBudegaUserToUpdate, (state, { id }) => ({ ...state, id })),
  on(loadBudegaUserToUpdateSuccess, (state, { editingBudegaUser }) => ({
    ...state,
    editingBudegaUser
  })),
  on(loadBudegaUserToUpdateFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(updateBudegaUser, (state, { budegaUser }) => ({ ...state, budegaUser })),
  on(updateBudegaUserSuccess, (state) => ({ ...state })),
  on(updateBudegaUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function userReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
