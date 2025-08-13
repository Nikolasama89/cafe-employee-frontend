import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private auth = inject(AuthService)
  private router = inject(Router)

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  })

  get formControls() {
    return this.form.controls
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        this.auth.setSessionAndUser(res)
        this.router.navigate(['/employees'])
        // TODO: redirect ανά ρόλο – θα το κάνουμε όταν βάλουμε guard/router logic
        // π.χ. this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err)
        this.error = "Invalid username or password"
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }
}
