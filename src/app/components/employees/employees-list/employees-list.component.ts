import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type EmployeeReadOnly = {
  id: number;
  firstname: string;
  lastname: string;
  jobTitle: string;
  region: string;
};

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent {
  employees: EmployeeReadOnly[] = [
    { id: 1, firstname: 'Nikos', lastname: 'Michos', jobTitle: 'BARISTA', region: 'ΑΤΤΙΚΗΣ' },
    { id: 2, firstname: 'Maria', lastname: 'Papadopoulou', jobTitle: 'CASHIER', region: 'ΘΕΣΣΑΛΙΑΣ' },
  ];
}
