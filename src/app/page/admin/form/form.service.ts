import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Form } from './form.model';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../../shared/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly http = inject(HttpClient);

  getData(cursor: string | null = null): Observable<PaginatedResponse<Form[]>> {
    return this.http.get<PaginatedResponse<Form[]>>(`/admin/form?cursor=${cursor ?? ''}`);
  }

  up(id: number): Observable<any> {
    return this.http.get(`/admin/form/order/${id}/up`);
  }

  down(id: number): Observable<any> {
    return this.http.get(`/admin/form/order/${id}/down`);
  }

  reoder(): Observable<any> {
    return this.http.get(`/admin/form/reorder`);
  }

  deleteData(id: string): Observable<any> {
    return this.http.get(`/admin/form/reoder`);
  }
}
