import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: "**", redirectTo: "login"}
];
