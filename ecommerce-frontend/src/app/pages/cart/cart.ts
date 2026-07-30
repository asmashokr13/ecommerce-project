import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart.interface';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  items: CartItem[] = [];
  loading = true;
  errorMessage = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.items = res.cart;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Could not load your cart.';
      }
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) return;

    this.cartService.updateCart(item._id, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => this.errorMessage = err.error?.message || 'Could not update quantity.'
    });
  }

  removeItem(id: string): void {
    this.cartService.deleteCart(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => this.errorMessage = err.error?.message || 'Could not remove item.'
    });
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
