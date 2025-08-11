import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeReadOnlyDTO, EmployeeInsertDTO, EmployeeUpdateDTO } from 'src/app/shared/interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly baseUrl = `${environment.apiURL}/employees`;
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeReadOnlyDTO[]> {
    return this.http.get<EmployeeReadOnlyDTO[]>(this.baseUrl)
  }

  getById(id: number): Observable<EmployeeReadOnlyDTO> {
    return this.http.get<EmployeeReadOnlyDTO>(`${this.baseUrl}/${id}`);
  }

  create(dto: EmployeeInsertDTO): Observable<EmployeeReadOnlyDTO> {
    return this.http.post<EmployeeReadOnlyDTO>(this.baseUrl, dto);
  }

  update(id: number, dto: EmployeeUpdateDTO): Observable<EmployeeReadOnlyDTO> {
    return this.http.put<EmployeeReadOnlyDTO>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  
  getPaginated(page = 0, size = 5): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.baseUrl}/paginated`, { params });
  }
}

