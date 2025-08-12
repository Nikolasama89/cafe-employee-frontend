import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent },
  { path: "**", redirectTo: "login"}
];
