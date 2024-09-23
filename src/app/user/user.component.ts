import { Component } from '@angular/core';
import { DefaultComponent } from '../layout/default/default.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DefaultComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
