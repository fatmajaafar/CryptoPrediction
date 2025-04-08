import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  activeSection: string | null = null;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.activeSection = fragment;
  
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            this.loadChart(fragment);
          }
        }, 100);
      }
    });
  }
  
  loadChart(fragment: string) {
    const chartId = `chart-${fragment}`;
    const chartEl = document.getElementById(chartId) as HTMLElement;
  
    if (!chartEl) {
      console.warn('Chart container not found:', chartId);
      return;
    }
  
    const chart = echarts.init(chartEl);
    const options = {
      title: { text: '' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Example'] },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{
        name: fragment || 'Data',
        type: 'line',
        stack: 'Total',
        data: [1200, 1500, 1800]
      }],
    };
  
    chart.setOption(options);
  }
  }
