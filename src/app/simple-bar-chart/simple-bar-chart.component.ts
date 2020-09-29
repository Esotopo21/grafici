import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BarData } from '../BarData';
import { ChartTypeEnum } from '../chart';
import { CColor } from '../color';

@Component({
  selector: 'app-simple-bar-chart',
  templateUrl: './simple-bar-chart.component.html',
  styleUrls: ['./simple-bar-chart.component.scss']
})
export class SimpleBarChartComponent implements OnInit {

  public data = [];
  public colorList: CColor[] = [];
  public actualColor = {};

  @Output() public emitter: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  public addData(): void{
    const temp = [...this.data];
    temp.push(new BarData());
    this.data = temp;
  }

  get getData(): BarData[]{
    return this.data;
  }

  public emit(): void{
    console.log('emitting');
    this.emitter.emit({data: this.data, colorList: this.colorList, type: ChartTypeEnum.XY});
  }

}
