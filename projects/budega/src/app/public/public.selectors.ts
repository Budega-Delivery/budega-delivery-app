import { createSelector, MetaReducer } from '@ngrx/store';
import { Product } from '../admin/product/models/models';

export interface CartItem {
  amount: number;
  product: Product;
}

export interface PublicState {
  productList: Product[];
  cart: Map<string, CartItem>;
}

export interface AppState {
  public: PublicState;
}

export const selectPublic = (state: AppState) => state.public;

export const selectAvailableProducts = createSelector(
  selectPublic,
  (state: PublicState) => state.productList
);

export const selectCart = createSelector(
  selectPublic,
  (state: PublicState) => state.cart
);
