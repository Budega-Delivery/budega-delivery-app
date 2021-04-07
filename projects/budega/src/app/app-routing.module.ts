import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './core/keycloak/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loja',
    pathMatch: 'full'
  },
  {
    path: 'loja',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule)
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
