import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth = inject(Auth); // Inject Auth service
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Define form controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.signIn(email, password); // Use AuthService to sign in
        console.log('Login successful!');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Login failed:', error.message);
        } else {
          console.error('Login failed: An unknown error occurred.');
        }
      }
    }
  }
  googleLogin(): void {
    this.authService.googleLogin().catch(error => {
      console.error('Google Login Error:', error);
    });
  }
}
