import { Action, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {Order} from '../../public/order/order.model';
import {loadAdminOrders, loadAdminOrdersFailure, loadAdminOrdersSuccess} from './admin-orders.actions';


export const adminOrdersFeatureKey = 'adminOrders';

export interface State {
  adminOrders: Order[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  adminOrders: []
};

export const reducer = createReducer(
  initialState,
  on(loadAdminOrders, (state) => state),
  on(loadAdminOrdersSuccess, (state, { adminOrders }) => ({
    ...state,
    adminOrders: adminOrders
  })),
  on(loadAdminOrdersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function adminOrdersReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
