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

  ngOnInit(): void {
    this.formService.getData()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: PaginatedResponse<Form>) => {
      this.forms = this.forms.concat(response.data);
    });
  }
}
