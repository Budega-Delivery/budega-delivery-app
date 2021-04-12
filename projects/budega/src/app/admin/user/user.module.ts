import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from './user.reducer';
import { UsersMainComponent } from './main/users-main.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersMainComponent, UserListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),
    TranslateModule,
    ReactiveComponentModule,
    SharedModule,
    RouterModule
  ],
  exports: [UserListComponent]
})
export class UserModule {}
