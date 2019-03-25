import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  countryChanged = new Subject<string>();
  constructor() { }

  onCountryChanged(countryCode: string){
    this.countryChanged.next(countryCode);
  }
}
