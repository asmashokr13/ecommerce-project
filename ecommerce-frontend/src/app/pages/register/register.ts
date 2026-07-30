import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  age: number | null = null;
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.authService.signup({
      name: this.name,
      age: this.age as number,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;

        // your backend returns 200 (not an error) with this message when the email exists
        if (res.message === 'user already registered') {
          this.errorMessage = res.message;
          return;
        }

        this.successMessage = 'Registration successful! Please check your email to confirm your account before logging in.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
