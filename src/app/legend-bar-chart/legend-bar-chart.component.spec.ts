import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendBarChartComponent } from './legend-bar-chart.component';

describe('LegendBarChartComponent', () => {
  let component: LegendBarChartComponent;
  let fixture: ComponentFixture<LegendBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
