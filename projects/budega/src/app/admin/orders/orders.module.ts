import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminOrdersComponent} from './main/admin-orders.component';
import {EffectsModule} from '@ngrx/effects';
import {AdminOrdersEffects} from './admin-orders.effects';
import {StoreModule} from '@ngrx/store';
import {adminOrdersFeatureKey, adminOrdersReducer} from './admin-orders.reducer';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveComponentModule} from '@ngrx/component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';



@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(adminOrdersFeatureKey, adminOrdersReducer),
    EffectsModule.forFeature([AdminOrdersEffects]),
    TranslateModule,
    ReactiveComponentModule,
    SharedModule,
    RouterModule,
    MatStepperModule,
    CdkStepperModule
  ],
  exports: []
})
export class OrdersModule { }
