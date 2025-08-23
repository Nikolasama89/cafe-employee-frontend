import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/shared/interfaces/region';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RerionService {

  private http = inject(HttpClient)
  private readonly baseUrl = `${environment.apiURL}/regions`;

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl)
  }
}
