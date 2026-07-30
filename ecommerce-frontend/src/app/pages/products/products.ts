import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/product.interface';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  products: Product[] = [];
  message = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(productId: string): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(productId).subscribe({
      next: () => {
        this.message = 'Added to cart!';
        setTimeout(() => this.message = '', 2000);
      },
      error: (err) => {
        this.message = err.error?.message || 'Could not add to cart.';
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
}