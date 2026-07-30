export interface SignupData {
  name: string;
  age: number;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  role: 'admin' | 'user';
  isConfirmed: boolean;
}