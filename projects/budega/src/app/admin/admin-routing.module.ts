import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EditProductComponent } from './product/product/edit-product.component';
import { ProductsMainComponent } from './product/main/products-main.component';
import { AuthGuardService } from '../core/keycloak/auth-guard.service';
import { Product } from './product/models/models';
import { UsersMainComponent } from './user/main/users-main.component';

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
      roles: ['manager', 'stockist']
    }
  },
  {
    path: 'produtos/:id',
    component: EditProductComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.product',
      roles: ['manager', 'stockist'],
      product: Product
    }
  },
  {
    path: 'usuarios',
    component: UsersMainComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.users',
      roles: ['manager']
    }
  }
  // {
  //   path: 'usuarios/:id',
  //   component: EditUserComponent,
  //   canActivate: [AuthGuardService],
  //   data: {
  //     title: 'budega.admin.product',
  //     roles: ['manager', 'stockist'],
  //     product: Product
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AdminRoutingModule {}
