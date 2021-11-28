import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './core/keycloak/auth-guard.service';
import { MainComponent } from './public/main/main/main.component';
import { ClientRegisterComponent } from './public/client-register/client-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loja',
    pathMatch: 'full'
  },
  {
    path: 'loja',
    component: MainComponent,
    data: { title: 'budega.menu.about' }
  },
  {
    path: 'registrar',
    component: ClientRegisterComponent,
    data: { title: 'budega.menu.register' }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./public/settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: '**',
    redirectTo: 'loja'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
