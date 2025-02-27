import { Component, EventEmitter, OnInit, Output, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TimePeriod } from '../../../domain/enums/time-period.enum';
import { FiltersView } from './filters.view';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface CovidDataFilters {
  country: string;
  period: TimePeriod;
}

@Component({
  selector: 'app-filters',
  template: `
    <form [formGroup]="filterForm" class="filters-container">
      <mat-form-field>
        <mat-label>Select Country</mat-label>
        <mat-select formControlName="country">
          <mat-option *ngFor="let country of view.countries$ | async" [value]="country.code">
            {{ country.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Select Period</mat-label>
        <mat-select formControlName="period">
          <mat-option *ngFor="let option of periodOptions" [value]="option.value">
            {{ option.label }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `,
  standalone: true,
  imports: [
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf
  ],
  providers: [FiltersView]
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Partial<CovidDataFilters>>();

  filterForm: FormGroup;

  readonly periodOptions = [
    { value: TimePeriod.YEAR, label: '1 Year' },
    { value: TimePeriod.MONTH, label: '30 Days' },
    { value: TimePeriod.HALF_YEAR, label: '6 Months' },
  ] as const;

  constructor(
    private readonly fb: FormBuilder,
    public readonly view: FiltersView,
    private readonly destroyRef: DestroyRef
  ) {
    this.filterForm = this.fb.group({
      country: [''],
      period: [TimePeriod.MONTH]
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(filters => this.filterChange.emit(filters));
  }
}
