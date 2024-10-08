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

  getDatas(): Observable<Form[]> {
    return this.http.get<Form[]>(`/admin/form`);
  }

  getData(id: string): Observable<Form> {
    return this.http.get<Form>(`/admin/form/${id}`);
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

  disable(id: string): Observable<any> {
    return this.http.get(`/admin/form/${id}/disable`);
  }

  enable(id: string): Observable<any> {
    return this.http.get(`/admin/form/${id}/enable`);
  }

  store(form: any): Observable<any> {
    return this.http.post(`/admin/form`, form);
  }
}
