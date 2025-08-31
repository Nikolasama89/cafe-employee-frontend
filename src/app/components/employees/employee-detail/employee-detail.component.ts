import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeReadOnlyDTO } from 'src/app/shared/interfaces/employee';
import { JobTitle } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  employee?: EmployeeReadOnlyDTO
  loading = true
  error?: string
  private sub?: Subscription

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.employeeService.getById(id))
    ).subscribe({
      next: (emp) => { this.employee = emp; this.loading = false; },
      error: (err) => {
        this.loading = false;
        this.error = err?.status === 404 ? 'Ο εργαζόμενος δεν βρέθηκε.' : 'Κάτι πήγε στραβά.';
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  fullName(employee?: EmployeeReadOnlyDTO): string {
    return employee ? `${employee.firstname} ${employee.lastname}`.trim() : '';
  }

  initials(employee?: EmployeeReadOnlyDTO): string {
    const n = this.fullName(employee);
    if (!n) return '';
    return n.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  }

  jobTitleLabel(job?: JobTitle): string {
    if (job == null) return '—';
    
    return (JobTitle as unknown as Record<string, string>)[job as unknown as string] ?? String(job);
  }

}
