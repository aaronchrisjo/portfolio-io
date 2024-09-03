import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  modalState$!: Observable<string | null>; // Use non-null assertion operator

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.modalState$ = this.modalService.modalState$; // Initialize here
  }

  close(): void {
    this.modalService.close();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.signIn(email, password);
        console.log('Login successful!');
        this.router.navigate(['/all-template']);
        this.close();
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
    this.authService.googleLogin()
      .then(() => {
        this.router.navigate(['/all-template']);
        this.close();
      })
      .catch(error => {
        console.error('Google Login Error:', error);
      });
  }
}
