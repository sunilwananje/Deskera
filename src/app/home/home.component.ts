import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public ip;
  subscriptions: Subscription[] = []
  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.subscriptions.push(this.apiService.getClientIp().subscribe((data: any) => {
      //this.ip = data.ip;
      this.subscriptions.push(this.apiService.getClientLocation(data.ip).subscribe((loc: any) => {
        console.log(JSON.stringify(loc.countryCode));
        this.commonService.onCountryChanged(loc.countryCode);
      })
      );
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
