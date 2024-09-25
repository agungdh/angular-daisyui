import { Component, DestroyRef, inject } from '@angular/core';
import { FormService } from './form.service';
import { Form } from './form.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '../../../shared/paginated-response.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private readonly formService = inject(FormService);
  private readonly destroyRef = inject(DestroyRef);

  forms: Form[] = [];
  cursor: string | null = null
  nextable: boolean = false

  ngOnInit(): void {
    this.getData()
  }

  getData(refreshData: boolean = false) {
    this.formService.getData(refreshData ? null : this.cursor)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: PaginatedResponse<Form[]>) => {
      this.forms = refreshData ? this.forms = response.data : this.forms.concat(response.data);

      this.cursor = response.next_cursor

      this.nextable = response.next_cursor ? true : false
    });
  }

  up(id: number) {
    this.formService.up(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData(true)
    })
  }

  down(id: number) {
    this.formService.down(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData(true)
    })
  }

  hapus(id: string) {
    this.formService.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  reorder() {
    this.formService.reoder().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData(true)
    })
  }
}
