import { Action, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const publicFeatureKey = 'public';

export interface State {
  // usersList: BudegaUser[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  // usersList: []
};

export const reducer = createReducer(
  initialState
  // on(loadUsers, (state) => state),
  // on(loadUsersSuccess, (state, { usersList }) => ({
  //   ...state,
  //   usersList: usersList
  // })),
  // on(loadUsersFailure, (state, { error }) => ({
  //   ...state,
  //   error: error
  // }))
);

export function publicReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
