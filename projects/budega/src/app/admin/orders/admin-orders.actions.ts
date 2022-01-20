import { createAction, props } from '@ngrx/store';
import { AdminOrdersActionsTypes } from './AdminOrdersActionsTypes';
import { HttpErrorResponse } from '@angular/common/http';
import {Order} from '../../public/order/order.model';

export const loadAdminOrders = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersAction
);

export const loadAdminOrdersSuccess = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersSuccessAction,
  props<{ adminOrders: Order[] }>()
);

export const loadAdminOrdersFailure = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersFailureAction,
  props<{ error: HttpErrorResponse }>()
);