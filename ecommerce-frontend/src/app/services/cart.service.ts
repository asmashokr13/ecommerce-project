import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';
  private checkoutUrl = 'http://localhost:3000/checkout';

  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number = 1): Observable<{ message: string; cart: CartItem }> {
    return this.http.post<{ message: string; cart: CartItem }>(this.apiUrl, {
      product: productId,
      quantity
    });
  }

  getCart(): Observable<{ message: string; cart: CartItem[] }> {
    return this.http.get<{ message: string; cart: CartItem[] }>(this.apiUrl);
  }

  updateCart(id: string, quantity: number): Observable<{ message: string; updated: CartItem }> {
    return this.http.put<{ message: string; updated: CartItem }>(`${this.apiUrl}/${id}`, { quantity });
  }

  deleteCart(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  checkout(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.checkoutUrl);
  }
}