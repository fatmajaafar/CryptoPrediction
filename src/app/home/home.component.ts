import { AfterViewInit, Component } from '@angular/core';
import { CoinService } from '../services/coin.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  searchQuery: string = '';
  currentCoin: { definition: string, objectives: string } | null = null;

  constructor(private coinService: CoinService) {}
  ngAfterViewInit() {
    // Initialize the chart
    const chart = echarts.init(document.getElementById('aqi-line-chart') as HTMLElement);

    // Chart options (from the ECharts example)
    const options = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Beijing AQI', 'Shanghai AQI', 'Guangzhou AQI', 'Chengdu AQI', 'Shenzhen AQI', 'Wuhan AQI']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Beijing AQI',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Shanghai AQI',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Guangzhou AQI',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Chengdu AQI',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Shenzhen AQI',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },
        {
          name: 'Wuhan AQI',
          type: 'line',
          stack: 'Total',
          data: [420, 532, 501, 534, 590, 530, 520]
        }
      ]
    };

    // Set the chart options
    chart.setOption(options);
  }
  searchCoin() {
    this.coinService.getCoinData(this.searchQuery).subscribe(
      (data) => {
        this.currentCoin = data;
        console.clear(); console.log(this.currentCoin)
      },
      (error) => {
        console.error('Error fetching coin data:', error);
        this.currentCoin = null;
      }
    );
  }
}