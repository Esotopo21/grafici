import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { ChartType, ChartTypeDropdown, ChartTypeEnum, createSimpleXYChart, createXYLegendChart, PIECHART } from '../chart';
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

  public chartType: ChartType = {label: 'Select chart type', value: null};
  public chartTypeDropdown = ChartTypeDropdown;

  public chartTypeEnum = ChartTypeEnum;

  ngOnInit(): void {
  }

  public logger(el){
    console.log(el);
    console.log(ChartTypeEnum.LEGEND);
  }

  public createChart($event): void{
    console.log('receving');
    switch (Number($event.type)){
      case 0:
        createSimpleXYChart($event.data, $event.colorList);
        break;
      case 1:
        createXYLegendChart($event.data, null, true, false);
        break;
    }
  }
}


