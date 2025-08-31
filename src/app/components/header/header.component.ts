import { Component, inject } from '@angular/core';
import { NgIf} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private auth = inject(AuthService)

  user = this.auth.user$

  isAdmin(): boolean {
    return this.user()?.role === "ADMIN"
  }

  logout(): void {
    this.auth.logout()
  }
}
