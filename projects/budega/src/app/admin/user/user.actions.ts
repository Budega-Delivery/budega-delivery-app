import { createAction, props } from '@ngrx/store';
import { UserActionsTypes } from './UserActionsTypes';
import { ClientUser, BudegaUser } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';

export const loadUsers = createAction(UserActionsTypes.loadUsers);

export const loadUsersSuccess = createAction(
  UserActionsTypes.loadUsersSuccess,
  props<{ usersList: BudegaUser[] }>()
);

export const loadUsersFailure = createAction(
  UserActionsTypes.loadUsersFailure,
  props<{ error: HttpErrorResponse }>()
);

export const userClientRegister = createAction(
  UserActionsTypes.userClientRegister,
  props<{ client: ClientUser }>()
);

export const userClientRegisterSuccess = createAction(
  UserActionsTypes.userClientRegisterSuccess
);
export const userClientRegisterFailure = createAction(
  UserActionsTypes.userClientRegisterFailure
);
