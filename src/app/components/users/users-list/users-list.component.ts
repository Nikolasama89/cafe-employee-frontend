import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { UserReadOnlyDTO } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-users-list',
  imports: [NgFor, NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  @Input() users: UserReadOnlyDTO[] | null = null;
  @Output() delete = new EventEmitter<number>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

}
