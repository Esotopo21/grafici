export const PIECHART = 'PieSeries';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


export function createXYchart(conf): any{
    const data = conf.data;
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = data;
    const categoryAxis1 = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis1.dataFields.category = 'category';
    categoryAxis1.renderer.grid.template.location = 0;
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    const series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = 'value';
    series1.dataFields.categoryX = 'category';
    series1.strokeWidth = 3;
    series1.xAxis = categoryAxis1;
}

export function createBarChart(conf): any{
    
  }
