import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public isAuthenticated$ = this.currentUser.asObservable();
  user$: Observable<User | null> = this.currentUser.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  get isAuthenticated() {
    return this.currentUser.asObservable();
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Logout successful!');
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      console.log('Google signup successful!');
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  async googleLogin(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      console.log('Google Login successful!');
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  // Check if the current user is an admin
  isAdmin(): boolean {
    const user = this.currentUser.value;
    // Assuming that the user role is stored in user metadata or somewhere similar
    return user?.email === 'admin@duck.com'; 
  }
}
