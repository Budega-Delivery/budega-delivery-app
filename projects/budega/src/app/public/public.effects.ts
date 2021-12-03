import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { PublicActionsTypes } from './PublicActionsTypes';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user/user.service';
import { NotificationService } from '../core/notifications/notification.service';
import { LoadingBarActionTypes } from '../shared/loading-bar/loadingBarActionsTypes';
import { of } from 'rxjs';
import { ProductService } from '../service/product/product.service';
import { Product } from '../admin/product/models/models';
import { AppState, CartItem, selectCart } from './public.selectors';
import { select, Store } from '@ngrx/store';
import { LocalStorageService } from '../core/local-storage/local-storage.service';

export const PUBLIC_CART_KEY = 'CART';

@Injectable()
export class PublicEffects {
  registerClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicActionsTypes.userClientRegister),
      exhaustMap(({ client }) =>
        this.userService.addUserClient(client).pipe(
          map(() => ({ type: PublicActionsTypes.userClientRegisterSuccess })),
          catchError(
            map((err) => ({
              type: PublicActionsTypes.userClientRegisterFailure,
              err
            }))
          )
        )
      )
    )
  );

  loadAvailableProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicActionsTypes.loadAvailableProducts),
      switchMap(() =>
        this.productService.getProductList().pipe(
          map((productList) => ({
            type: PublicActionsTypes.loadAvailableProductsSuccess,
            productList
          })),
          catchError((error) =>
            of({
              type: PublicActionsTypes.loadAvailableProductsFailure,
              error
            })
          )
        )
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicActionsTypes.addProductToCart),
      withLatestFrom(this.publicStore.select(selectCart)),
      // @ts-ignore
      map(([action, cart]) => addToCart(action.product, cart)),
      map((newCart) => ({
        type: PublicActionsTypes.addProductToCartSuccess,
        cart: newCart
      }))
    )
  );

  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicActionsTypes.removeProductFromCart),
      withLatestFrom(this.publicStore.select(selectCart)),
      // @ts-ignore
      map(([action, cart]) => removeFromCart(action.product, cart)),
      map((newCart) => ({
        type: PublicActionsTypes.removeProductFromCartSuccess,
        cart: newCart
      }))
    )
  );

  loadClientCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicActionsTypes.loadClientCart),
      map(() => ({
        type: PublicActionsTypes.loadClientCardSuccess,
        cart:
          new Map(
            Object.entries(this.localStorageService.getItem(PUBLIC_CART_KEY))
          ) || new Map<string, CartItem>()
      }))
    )
  );

  persistCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PublicActionsTypes.addProductToCartSuccess,
          PublicActionsTypes.removeProductFromCartSuccess
        ),
        withLatestFrom(this.publicStore.select(selectCart)),
        map(([action, cart]) =>
          this.localStorageService.setItem(
            PUBLIC_CART_KEY,
            Object.fromEntries(cart)
          )
        )
      ),
    { dispatch: false }
  );

  /* Notifications */

  loadAvailableProductsNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PublicActionsTypes.loadAvailableProductsFailure),
        map(() =>
          this.translateService
            .get('budega.client.loadproducts.failure')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  registerClientSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PublicActionsTypes.userClientRegisterSuccess),
        map(() =>
          this.translateService
            .get('budega.client.register.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  registerClientFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PublicActionsTypes.userClientRegisterFailure),
        map(() =>
          this.translateService
            .get('budega.client.register.failure')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  /* Loading Bar */

  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PublicActionsTypes.userClientRegister,
        PublicActionsTypes.loadAvailableProducts
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PublicActionsTypes.userClientRegisterSuccess,
        PublicActionsTypes.userClientRegisterFailure,

        PublicActionsTypes.loadAvailableProductsFailure,
        PublicActionsTypes.loadAvailableProductsSuccess
      ),
      map(() => ({ type: LoadingBarActionTypes.hideIndeterminateLoading }))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private productService: ProductService,
    private publicStore: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}
}

const addToCart = (
  product: Product,
  cart: Map<string, CartItem>
): Map<string, CartItem> => {
  if (cart.get(product._id)) cart.get(product._id).amount++;
  else cart.set(product._id, { amount: 1, product: product });
  return cart;
};
const removeFromCart = (
  product: Product,
  cart: Map<string, CartItem>
): Map<string, CartItem> => {
  if (cart.get(product._id)) {
    cart.get(product._id).amount--;
    if (cart.get(product._id).amount === 0) cart.delete(product._id);
  }
  return cart;
};

const purgeFromCart = (
  product: Product,
  cart: Map<string, CartItem>
): Map<string, CartItem> => {
  if (cart.get(product._id)) cart.delete(product._id);
  return cart;
};
