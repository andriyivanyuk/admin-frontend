import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AuthGuard } from './guards/auth.guard';
import { AddCategoryComponent } from './components/add-category/app-category.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
      },
      { path: 'verify/:token', component: VerifyComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'create-category', component: AddCategoryComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
