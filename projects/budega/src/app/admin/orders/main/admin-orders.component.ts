import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {Order} from '../../../public/order/order.model';
import {AppState, selectAdminOrders, selectAdminOrdersList} from '../admin-orders.selectors';
import {loadAdminOrders} from '../admin-orders.actions';

@Component({
  selector: 'budega-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrdersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderList$: Observable<Order[]>;

  constructor(
    private publicStore: Store<AppState>
  ) {
    this.orderList$ = this.publicStore.select(selectAdminOrdersList)
  }

  ngOnInit(): void {
    this.publicStore.dispatch(loadAdminOrders())
  }

  cancelOrder(id: string) {
    console.log('canceled', id)
  }
}
