import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeReadOnlyDTO } from 'src/app/shared/interfaces/employee';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  private employeeService = inject(EmployeeService);
  employees: EmployeeReadOnlyDTO[] | null = null;
  error = "";
  auth = inject(AuthService)
  fontAwesomeEditButton = faPenToSquare
  fontAwesomeDeleteButton = faTrash  

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

  onEdit(e:any){

  }

  onDelete(e: EmployeeReadOnlyDTO) {
    if (!e?.id) return

    const ok = confirm(`Delete ${e.firstname} ${e.lastname}? This action cannot be undone.`)
    if (!ok) return

    this.error = ""

    this.employeeService.delete(e.id).subscribe({
      next: () => {
        this.load()
      },
      error: (err) => {
        this.error = err?.error?.message ?? "Delete Failed. Please try again!"
      }
    })
  }

  
}
