import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { SimpleBarChartComponent } from './simple-bar-chart/simple-bar-chart.component';
import { LegendBarChartComponent } from './legend-bar-chart/legend-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SimpleBarChartComponent,
    LegendBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
