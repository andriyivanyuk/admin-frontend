import { Component, OnInit } from '@angular/core';
import { ProductStatusService } from '../../services/status.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductStatus } from '../../models/productStatus';
import { CategoryService } from '../../services/category.service';
import { TransformStatusesPipe } from '../../pipes/transformStatuses.pipe';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule, TransformStatusesPipe],
  providers: [ProductStatusService, CategoryService, ProductService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;

  statuses$!: Observable<ProductStatus[]>;
  categories$!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private productStatusService: ProductStatusService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      price: [''],
      stock: [''],
      status_id: [''],
      category_id: [''],
      description: [''],
    });
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  public createProduct(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('stock', this.form.get('stock')?.value);
      formData.append('category_id', this.form.get('category_id')?.value);
      formData.append('status_id', this.form.get('status_id')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.form.reset();
        },
        error: (error) => {
          console.error('Помилка при додаванні продукту:', error);
        },
      });
    }
  }

  ngOnInit(): void {
    this.statuses$ = this.productStatusService.getStatuses();
    this.categories$ = this.categoryService.getCategories();
    this.createForm();
  }
}
