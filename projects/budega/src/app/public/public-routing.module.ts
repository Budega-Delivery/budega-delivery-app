import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { title: 'budega.menu.about' }
  },
  {
    path: 'registrar',
    component: ClientRegisterComponent,
    data: { title: 'budega.menu.register' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
