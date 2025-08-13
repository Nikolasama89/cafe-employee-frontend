export type Role = "ADMIN" | "EMPLOYEE"

export interface AuthenticationRequestDTO {
  username: string;
  password: string;
}

export interface AuthenticationResponseDTO {
  username: string;
  token: string;
}

export interface LoggedInUser {
  username: string,
  role: string
}