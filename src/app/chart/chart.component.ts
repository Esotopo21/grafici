import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { createBarChart, createXYchart, PIECHART } from '../chart';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { BarData } from '../BarData';
import { CColor } from '../color';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})


export class ChartComponent implements OnInit {

  constructor() { }

  public chartWidth = '1024px';

  public data: BarData[] = [{value: 5, category: 's', color: '#ffffff'}];
  public colorList: CColor[] = [];
  public actualColor = {};

  ngOnInit(): void {}

  public addData(){
    const temp = [...this.data];
    temp.push(new BarData());
    this.data = temp;
  }

  get getData(): BarData[]{
    return this.data;
  }

  public createChart(){
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.colors.list.slice(0, 0);
      chart.data = this.data.filter((d: BarData) => d.value && d.category);
      chart.numberFormatter.numberFormat = '#';
      chart.exporting.menu = new am4core.ExportMenu();
      chart.logo.disabled = true;
      if (this.colorList){
        this.colorList.forEach((color) => {
          if (color && color.hexa && color.hexa.length > 0 && color.enabled){
            chart.colors.list.push(am4core.color(color.hexa));
          }
        });
      }
      chart.colors.list.push();

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.labels.template.horizontalCenter = 'middle';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = 'value';
      series.dataFields.categoryX = 'category';
      series.columns.template.strokeWidth = 0;


      series.columns.template.column.cornerRadiusTopLeft = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;
      series.columns.template.column.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

    }

    public addColor(color){
      if (typeof color === 'string'){
        this.colorList.push({hexa: color, enabled: true});
      }
      console.log(this.colorList);
    }

  }


