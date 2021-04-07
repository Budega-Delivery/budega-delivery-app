import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, ProductModule, SharedModule]
})
export class AdminModule {}
