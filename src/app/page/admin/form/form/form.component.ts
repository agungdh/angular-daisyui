import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormService } from '../form.service';
import { Form } from '../form.model';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import toast from '../../../../shared/toast';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private readonly formService = inject(FormService)
  private readonly router = inject(Router)

  formForm = new FormGroup({
    name: new FormControl(''),
    duration_month: new FormControl(''),
    duration_day: new FormControl(''),
    age_restriction_month: new FormControl(''),
    age_restriction_day: new FormControl(''),
    gender: new FormControl(''),
    description: new FormControl(''),
  });

  save() {
    this.formService.store(this.formForm.value).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status == 422) {
        for (const key in err.error.errors) {
          const element = err.error.errors[key];

          this.formForm.get(key)?.setErrors({incorrect: element[0]})
        }
      }

      throw err
  })).subscribe((res) => {
    toast.fire({
        icon: 'success',
        title: 'Berhasil up order'
      })
    })

    this.router.navigate(['/admin/form'])
  }
}
