import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, finalize, catchError, of, switchMap, tap, filter } from 'rxjs';

import { EmployeeService } from 'src/app/core/services/employee.service';
import { RegionService } from 'src/app/core/services/region.service';
import { Region } from 'src/app/shared/interfaces/region';
import { EmployeeReadOnlyDTO, EmployeeUpdateDTO } from 'src/app/shared/interfaces/employee';
import { JobTitle } from 'src/app/shared/interfaces/enums';

// Το σχημα για το dropdown των regions
type Option = { id: number; name: string };
// Στελνουμε στο update μονο τα πεδια που επιτρεπουμε να αλλαξουν. id και userId δεν θελουμε να τα αλλαξουμε
type EmployeeUpdatePayload = Omit<EmployeeUpdateDTO, 'id' | 'userId'>;

@Component({
  selector: 'app-employee-update',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  // Injects για να μην εχουμε constructor boilerplate
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private regionService = inject(RegionService);

  // immutable fields που δεν εμφανίζονται στη φόρμα
  id!: number;
  linkedUserId!: number;

  // UI state
  loading = false;
  saving = false;
  error = '';

  // Job titles για το select
  JOB_TITLE_OPTIONS = [
    { label: 'Barista', value: JobTitle.BARISTA },
    { label: 'Barman',  value: JobTitle.BARMAN },
    { label: 'Waiter',  value: JobTitle.WAITER },
    { label: 'Cleaner', value: JobTitle.CLEANER },
    { label: 'Cashier', value: JobTitle.CASHIER },
  ] as const;

  // Regions state
  regions = signal<Option[]>([]);
  regionsLoading = signal(false);
  regionsError = signal<string | null>(null);

  // REACTIVE FORM
  form = this.fb.group({
    firstname: this.fb.control<string>('', { validators: [Validators.required, Validators.maxLength(50)] }),
    lastname:  this.fb.control<string>('', { validators: [Validators.required, Validators.maxLength(50)] }),
    vat:       this.fb.control<string>('', { validators: [Validators.required, Validators.maxLength(15)] }),
    phone:     this.fb.control<string>('', { validators: [Validators.required, Validators.maxLength(20)] }),
    regionId:  this.fb.control<number>(0, { validators: [Validators.required, Validators.min(1)] }),
    email:     this.fb.control<string>('', { validators: [Validators.required, Validators.email, Validators.maxLength(100)] }),
    jobTitle:  this.fb.control<JobTitle>(JobTitle.BARISTA, {validators: [Validators.required], }),
  });

  // ΤΡΕΧΕΙ ΜΙΑ ΦΟΡΑ ΜΕ ΑΦΟΥ ΤΟ COMPONENT ΔΗΜΙΟΥΡΓΗΘΕΙ
  ngOnInit() {
    // 1) φορτώνουμε regions
    this.loadRegions();

    // 2) διαβάζουμε τύπου-safe το :id και φορτώνουμε τον employee
    this.loading = true;
    this.route.paramMap.pipe(
      // παιρνουμε το id
      map(pm => pm.get('id')),
      // φιλτραρουμε nulls
      filter((id): id is string => id !== null),
      // μετατρεπουμε σε number
      map(idStr => Number(idStr)),
      // μικρο validation id πριν καλεσουμε το api
      tap(n => {
        if (!Number.isInteger(n) || n <= 0) throw new Error('Invalid employee id.');
        this.id = n;
      }),
      // κληση στο service για να παρουμε στοιχεια του employee
      switchMap(validId =>
        this.employeeService.getById(validId).pipe(
          // γεμιζουμε το form με τα δεδομενα του employee
          tap((emp: EmployeeReadOnlyDTO) => {
            this.linkedUserId = emp.userId; // read-only
            this.form.patchValue({
              firstname: emp.firstname,
              lastname:  emp.lastname,
              vat:       emp.vat,
              phone:     emp.phone,
              regionId:  emp.regionId,
              email:     emp.email,
              jobTitle:  JobTitle.BARISTA,
            });
          }),
          catchError(err => {
            this.error = err?.error?.message ?? 'Failed to load employee.';
            return of(null);
          })
        )
      )
    ).subscribe({
      // μολις τελειωσει η αλυσιδα κλεινει το loading
      next: () => (this.loading = false),
      error: (e) => { this.error = e?.message ?? 'Invalid employee id.'; this.loading = false; }
    });
  }

  // φορτωση region με sort 
  loadRegions() {
    this.regionsLoading.set(true);
    this.regionsError.set(null);

    this.regionService.getAll()
      .pipe(
        map((rows: Region[]) =>
          rows
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(r => ({ id: r.id, name: r.name }) as Option)
        ),
        // κλεινει το loading οτι και να γινει
        finalize(() => this.regionsLoading.set(false))
      )
      .subscribe({
        next: (opts: Option[]) => this.regions.set(opts),
        error: (err) => {
          const msg = err?.error?.message ?? err?.message ?? 'Αποτυχία φόρτωσης περιοχών';
          this.regionsError.set(msg);
        }
      });
  }
  // Υποβολη φορμας
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const raw = this.form.getRawValue();
    const payload: EmployeeUpdatePayload = {
      firstname: raw.firstname,
      lastname:  raw.lastname,
      vat:       raw.vat,
      phone:     raw.phone,
      regionId:  Number(raw.regionId),
      email:     raw.email,
      jobTitle:  raw.jobTitle,
    };

    this.saving = true; this.error = '';
    this.employeeService.update(this.id, payload).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => { this.error = err?.error?.message ?? 'Update failed. Please try again.'; this.saving = false; },
      complete: () => (this.saving = false),
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }

  // helper για validation του template
  hasError(name: keyof typeof this.form.controls, type: string) {
    const c = this.form.controls[name];
    return c.touched && c.hasError(type);
  }
}
