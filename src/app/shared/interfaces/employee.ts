import { JobTitle } from "./enums";

export interface EmployeeReadOnlyDTO {
  id: number;
  createdAt: string;   
  updatedAt: string;   
  uuid: string;
  firstname: string;
  lastname: string;
  vat: string;
  phone: string;
  region: string;      
  regionId: number;
  email: string;
  userId: number;
  jobTitle: JobTitle;  
}

export interface EmployeeInsertDTO {
  firstname: string;
  lastname: string;
  vat: string;
  phone: string;
  regionId: number;
  email: string;
  userId: number;
  jobTitle: JobTitle;
}

export interface EmployeeUpdateDTO extends EmployeeInsertDTO {
  id: number;
}

