import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersComponent } from './components/users/users/users.component';
import { roleGuard } from './core/guards/role.guard';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employees/employee-update/employee-update.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'users/new', component: UserCreateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'employees/new', component: EmployeeCreateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'employees/:id/edit', component: EmployeeUpdateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'employees/:id', component: EmployeeDetailComponent},
  { path: "**", redirectTo: "login"}
];
