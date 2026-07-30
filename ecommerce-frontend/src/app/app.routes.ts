import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '',component: Home},
  {path: 'products',component: Products},
  {path: 'login',component: Login},
  {path: 'register',component: Register},
  {path: 'cart',component: Cart, canActivate: [authGuard]},
  {path: 'checkout',component: Checkout, canActivate: [authGuard]},
  {path: 'about',component: About},
  {path: 'contact',component: Contact},
  {path: '**',redirectTo: ''}
];