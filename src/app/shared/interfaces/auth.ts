export interface AuthenticationRequestDTO {
  username: string;
  password: string;
}

export interface AuthenticationResponseDTO {
  username: string;
  token: string;
}