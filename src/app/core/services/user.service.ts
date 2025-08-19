import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { UserInsertDTO, UserReadOnlyDTO } from 'src/app/shared/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserReadOnlyDTO[]> {
    return this.http.get<UserReadOnlyDTO[]>(this.baseUrl)
  }

  getByUsername(username: string): Observable<UserReadOnlyDTO> {
    return this.http.get<UserReadOnlyDTO>(`${this.baseUrl}/${encodeURIComponent(username)}`)
  }

  create(payload:UserInsertDTO): Observable<UserReadOnlyDTO> {
    return this.http.post<UserReadOnlyDTO>(this.baseUrl, payload)
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}
