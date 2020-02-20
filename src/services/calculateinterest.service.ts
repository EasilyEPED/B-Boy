import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CalculateInterestService {

  constructor(private apiservice: ApiService) {}

  public getCalculateinterestData(data: any) {
    return this.apiservice
      .get('/CalculateInterest/' + data.Amount + '/' + data.Precent)
      //.get('/CalculateInterest/' + 100000 + '/' + 10)
      //.post('/CalculateInterest/', { amount: data.Amount, interestpercent: data.Precent })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

 /*  public UpdateAdditionalinfo(
    updateadditionaldetail: ListAdditionalDetail[]
  ): Observable<any> {
    return this.apiservice.post('/commands/UpdateAdditionalInfo', {
      ListAdditional: updateadditionaldetail,
    });
  } */
}
