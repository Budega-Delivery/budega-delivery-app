import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './product/edit-product.component';
import { ProductsMainComponent } from './main/products-main.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productFeatureKey, productReducer } from './product.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { BrandDialogComponent } from './brand-dialog/brand-dialog.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [
    EditProductComponent,
    ProductsMainComponent,
    ProductListComponent,
    BrandDialogComponent,
    DepartmentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
    NgxMaskModule.forRoot(maskConfig),
    RouterModule,
    ReactiveComponentModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  exports: [ProductListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule {}
