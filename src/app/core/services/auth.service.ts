import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthenticationRequestDTO, AuthenticationResponseDTO, LoggedInUser, Role } from 'src/app/shared/interfaces/auth';

const API_URL_AUTH = `${environment.apiURL}/auth`

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)

  user$ = signal<LoggedInUser | null>(null)

  constructor() {
    const token = localStorage.getItem("access_token")
    if (token) {
      const p = jwtDecode<{username:string; role?: Role}>(token)
      this.user$.set({username:p.username, role: (p.role ?? "EMPLOYEE") as Role})
    }

    effect(() => {
      const u = this.user$();
      console.log(u ? `User logged in: ${u.username}`: "No user")
    })
  }

  login(credentials: AuthenticationRequestDTO) {
    return this.http.post<AuthenticationResponseDTO>(`${API_URL_AUTH}/authenticate`, credentials)
  }

  setSessionAndUser(auth: AuthenticationResponseDTO) {
    localStorage.setItem("access_token", auth.token)
    const p = jwtDecode<{username: string; role?: Role}>(auth.token)
    this.user$.set({username: p.username, role: (p.role ?? "EMPLOYEE") as Role})
  }

  logout() {
    this.user$.set(null)
    localStorage.removeItem("access_token")
    this.router.navigate(["login"])
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem("access_token")
    if (!token){
      return true;
    } 
    try {
      const decoded = jwtDecode< {exp?: number}>(token)
      const now = Math.floor(Date.now()/ 1000)
      return !decoded.exp || decoded.exp < now

    } catch {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem("access_token")
  }
}
