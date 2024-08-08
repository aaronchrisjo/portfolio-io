// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  async signUp(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
