import { AfterViewInit, ChangeDetectorRef, Component, AfterViewChecked } from '@angular/core';
import { CoinService } from '../services/coin.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, AfterViewChecked {
  searchQuery: string = '';
  currentCoin: { definition: string, objectives: string, chartData?: any } | null = null;
  chart: any; // local

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // this.chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement);
    if (this.currentCoin && this.currentCoin.chartData && this.chart) {
      this.loadChart(this.currentCoin.chartData);
    }
  }

  ngAfterViewChecked() {
    if (this.currentCoin && this.currentCoin.chartData && this.chart) {
      this.loadChart(this.currentCoin.chartData);
    }
  }

  searchCoin() {
    if (this.chart) {
      this.chart.dispose();  // Dispose of the current chart
      this.chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement); // Reinitialize the chart
    }

    this.coinService.getCoinData(this.searchQuery).subscribe(
      (data) => {
        this.currentCoin = data;
        console.clear();
        console.log(this.currentCoin);

        this.cdr.detectChanges();

        if (this.currentCoin && this.currentCoin.chartData) {
          this.loadChart(this.currentCoin.chartData);
        }
      },
      (error) => {
        console.error('Error fetching coin data:', error);
        this.currentCoin = null;
      }
    );
  }

  loadChart(chartData: any) {
    const chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement);
    if (!chartData || !chartData.dates || !chartData.prices) {
      console.warn("No valid chart data available.");
      return;
    }

    const options = {
      title: {
        text: `Price History for "${this.searchQuery}"`,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [this.searchQuery],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chartData.dates, 
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: this.searchQuery,
          type: 'line',
          stack: 'Total',
          data: chartData.prices, 
        },
      ],
    };

    // Set the chart options
    chart.setOption(options);
  }
}