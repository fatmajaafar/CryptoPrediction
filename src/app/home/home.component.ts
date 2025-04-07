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
  chart: any; // ECharts instance

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Initialize the chart instance, but defer rendering until after view update
    this.chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement);
    if (this.currentCoin && this.currentCoin.chartData && this.chart) {
      this.loadChart(this.currentCoin.chartData);
    }
  }

  ngAfterViewChecked() {
    // Ensure the chart is only initialized once
    if (this.currentCoin && this.currentCoin.chartData && this.chart) {
      this.loadChart(this.currentCoin.chartData);
    }
  }

  searchCoin() {
    // Properly dispose of the existing chart instance and reinitialize it
    if (this.chart) {
      this.chart.dispose();  // Dispose of the current chart
      this.chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement); // Reinitialize the chart
    }

    this.coinService.getCoinData(this.searchQuery).subscribe(
      (data) => {
        this.currentCoin = data;
        console.clear();
        console.log(this.currentCoin);

        // Manually trigger change detection after setting currentCoin
        this.cdr.detectChanges();

        // Check if currentCoin and chartData are available before updating the chart
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
        text: `Price History for ${this.searchQuery}`,
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
        data: chartData.dates,  // Dates for x-axis
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: this.searchQuery,
          type: 'line',
          stack: 'Total',
          data: chartData.prices,  // Prices for y-axis
        },
      ],
    };

    // Set the chart options
    chart.setOption(options);
  }
}