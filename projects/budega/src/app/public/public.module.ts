import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main/main.component';
import { PublicRoutingModule } from './public-routing.module';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicFeatureKey, publicReducer } from './public.reducer';
import { PublicEffects } from './public.effects';

@NgModule({
  declarations: [MainComponent, ClientRegisterComponent],
  imports: [
    StoreModule.forFeature(publicFeatureKey, publicReducer),
    EffectsModule.forFeature([PublicEffects]),
    CommonModule,
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule {}
