import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiService, CalculateInterestService} from '.';


@NgModule({
  imports: [CommonModule],
  providers: [
    ApiService,
    CalculateInterestService
  ],
  declarations: [],
})
export class ServiceModule {}
