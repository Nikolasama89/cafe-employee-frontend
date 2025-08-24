import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeReadOnlyDTO } from 'src/app/shared/interfaces/employee';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  private employeeService = inject(EmployeeService);
  employees: EmployeeReadOnlyDTO[] | null = null;
  error = "";
  auth = inject(AuthService)
  
  

  ngOnInit() {
    this.load()
  }

  load() {
    this.error = "";
    this.employeeService.getAll().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => (this.error = err?.error?.message ?? "Request failed")
    });
  }
}
