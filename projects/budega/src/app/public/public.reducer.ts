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
import { AppState, CartItem } from './public.selectors';

export const publicFeatureKey = 'public';

export const reducers: ActionReducerMap<AppState> = {
  public: publicReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initPublicStateFromLocalStorage
];

export interface State {
  productList: Product[];
  cart: Map<string, CartItem>;
  error?: HttpErrorResponse;
}

export const initialState: State = {
  productList: [],
  cart: new Map<string, CartItem>()
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
  on(addProductToCart, (state, { product }) => ({
    ...state,
    product
  })),
  on(addProductToCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(removeProductFromCart, (state, { product }) => ({
    ...state,
    product
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
