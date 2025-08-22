import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersComponent } from './components/users/users/users.component';
import { roleGuard } from './core/guards/role.guard';
import { UserCreateComponent } from './components/users/user-create/user-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'users/new', component: UserCreateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: "**", redirectTo: "login"}
];
