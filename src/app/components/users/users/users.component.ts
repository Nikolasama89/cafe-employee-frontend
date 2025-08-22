import { Component, effect, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserReadOnlyDTO } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-users',
  imports: [NgIf, UsersListComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private service = inject(UserService)
   users = signal<UserReadOnlyDTO[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      console.log('Users length:', this.users()?.length ?? 0);
    });
    this.loadUsers();
  }

  private loadUsers() {
    this.loading.set(true);
    this.error.set(null);
    this.service.getAll().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => {
        console.error(err);
        this.error.set('Αποτυχία φόρτωσης χρηστών');
      },
      complete: () => this.loading.set(false),
    });
  }

  reload() {
    this.loadUsers();
  }

  handleDelete(id: number) {
    if (!confirm(`Διαγραφή χρήστη με id=${id};`)) return;

    this.loading.set(true);
    this.service.deleteById(id).subscribe({
      next: () => this.loadUsers(),
      error: (err: any) => {
        console.error(err);
        this.error.set('Αποτυχία διαγραφής χρήστη');
        this.loading.set(false);
      }
    });
  }

}
