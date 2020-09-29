export class LegendBarData{
    category: string;
    vals: LegendBarItem[];
}

export interface LegendBarItem{
    key: string;
    value: number;
}