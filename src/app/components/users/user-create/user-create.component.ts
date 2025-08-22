import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Role, UserInsertDTO } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  roles = Object.values(Role);

  loading = signal(false);
  serverError = signal<string | null>(null);
  showPassword = signal(false);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        // κεφαλαίο + ψηφίο
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/),
      ],
    ],
    role: ['', Validators.required],
  });

  get controls() {
    return this.form.controls;
  }

  toggleShowPassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.serverError.set(null);

    const dto: UserInsertDTO = this.form.getRawValue() as UserInsertDTO;

    this.userService.create(dto).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/users']); // επιστροφή στη λίστα
      },
      error: (err) => {
        this.loading.set(false);
        // Backend γυρναει μεσω GlobalExceptionHandler.
        if (err.status === 409) {
          this.serverError.set('Το username χρησιμοποιείται ήδη.');
        } else if (err.status === 400) {
          this.serverError.set('Λανθασμένα δεδομένα. Έλεγξε τη φόρμα.');
        } else {
          this.serverError.set('Κάτι πήγε στραβά. Ξαναπροσπάθησε.');
        }
      },
    });
  }
}
