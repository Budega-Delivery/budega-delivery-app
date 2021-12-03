import { createAction, props } from '@ngrx/store';
import { PublicActionsTypes } from './PublicActionsTypes';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientUser } from '../admin/user/models/models';
import { Product } from '../admin/product/models/models';
import { CartItem } from './public.selectors';

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

export const loadProducts = createAction(
  PublicActionsTypes.loadAvailableProducts
);

export const loadProductsSuccess = createAction(
  PublicActionsTypes.loadAvailableProductsSuccess,
  props<{ productList: Product[] }>()
);

export const loadProductsFailure = createAction(
  PublicActionsTypes.loadAvailableProductsFailure,
  props<{ error: HttpErrorResponse }>()
);

export const addProductToCart = createAction(
  PublicActionsTypes.addProductToCart,
  props<{ product: Product }>()
);

export const removeProductFromCart = createAction(
  PublicActionsTypes.removeProductFromCart,
  props<{ product: Product }>()
);

export const addProductToCartSuccess = createAction(
  PublicActionsTypes.addProductToCartSuccess,
  props<{ cart: Map<string, CartItem> }>()
);

export const removeProductFromCartSuccess = createAction(
  PublicActionsTypes.removeProductFromCartSuccess,
  props<{ cart: Map<string, CartItem> }>()
);

export const removeProductFromFailure = createAction(
  PublicActionsTypes.removeProductFromCartFailure
);

export const addProductToCartFailure = createAction(
  PublicActionsTypes.addProductToCartFailure
);

export const loadClientCart = createAction(PublicActionsTypes.loadClientCart);

export const loadClientCardSuccess = createAction(
  PublicActionsTypes.loadClientCardSuccess,
  props<{ cart: Map<string, CartItem> }>()
);

export const loadClientCardFailure = createAction(
  PublicActionsTypes.loadClientCardFailure
);
