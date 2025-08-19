export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}

export interface UserReadOnlyDTO {
  id: number;
  username: string;
  role: Role | string; 
}

export interface UserInsertDTO {
  username: string;
  password: string;
  role: Role | string;
}