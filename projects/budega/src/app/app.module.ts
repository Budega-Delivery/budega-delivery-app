import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { initializer } from './core/keycloak/init';
import { SharedModule } from './shared/shared.module';
import { HasRoleDirective } from './core/keycloak/has-role.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import {
  publicFeatureKey,
  metaReducers,
  publicReducer,
  reducers
} from './public/public.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PublicEffects } from './public/public.effects';
import { CommonModule } from '@angular/common';
import { MainComponent } from './public/main/main/main.component';
import { ClientRegisterComponent } from './public/client-register/client-register.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // shared
    SharedModule,

    // app
    AppRoutingModule,

    // Keycloak
    KeycloakAngularModule,
    MatBadgeModule,

    // public
    StoreModule.forFeature(publicFeatureKey, publicReducer),
    EffectsModule.forFeature([PublicEffects]),
    CommonModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HasRoleDirective,
    MainComponent,
    ClientRegisterComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
export class AppModule {}
