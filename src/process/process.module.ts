
import { NgModule } from '@angular/core';
import {DemoComponent} from '.';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../services/service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts'

//import { CoreModule } from '../_core';


@NgModule({
  imports: [CommonModule, ServiceModule,ReactiveFormsModule,ChartsModule],
  providers: [],
  declarations: [
    DemoComponent
  ],
  exports: [DemoComponent]
})
export class ProcessModule {}
