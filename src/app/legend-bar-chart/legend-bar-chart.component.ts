import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartTypeEnum } from '../chart';
import { LegendBarData } from '../LegendBarData';

@Component({
  selector: 'app-legend-bar-chart',
  templateUrl: './legend-bar-chart.component.html',
  styleUrls: ['./legend-bar-chart.component.scss']
})
export class LegendBarChartComponent implements OnInit {

  @Output() public emitter: EventEmitter<any> = new EventEmitter();

  public legendItems = [];
  public data: LegendBarData[] = [];
  public colorList = [];
  public stacked = true;
  public horizontal = false;

  public actualCat = null;
  public actualLeg = null;

  public categories = [];

  constructor() { }

  ngOnInit(): void {
  }

  public addCategory(): void{
    if (this.actualCat){
      this.categories.push(this.actualCat);
      const item = new LegendBarData();
      item.category = this.actualCat;
      item.vals = [];
      this.legendItems.forEach((element) => {
        item.vals.push({key: element, value: 0});
      });
      this.data.push(item);
    }
    this.actualCat = null;
  }

  public addLegendItem(): void{
    if (this.actualLeg){
      this.legendItems.push(this.actualLeg);
      this.data.forEach((element) => {
        element.vals.push({key: this.actualLeg, value: 0});
      });
    }
    this.actualLeg = null;
  }

  public emit(): void{
    this.emitter.emit({data: this.data, type: ChartTypeEnum.LEGEND});
  }

}
