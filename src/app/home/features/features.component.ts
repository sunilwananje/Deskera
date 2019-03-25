import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonService } from '../../service/common.service';
import { Subscription } from 'rxjs';
import { env } from '../../config/env';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  country: string;
  features = [];
  imagePath = env.localApi+'/storage/images/';
  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.subscriptions.push(this.commonService.countryChanged.subscribe((countryCode: string) => {
      this.country = countryCode;
      this.subscriptions.push(this.apiService.getFeatures(countryCode).subscribe((data: any) => {
        this.features = data;
      })
      );
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
