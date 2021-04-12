import { createAction, props } from '@ngrx/store';
import { PublicActionsTypes } from './PublicActionsTypes';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientUser } from '../admin/user/models/models';

export const userClientRegister = createAction(
  PublicActionsTypes.userClientRegister,
  props<{ client: ClientUser }>()
);

export const userClientRegisterSuccess = createAction(
  PublicActionsTypes.userClientRegisterSuccess
);
export const userClientRegisterFailure = createAction(
  PublicActionsTypes.userClientRegisterFailure,
  props<{ error: HttpErrorResponse }>()
);
