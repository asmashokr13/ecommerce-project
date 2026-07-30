import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignupData, LoginData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(data: SignupData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: LoginData): Observable<{ message: string; token: string }> {
    return this.http.post<{ message: string; token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}