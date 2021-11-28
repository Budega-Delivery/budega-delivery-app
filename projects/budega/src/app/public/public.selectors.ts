import { createSelector, MetaReducer } from '@ngrx/store';
import { Product } from '../admin/product/models/models';
import { initPublicStateFromLocalStorage } from '../core/meta-reducers/init-state-from-local-storage.reducer';

export interface PublicState {
  productList: Product[];
  cart: string[];
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
