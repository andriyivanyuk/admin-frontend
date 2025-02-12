import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  private createForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public createAccount() {
    if (this.form.valid) {
      const request: User = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authService.register(request).subscribe({
        next: (result) => {
          this.router.navigate(['auth/login']);
          console.log(result);
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
