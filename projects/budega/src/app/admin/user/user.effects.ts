import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { UserActionsTypes } from './UserActionsTypes';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductsActionsTypes } from '../product/productsActionsTypes';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  registerClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.userClientRegister),
      exhaustMap(({ client }) =>
        this.userService.addUserClient(client).pipe(
          map(() => ({ type: UserActionsTypes.userClientRegisterSuccess })),
          catchError(
            map((err) => ({
              type: UserActionsTypes.userClientRegisterFailure,
              err
            }))
          )
        )
      )
    )
  );

  /* Notifications */

  registerClientSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.addProductSuccessAction),
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
        ofType(ProductsActionsTypes.addProductSuccessAction),
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
      ofType(UserActionsTypes.userClientRegister, UserActionsTypes.loadUsers),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActionsTypes.userClientRegisterSuccess,
        UserActionsTypes.userClientRegisterFailure,
        UserActionsTypes.loadUsersSuccess,
        UserActionsTypes.loadUsersFailure
      ),
      map(() => ({ type: LoadingBarActionTypes.hideIndeterminateLoading }))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) {}
}
