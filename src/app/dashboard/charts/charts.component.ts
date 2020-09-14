import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    lineChartData: ChartDataSets[] = [
        { data: [72, 78, 75, 77, 75], label: 'Total SMS' },
    ];

    lineChartLabels: Label[] = ['February', 'March', 'April', 'May', 'June'];

    lineChartOptions = {

        maintainAspectRatio: false,
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'rgb(30,75,150)',
            backgroundColor: 'rgba(15,50,150,0.00)',
        },
    ];

    lineChartLegend = false;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor() { }

    ngOnInit() {
    }
}
