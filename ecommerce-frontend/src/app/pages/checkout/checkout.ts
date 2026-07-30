import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  message = '';
  errorMessage = '';
  loading = false;
  done = false;

  constructor(private cartService: CartService) {}

  confirmOrder(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cartService.checkout().subscribe({
      next: (res) => {
        this.loading = false;
        this.done = true;
        this.message = res.message;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Checkout failed. Please try again.';
      }
    });
  }
}