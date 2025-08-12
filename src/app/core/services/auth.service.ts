import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequestDTO, AuthenticationResponseDTO } from 'src/app/shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/auth"

  login(payload: AuthenticationRequestDTO) {
    return this.http.post<AuthenticationResponseDTO>(`${this.baseUrl}/authenticate`, payload)
  }

  saveToken(token: string) {
    localStorage.setItem("token", token)
  }
}
