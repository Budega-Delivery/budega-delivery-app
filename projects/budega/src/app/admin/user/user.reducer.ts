import { Action, createReducer, on } from '@ngrx/store';
import { BudegaUser } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  usersList: BudegaUser[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  usersList: []
};

export const reducer = createReducer(
  initialState,
  on(loadUsers, (state) => state),
  on(loadUsersSuccess, (state, { usersList }) => ({
    ...state,
    usersList: usersList
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
);

export function userReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
