import {Injectable} from '@angular/core';
import {HttpInterceptorService} from '@covalent/http';

import {Observable} from "rxjs";
import {McDonalds} from "../../model/mcdonalds";
@Injectable()
export class GetMcDonaldsStoreByStateCodeService {

  constructor(private _http: HttpInterceptorService) {
  }

  getMcDonaldsStoreByStateCode(stateCode: string): Observable<any> {
    return this._http.get('http://localhost:8090/stores/' + stateCode);
  }


}
