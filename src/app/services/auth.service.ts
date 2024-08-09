// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth,(user)=>{
      this.currentUser.next(user);
    })
  }

  get isAuthenticated(){
    return this.currentUser.asObservable();
  }

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

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Logout successful!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout failed:', error.message);
      } else {
        console.error('Logout failed: An unknown error occurred.');
      }
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      console.log('Google signup successful!');
    } catch (error: any) {
      console.error('Google signup failed:', error.message);
      throw new Error(error.message);
    }
  }

  async googleLogin(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      console.log('Google Login successful!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google Login failed:', error.message);
      } else {
        console.error('Google Login failed: An unknown error occurred.');
      }
    }
  }

}
