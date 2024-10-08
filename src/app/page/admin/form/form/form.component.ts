import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormService } from '../form.service';
import { Form } from '../form.model';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import toast from '../../../../shared/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formService = inject(FormService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.getData(id)
    }
  }

  formForm = new FormGroup({
    name: new FormControl(''),
    duration_month: new FormControl(''),
    duration_day: new FormControl(''),
    age_restriction_month: new FormControl(''),
    age_restriction_day: new FormControl(''),
    gender: new FormControl(''),
    description: new FormControl(''),
  });

  getData(id: string) {
    this.formService.getData(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((form: Form) => {
      console.log(form)
    })
  }

  save() {
    this.formService.store(this.formForm.value)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .pipe(catchError((err: HttpErrorResponse) => {
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
        title: 'Berhasil tambah data'
      })

      this.router.navigate(['/admin/form'])
    })
  }
}
