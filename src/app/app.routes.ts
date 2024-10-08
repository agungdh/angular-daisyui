import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormComponent } from './page/admin/form/form.component';
import { FormComponent as FormCrudComponent } from './page/admin/form/form/form.component';
import { DefaultComponent } from './layout/default/default.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'form',
            children: [
              {
                path: '',
                component: FormComponent
              },
              {
                path: 'create',
                component: FormCrudComponent
              },
              {
                path: 'edit/:id',
                component: FormCrudComponent
              }
            ]
          }
        ]
      },
    ]
  },
  { path: '**', component: NotFoundComponent },
];
