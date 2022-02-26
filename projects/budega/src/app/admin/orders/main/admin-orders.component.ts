import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {Order} from '../../../public/order/order.model';
import {AppState, selectAdminOrders, selectAdminOrdersList} from '../admin-orders.selectors';
import {loadAdminOrders} from '../admin-orders.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'budega-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrdersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderList$: Observable<Order[]>;
  translate: TranslateService;


  constructor(
    private publicStore: Store<AppState>,
    translate: TranslateService
  ) {
    this.orderList$ = this.publicStore.select(selectAdminOrdersList)
    this.translate = translate;
  }

  ngOnInit(): void {
    this.publicStore.dispatch(loadAdminOrders())
  }

  cancelOrder(id: string) {
    console.log('canceled', id)
  }

  // TODO: need be removed
  formatLocal(date: number) {
    const d = new Date(date);
    return d.toLocaleDateString(this.translate.currentLang, {hour12: false, hour: '2-digit', minute: '2-digit' });
  }

  alterState(role: string){

  }

  extractProductId(id: string) {
    return id.replace(/\D/g, '').slice(0,4)
  }
}
