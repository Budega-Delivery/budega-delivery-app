import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EditProductComponent } from './product/product/edit-product.component';
import { ProductsMainComponent } from './product/main/products-main.component';
import { AuthGuardService } from '../core/keycloak/auth-guard.service';
import { Product } from './product/models/models';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full'
  },
  {
    path: 'painel',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.dashboard',
      roles: ['manager']
    }
  },
  {
    path: 'produtos',
    component: ProductsMainComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.products',
      roles: ['manager']
    }
  },
  {
    path: 'produtos/:id',
    component: EditProductComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.product',
      roles: ['manager'],
      product: Product
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AdminRoutingModule {}
