import { Injectable } from '@angular/core';
import { CovidDataEntity } from '../../../domain/entities/covid-data.entity';
import { ChartData, ChartOptions } from 'chart.js';

@Injectable()
export class ChartView {
  readonly chartType = 'line';

  readonly chartData: ChartData = {
    datasets: [
      { label: 'Cases', data: [], borderColor: '#2196F3', tension: 0.1 },
      { label: 'Deaths', data: [], borderColor: '#F44336', tension: 0.1 },
      { label: 'Recovered', data: [], borderColor: '#4CAF50', tension: 0.1 }
    ],
    labels: []
  };

  readonly chartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: true , } }
  };

  updateData(data: CovidDataEntity[]): void {
    this.chartData.labels = data.map(item => item.date.toLocaleDateString());
    this.chartData.datasets[0].data = data.map(item => item.cases);
    this.chartData.datasets[1].data = data.map(item => item.deaths);
    this.chartData.datasets[2].data = data.map(item => item.recovered || 0);
  }
}
