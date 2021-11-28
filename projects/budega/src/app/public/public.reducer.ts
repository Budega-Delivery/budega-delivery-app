import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../admin/product/models/models';
import {
  addProductToCart,
  addProductToCartSuccess,
  loadClientCardSuccess,
  loadClientCart,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  removeProductFromCart,
  removeProductFromCartSuccess
} from './public.actions';
import { initPublicStateFromLocalStorage } from '../core/meta-reducers/init-state-from-local-storage.reducer';
import { AppState } from './public.selectors';

export const publicFeatureKey = 'public';

export const reducers: ActionReducerMap<AppState> = {
  public: publicReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initPublicStateFromLocalStorage
];

export interface State {
  productList: Product[];
  cart: string[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  productList: [],
  cart: []
};

export const reducer = createReducer(
  initialState,
  on(loadProducts, (state) => state),
  on(loadProductsSuccess, (state, { productList }) => ({
    ...state,
    productList
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(addProductToCart, (state, { id }) => ({
    ...state,
    id
  })),
  on(addProductToCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(removeProductFromCart, (state, { id }) => ({
    ...state,
    id
  })),
  on(removeProductFromCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(loadClientCart, (state) => state),
  on(loadClientCardSuccess, (state, { cart }) => ({
    ...state,
    cart
  }))
);

export function publicReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
