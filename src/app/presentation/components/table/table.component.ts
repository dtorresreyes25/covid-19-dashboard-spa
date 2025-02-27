import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CovidDataEntity } from '../../../domain/entities/covid-data.entity';

@Component({
  selector: 'app-table',
  template: `
    <table mat-table [dataSource]="data">
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let row">{{ row.date | date }}</td>
      </ng-container>

      <ng-container matColumnDef="cases">
        <th mat-header-cell *matHeaderCellDef>Cases</th>
        <td mat-cell *matCellDef="let row">{{ row.cases }}</td>
      </ng-container>

      <ng-container matColumnDef="deaths">
        <th mat-header-cell *matHeaderCellDef>Deaths</th>
        <td mat-cell *matCellDef="let row">{{ row.deaths }}</td>
      </ng-container>

      <ng-container matColumnDef="recovered">
        <th mat-header-cell *matHeaderCellDef>Recovered</th>
        <td mat-cell *matCellDef="let row">{{ row.recovered }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [MatTableModule, DatePipe],
})
export class TableComponent {
  @Input() data!: CovidDataEntity[];
  columns = ['date', 'cases', 'deaths', 'recovered'];
}
