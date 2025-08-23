import { Component, EventEmitter, Output, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize, map } from 'rxjs';
import { EmployeeInsertDTO, EmployeeReadOnlyDTO } from 'src/app/shared/interfaces/employee';
import { JobTitle } from 'src/app/shared/interfaces/enums';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { RegionService } from 'src/app/core/services/region.service';
import { Region } from 'src/app/shared/interfaces/region';
import { Router,RouterLink } from '@angular/router';

type Option = { id: number; name: string };

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-create.component.html',
})
export class EmployeeCreateComponent implements OnInit {
  @Output() created = new EventEmitter<EmployeeReadOnlyDTO>();

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private regionService = inject(RegionService);
  private router = inject(Router)

  saving = signal(false);
  serverError = signal<string | null>(null);

  // state για regions
  regions = signal<Option[]>([]);
  regionsLoading = signal(true);
  regionsError = signal<string | null>(null);

  jobTitles = Object.values(JobTitle) as string[];

  form = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    vat: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s+\-()]{6,20}$/)]],
    regionId: [null as number | null, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    userId: [null as number | null, [Validators.required, Validators.min(1)]],
    jobTitle: [null as JobTitle | null, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions() {
    this.regionsLoading.set(true);
    this.regionsError.set(null);

    this.regionService
      .getAll()
      .pipe(
        map((rows: Region[]) => rows.map(r => ({ id: r.id, name: r.name }) as Option)),
        finalize(() => this.regionsLoading.set(false))
      )
      .subscribe({
        next: (opts: Option[]) => this.regions.set(opts),
        error: (err: { error: { message: any; }; message: any; }) => {
          const msg = (err?.error?.message || err?.message || 'Αποτυχία φόρτωσης περιοχών');
          this.regionsError.set(msg);
        }
      });
  }

  get f() { return this.form.controls; }

  submit() {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto = this.form.value as EmployeeInsertDTO;

    this.saving.set(true);
    this.employeeService.create(dto).pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (created) => {
          this.created.emit(created);
          this.form.reset();
          this.router.navigate(['/employees'], {
            replaceUrl: true,                 // προαιρετικό: να μη γυρνά πίσω στο form με back
          });
        },
        error: (err) => {
          const msg = err?.error?.message || err?.message || 'Κάτι πήγε στραβά.';
          this.serverError.set(msg);
        }
      });
  }
}
