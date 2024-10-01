import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {}
