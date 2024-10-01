import { Component, DestroyRef, inject } from '@angular/core';
import { FormService } from './form.service';
import { Form } from './form.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '../../../shared/paginated-response.model';
import toast from '../../../shared/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private readonly formService = inject(FormService);
  private readonly destroyRef = inject(DestroyRef);

  forms: Form[] = [];

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.formService.getData()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((forms: Form[]) => {
      this.forms = forms
    });
  }

  up(id: number) {
    this.formService.up(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData()

      toast.fire({
        icon: 'success',
        title: 'Berhasil up order'
      })
    })
  }

  down(id: number) {
    this.formService.down(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData()

      toast.fire({
        icon: 'success',
        title: 'Berhasil down order'
      })
    })
  }

  disable(id: string) {
    this.formService.disable(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData()

      toast.fire({
        icon: 'success',
        title: 'Berhasil disable form'
      })
    })
  }

  enable(id: string) {
    this.formService.enable(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData()

      toast.fire({
        icon: 'success',
        title: 'Berhasil enable form'
      })
    })
  }

  reorder() {
    this.formService.reoder().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getData()

      toast.fire({
        icon: 'success',
        title: 'Berhasil reorder'
      })
    })
  }
}
