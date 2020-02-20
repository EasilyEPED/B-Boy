import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CalculateInterestService } from '../services/calculateinterest.service';
import { HttpClient,  } from '@angular/common/http'
import { ChartOptions, ChartType, ChartDataSets, } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-demo',
  templateUrl: './Demo.component.html',
  styleUrls: ['./Demo.component.css']
})
export class DemoComponent implements OnInit, OnDestroy {
  title = 'angular6-start';
  customerForm: FormGroup;
  creditForm: FormGroup;
  destroyed$ = new Subject<void>();
  listInterestPrecent = [...Array(101).keys()];
  presscalculate = false;
  warnningmessage = '';

  public barChartOptions: ChartOptions = {
    responsive: true,

    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  
  constructor(private fb: FormBuilder, private calculateservice: CalculateInterestService, private http: HttpClient)
   {
    this.customerForm = this.fb.group({
      Name: ['Sittichok'],
      SurName: ['Pradidchaikul'],
      BirthOfDate: ['30/08/1993'],
      Age: ['26'],
      IDCardNumber: ['1111111111'],
      Address: ['157/2 Bangkok'],
      CarBrand: ['Lambogini'],
      LicensePlate: ['55GG55'],
    });

    this.creditForm = this.fb.group({
      Amount: [null, [Validators.required, Validators.max(100000000000000000)]],
      Precent: [1, Validators.required],
    });

    this.listInterestPrecent.splice(0, 1)
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public barChartData: ChartDataSets[] = [
    { data: [null], label: 'Month' },
    /* { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' } */
  ];

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

  public CalculateInterest() {
    if(this.creditForm.invalid) {
      this.warnningmessage = 'กรุณากรอกจำนวนเงินก่อนคำนวณครับ';
      if(this.creditForm.controls.Amount.value > 100000000000000000) {
        this.warnningmessage = 'จำนวนเงินที่ระบุมากเกินไปครับ';
      }    
      this.presscalculate = true;
      return;
    }

    console.log(this.creditForm.value);
    /* let headers = new Headers();
    headers.append('Content-Type', 'application/json'); */
   /*  let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': 'true'
        }),
      };  */
    /* this.http.get<any>('http://localhost:5000/api/Simple/ ').subscribe(data => {}); */
    //this.http.post<any>('http://localhost:5000/GetProducts/', { amount: 100000, interestpercent: 2 }, httpOptions).subscribe(data => {});

    this.calculateservice.getCalculateinterestData(this.creditForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (res: any[]) => {
          this.barChartLabels = new Array<Label>();
          this.barChartData = new Array<ChartDataSets>();
          const ChartData = [];
          res.forEach((val) => {
            this.barChartLabels.push(val.month);
            ChartData.push(val.interest);
          });
          this.barChartData = [{ data: ChartData, label: 'Month' }];
          console.log(res);
        },
        (error) => {
          
        }
      );
  }
}
