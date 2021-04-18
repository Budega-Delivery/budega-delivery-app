import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { UserActionsTypes } from './UserActionsTypes';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  registerBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.registerBudegaUserAction),
      switchMap(({ client }) =>
        this.userService.addUserClient(client).pipe(
          map(() => ({
            type: UserActionsTypes.registerBudegaUserSuccessAction
          })),
          catchError((err) =>
            of({
              type: UserActionsTypes.registerBudegaUserFailureAction,
              err
            })
          )
        )
      )
    )
  );

  loadBudegaUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUsersAction),
      switchMap(() =>
        this.userService.getUserList().pipe(
          map((budegaUserList) => ({
            type: UserActionsTypes.loadBudegaUsersSuccessAction,
            budegaUserList
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaUsersFailureAction,
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
        ofType(UserActionsTypes.registerBudegaUserSuccessAction),
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
        ofType(UserActionsTypes.registerBudegaUserFailureAction),
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
        UserActionsTypes.registerBudegaUserAction,
        UserActionsTypes.loadBudegaUsersAction,
        UserActionsTypes.loadBudegaUserToUpdateAction,
        UserActionsTypes.updateBudegaUserAction,
        UserActionsTypes.updateBudegaUserImageAction
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActionsTypes.registerBudegaUserSuccessAction,
        UserActionsTypes.registerBudegaUserFailureAction,
        UserActionsTypes.loadBudegaUsersSuccessAction,
        UserActionsTypes.loadBudegaUserToUpdateFailureAction,
        UserActionsTypes.updateBudegaUserSuccessAction,
        UserActionsTypes.updateBudegaUserImageFailureAction
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
