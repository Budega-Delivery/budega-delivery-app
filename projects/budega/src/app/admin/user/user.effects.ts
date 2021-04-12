import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { UserActionsTypes } from './UserActionsTypes';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserEffects {
  registerBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.budegaUserRegister),
      switchMap(({ client }) =>
        this.userService.addUserClient(client).pipe(
          map(() => ({ type: UserActionsTypes.budegaUserRegisterSuccess })),
          catchError((err) =>
            of({
              type: UserActionsTypes.budegaUserRegisterFailure,
              err
            })
          )
        )
      )
    )
  );

  loadBudegaUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUsers),
      switchMap(() =>
        this.userService.getUserList().pipe(
          map((budegaUserList) => ({
            type: UserActionsTypes.loadBudegaUsersSuccess,
            budegaUserList
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaUsersFailure,
              error
            })
          )
        )
      )
    )
  );

  /* Notifications */

  registerBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.budegaUserRegisterSuccess),
        map(() =>
          this.translateService
            .get('budega.user.register.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  registerBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.budegaUserRegisterFailure),
        map(() =>
          this.translateService
            .get('budega.user.register.failure')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  /* Loading Bar */

  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActionsTypes.budegaUserRegister,
        UserActionsTypes.loadBudegaUsers
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActionsTypes.budegaUserRegisterSuccess,
        UserActionsTypes.budegaUserRegisterFailure,
        UserActionsTypes.loadBudegaUsersSuccess,
        UserActionsTypes.loadBudegaUsersFailure
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
