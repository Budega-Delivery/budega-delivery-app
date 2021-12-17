import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../public/public.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = environment.api;
  resource = 'orders';

  constructor(private httpClient: HttpClient) {}

  createOrder(items: CartItem[]): Observable<string> {
    const orderWithoutImage = [];
    items.forEach((i) => {
      orderWithoutImage.push({
        amount: i.amount,
        productId: i.product._id
      });
    });
    return this.httpClient.post<string>(
      `${this.api.url}/${this.resource}`,
      { itemsList: orderWithoutImage },
      { reportProgress: true }
    );
  }
}
