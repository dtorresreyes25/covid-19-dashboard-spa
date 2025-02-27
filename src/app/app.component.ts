import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DashboardComponent} from './presentation/components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  template: `
    <app-dashboard></app-dashboard>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, DashboardComponent]
})
export class AppComponent {}
