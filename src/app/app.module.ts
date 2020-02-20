import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from '../services/service.module';

import { AppComponent } from './app.component';
import { ProcessModule } from '../process/process.module';
import { HttpClientModule } from '@angular/common/http'
/* import { ChartsModule } from 'ng2-charts'
 */

@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ServiceModule,
    ProcessModule,
    HttpClientModule,
    /* ChartsModule */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
