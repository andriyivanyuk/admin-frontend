import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/loginRequest';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  providers: [TokenStorageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public signIn() {
    if (this.form.valid) {
      const request: LoginRequest = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authService.login(request).subscribe({
        next: (result) => {
          this.router.navigate(['admin/dashboard']);
          this.tokenStorage.saveToken(result.token);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }
}
