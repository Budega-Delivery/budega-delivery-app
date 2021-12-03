import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState, CartItem, selectCart } from '../../public.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../../admin/product/models/models';
import {
  addProductToCart,
  loadClientCart,
  removeProductFromCart
} from '../../public.actions';

@Component({
  selector: 'budega-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  cart$: Observable<Map<string, CartItem>>;
  /*
   * TODO: ADD ADDRESS SELECTOR
   * TODO: ADD BOTÃO DE COMPRAR
   * TODO: ADD VALOR TOTAL
   * TODO: CRIAR LAYOUT TELA DE "MINHAS COMPRAS"
   * TODO: CRIAR LAYOUT TELA DE ESTOQUE
   * TODO: CRIAR LAYOUT TELA DE ENTREGA
   * TODO: LISTAR ROTAS DA API
   *   */
  constructor(
    private translate: TranslateService,
    private publicStore: Store<AppState>
  ) {
    this.publicStore.dispatch(loadClientCart());
  }

  ngOnInit(): void {
    this.cart$ = this.publicStore.pipe(select(selectCart));
  }

  loadProductAmount(id: string, list: Map<string, CartItem>): number {
    const item = list.get(id);
    return item ? item.amount : 0;
  }
  addProduct(product: Product) {
    this.publicStore.dispatch(addProductToCart({ product }));
  }
  removeProduct(product: Product) {
    this.publicStore.dispatch(removeProductFromCart({ product }));
  }

  cartArray(cart: Map<string, CartItem>): CartItem[] {
    return Array.from(cart.values());
  }

  teste(amount: CartItem) {
    console.log(amount);
    return amount;
  }

  finishOrder() {}

  getCartAmountValue(cart: Map<string, CartItem>): number {
    let amount = 0;
    Array.from(cart.values()).map((cartItem) => {
      amount += cartItem.amount * cartItem.product.price;
    });
    return amount;
  }
}
