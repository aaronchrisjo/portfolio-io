import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  isModalOpen = false;
  isEmailFormVisible = true;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    
    this.modalService.modalState$.subscribe(state => {
      this.isModalOpen = state === 'signup';
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signUp( email, password)
        .then(() => {
          this.closeModal();
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
    }
  }

  showEmailForm(): void {
    this.isEmailFormVisible = true;
  }

  signUpWithGoogle(): void {
    this.authService.signUpWithGoogle()
      .then(() => {
        this.closeModal();
      })
      .catch(error => {
        console.error('Google signup error:', error);
      });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalService.close();
  }
}
