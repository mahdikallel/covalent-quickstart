import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';

import { map } from 'rxjs/operators';

@Injectable()
export class AlertsService {

  constructor(private _http: HttpInterceptorService) {}

  query(): any {
   return this._http.get('data/alerts.json').pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }

  get(id: string): any {
   return this._http.get('data/alerts.json').pipe(
      map((res: Response) => {
        let item: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            item = s;
          }
        });
        return item;
      })
    );
  }
}
