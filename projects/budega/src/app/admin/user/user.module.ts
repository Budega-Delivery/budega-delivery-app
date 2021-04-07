import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from './user.reducer';

@NgModule({
  declarations: [MainComponent, UserListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: []
})
export class UserModule {}
