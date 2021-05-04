import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { UserActionsTypes } from './UserActionsTypes';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';

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

  activeBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.activeBudegaUserAction),
      switchMap(({ budegaUserId, active }) =>
        this.userService.activeUser(budegaUserId, active).pipe(
          map(() => ({
            type: UserActionsTypes.activeBudegaUserSuccessAction
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.activeBudegaUserFailureAction,
              error
            })
          )
        )
      )
    )
  );

  loadBudegaUserToUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUserToUpdateAction),
      switchMap(({ id }) =>
        forkJoin({
          roles: this.userService.getRoles(),
          budegaUser: this.userService.getUserById(id)
        }).pipe(
          map((editingBudegaUser) => ({
            type: UserActionsTypes.loadBudegaUserToUpdateSuccessAction,
            editingBudegaUser
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaUserToUpdateFailureAction,
              error
            })
          )
        )
      )
    )
  );

  updateBudegaUserImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.updateBudegaUserImageAction),
      switchMap(({ budegaUser, image }) =>
        this.userService.updateBudegaUserImage(budegaUser, image).pipe(
          map(
            () => ({
              type: UserActionsTypes.updateBudegaUserImageSuccessAction
            }),
            catchError((error) =>
              of({
                type: UserActionsTypes.updateBudegaUserImageFailureAction,
                error
              })
            )
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
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  activeBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.activeBudegaUserSuccessAction),
        map(() =>
          this.translateService
            .get('budega.user.active.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  activeBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.activeBudegaUserFailureAction),
        map(() =>
          this.translateService
            .get('budega.user.inactive.success')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  updateBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActionsTypes.updateBudegaUserSuccessAction,
          UserActionsTypes.updateBudegaUserImageSuccessAction
        ),
        map(() =>
          this.translateService
            .get('budega.user.update.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  updateBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActionsTypes.updateBudegaUserFailureAction,
          UserActionsTypes.updateBudegaUserImageFailureAction
        ),
        map(() =>
          this.translateService
            .get('budega.user.register.failure')
            .subscribe((res) => this.notificationService.error(res))
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
        UserActionsTypes.updateBudegaUserImageAction,
        UserActionsTypes.activeBudegaUserAction
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        /* success */
        UserActionsTypes.registerBudegaUserSuccessAction,
        UserActionsTypes.loadBudegaUsersSuccessAction,
        UserActionsTypes.loadBudegaUserToUpdateSuccessAction,
        UserActionsTypes.updateBudegaUserSuccessAction,
        UserActionsTypes.updateBudegaUserImageSuccessAction,
        UserActionsTypes.activeBudegaUserSuccessAction,
        /* failures */
        UserActionsTypes.registerBudegaUserFailureAction,
        UserActionsTypes.loadBudegaUsersFailureAction,
        UserActionsTypes.loadBudegaUserToUpdateFailureAction,
        UserActionsTypes.updateBudegaUserFailureAction,
        UserActionsTypes.updateBudegaUserImageFailureAction,
        UserActionsTypes.activeBudegaUserFailureAction
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
