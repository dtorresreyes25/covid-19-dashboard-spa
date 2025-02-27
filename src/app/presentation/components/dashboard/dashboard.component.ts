import { Component } from '@angular/core';
import { DashboardView } from './dashboard.view';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  CovidDataFilters,
  FiltersComponent,
} from '../filters/filters.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ViewEncapsulation } from '@angular/core';
import { ViewType } from '../../../domain/enums/view-type.enum';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="filters-container">
        <app-filters (filterChange)="onFilterChange($event)"></app-filters>

        <div class="view-toggle">
          <mat-button-toggle-group
            [value]="currentView"
            (change)="onViewChange($event)"
          >
            <mat-button-toggle value="chart">
              <mat-icon>analytics</mat-icon>
            </mat-button-toggle>

            <mat-button-toggle value="table">
              <mat-icon>grid_on</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
      </div>

      <div class="content">
        <ng-container *ngIf="view.data$ | async as data">
          <ng-container *ngIf="data.length; else loading">
            <app-chart
              *ngIf="currentView === 'chart'"
              [data]="data"
            ></app-chart>

            <app-table
              *ngIf="currentView === 'table'"
              [data]="data"
            ></app-table>
          </ng-container>
        </ng-container>

        <ng-template #loading>
          <mat-spinner></mat-spinner>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .filters-container {
        z-index: 1000;
        background: white;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .view-toggle {
        margin-left: 1rem;
      }

      .content {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        position: relative;
        z-index: 1;
      }

      mat-spinner {
        margin: 2rem auto;
      }
    `,
  ],
  imports: [
    MatProgressSpinner,
    MatButtonToggleModule,
    MatIconModule,
    FiltersComponent,
    ChartComponent,
    TableComponent,
    AsyncPipe,
    NgIf,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardView],
})
export class DashboardComponent {
  constructor(public readonly view: DashboardView) {}

  currentView: ViewType = ViewType.CHART;

  onViewChange(event: MatButtonToggleChange): void {
    this.currentView = event.value;
  }

  onFilterChange({ country, period }: Partial<CovidDataFilters>): void {
    if (country && period) {
      this.view.loadData(country, period);
    }
  }
}
