import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  message: string = 'Verifying...';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.authService.verifyEmail(token).subscribe({
        next: () =>
          (this.message =
            'Email verification successful! Your email has been verified.'),
        error: (error) =>
          (this.message = `Verification failed: ${error.error.message}`),
      });
    } else {
      this.message = 'Verification failed: No token provided.';
    }
  }
}
