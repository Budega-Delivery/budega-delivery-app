import { createAction, props } from '@ngrx/store';
import { UserActionsTypes } from './UserActionsTypes';
import { BudegaUser } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';

export const loadBudegaUsers = createAction(UserActionsTypes.loadBudegaUsers);

export const loadBudegaUsersSuccess = createAction(
  UserActionsTypes.loadBudegaUsersSuccess,
  props<{ budegaUserList: BudegaUser[] }>()
);

export const loadBudegaUsersFailure = createAction(
  UserActionsTypes.loadBudegaUsersFailure,
  props<{ error: HttpErrorResponse }>()
);

export const budegaUserRegister = createAction(
  UserActionsTypes.budegaUserRegister,
  props<{ budegaUser: BudegaUser }>()
);

export const budegaUserRegisterSuccess = createAction(
  UserActionsTypes.budegaUserRegisterSuccess
);
export const budegaUserRegisterFailure = createAction(
  UserActionsTypes.budegaUserRegisterFailure
);
