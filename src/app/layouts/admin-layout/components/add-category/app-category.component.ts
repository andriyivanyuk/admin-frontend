import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule],
  providers: [CategoryService],
  templateUrl: './app-category.component.html',
  styleUrl: './app-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
    });
  }

  public createCategory() {
    if (this.form.valid) {
      const request: any = {
        title: this.form.value.title,
        description: this.form.value.description,
      };
      this.categoryService.createCategory(request).subscribe({
        next: () => {
          this.form.reset();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      return;
    }
  }

  public clearForm() {
    this.form.reset();
  }

  ngOnInit(): void {
    this.createForm();
  }
}
