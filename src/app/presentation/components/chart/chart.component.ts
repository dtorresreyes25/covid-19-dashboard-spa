import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { CovidDataEntity } from '../../../domain/entities/covid-data.entity';
import { ChartView } from './chart.view';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

@Component({
  selector: 'app-chart',
  template: `
    <canvas
      baseChart
      [type]="view.chartType"
      [data]="view.chartData"
      [options]="view.chartOptions"
    >
    </canvas>
  `,
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [ChartView],
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() set data(value: CovidDataEntity[] | null) {
    if (value?.length) {
      this.view.updateData(value);
      this.chart?.update();
    }
  }

  constructor(public readonly view: ChartView) {}
}
