import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PublicActionsTypes } from './PublicActionsTypes';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user/user.service';
import { NotificationService } from '../core/notifications/notification.service';
import { LoadingBarActionTypes } from '../shared/loading-bar/loadingBarActionsTypes';

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

  /* Notifications */

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
      ofType(PublicActionsTypes.userClientRegister),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PublicActionsTypes.userClientRegisterSuccess,
        PublicActionsTypes.userClientRegisterFailure
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
