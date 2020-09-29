export const PIECHART = 'PieSeries';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { BarData } from './BarData';
import { LegendBarData } from './LegendBarData';

export interface ChartType{
  label: string;
  value: number;
}

export const ChartTypeDropdown = [
  {label: 'Simple bar chart', value: 0} as ChartType,
  {label: 'Bar chart with legend', value: 1} as ChartType
];

export enum ChartTypeEnum{
  XY,
  LEGEND
}

export function createSimpleXYChart(data, colorList): any{
  const chart = am4core.create('chartdiv', am4charts.XYChart);
  chart.colors.list.slice(0, 0);
  chart.data = data.filter((d: BarData) => d.value && d.category);
  chart.numberFormatter.numberFormat = '#';
  chart.exporting.menu = new am4core.ExportMenu();
  chart.logo.disabled = true;
  if (colorList){
    colorList.forEach((color) => {
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

  series.columns.template.adapter.add('fill', function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });

}

function parseLegendBarData(data: LegendBarData[]): any[]{
  const dataList = [];
  data.forEach((el => {
    const obj = {};
    obj['category'] = el.category;
    el.vals.forEach((val) => {
      obj[val.key] = val.value;
    });
    dataList.push(obj);
  }));
  return dataList;
}
export function createXYLegendChart(data: LegendBarData[], colorList, stacked?, horizontal?): any{
  const itemList = data[0].vals.map((val) =>  val.key);
  const chart = am4core.create('chartdiv', am4charts.XYChart);
  chart.exporting.menu = new am4core.ExportMenu();
  chart.logo.disabled = true;

  chart.data = parseLegendBarData(data);

  const colorMap = new Map<string, am4core.Color>();

  if(colorList){
    for (let i = 0; i < itemList.length; i++){
      colorMap.set(itemList[i], colorList[i] ? am4core.color(colorList[i].hexa) : null);
    }
  }

  chart.legend = new am4charts.Legend();
  chart.legend.position = 'right';

  const categoryAxis = horizontal ? chart.yAxes.push(new am4charts.CategoryAxis()) : chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'category';

  const valueAxis = horizontal ? chart.xAxes.push(new am4charts.ValueAxis()) : chart.yAxes.push(new am4charts.ValueAxis());

  itemList.forEach((el) => createSeries(chart, colorMap, el, stacked, horizontal));


}

function createSeries(chart, colorMap, name, stacked?, horizontal?): any {
  const series = chart.series.push(new am4charts.ColumnSeries());
  if (horizontal){
    series.dataFields.categoryY = 'category';
    series.dataFields.valueX = name;

  }else{
    series.dataFields.valueY = name;
    series.dataFields.categoryX = 'category';
  }

  series.stacked = stacked ? stacked : false;
  series.name = name;

  // Can we do something better in order to avoid mandatory of color map?

  series.columns.template.adapter.add('fill', function(fill, target) {
    const color = colorMap.get(name);
    return color ? color : chart.colors.getIndex(target.dataItem.index);
  });

  series.columns.template.adapter.add('stroke', function(fill, target) {
    const color = colorMap.get(name);
    return color ? color : chart.colors.getIndex(target.dataItem.index);
  });

  const labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.locationX = 0.5;
  labelBullet.label.text = '{valueX}';
}
