import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private auth = inject(AuthService)

  loading = false;
  error = "";

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
    this.error = ""

    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token)
        this.loading = false
        // TODO: redirect ανά ρόλο – θα το κάνουμε όταν βάλουμε guard/router logic
        // π.χ. this.router.navigate(['/employees']);
      },
      error: () => {
        this.loading = false
        this.error = "Invalid credentials"
      }
    })
  }
}
