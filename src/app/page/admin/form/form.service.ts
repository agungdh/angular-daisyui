import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from './form.model';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../../shared/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly http = inject(HttpClient);

  getData(): Observable<PaginatedResponse<Form>> {
    return this.http.get<PaginatedResponse<Form>>('/admin/form');
  }
}
