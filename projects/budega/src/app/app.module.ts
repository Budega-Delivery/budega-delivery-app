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
    KeycloakAngularModule
  ],
  declarations: [AppComponent, HasRoleDirective],
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
