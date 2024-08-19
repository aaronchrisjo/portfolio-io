// src/app/signup/signup.component.ts
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private auth = inject(Auth);
  signupForm: FormGroup;
  isEmailFormVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private location: Location) {
    const controls = {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    };

    const options: AbstractControlOptions = { validators: this.passwordsMatchValidator };

    this.signupForm = this.fb.group(controls, options);
  }

  passwordsMatchValidator: ValidatorFn = (form: AbstractControl): { [key: string]: boolean } | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  };

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      try {
        const { email, password } = this.signupForm.value;
        await this.authService.signUp(email, password);
        console.log('Sign up successful!');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Sign up failed:', error.message);
        } else {
          console.error('Sign up failed: An unknown error occurred.');
        }
      }
    }
  }
  signUpWithGoogle(): void {
    this.authService.signUpWithGoogle()
    .then(()=>{
      this.location.back();
    })
    .catch(error => {
      console.error('Google Signup Error:', error);
    });
  }

  showEmailForm() {
    this.isEmailFormVisible = true;
  }
}
