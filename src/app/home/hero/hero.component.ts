import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  public heroFormGroup: FormGroup;
  public iso2: string;
  public hero;
  public isSubmit: boolean = false;
  public isFormSubmited: boolean = false;
  subscriptions:Subscription[] = [];
  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.subscriptions.push(this.commonService.countryChanged.subscribe((countryCode: string) => {
      this.subscriptions.push(this.apiService.getCountryDetails(countryCode).subscribe((data: any) => {
        console.log(data.callingCodes[0])
            this.iso2 = '+' + data.callingCodes[0];
          })
        );
      })
    );
    this.heroFormGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'organization_name': new FormControl(null, Validators.required)
      //'+' + this.iso2
    })
    //this.heroFormGroup.value.phone = '+' + this.iso2;
  }

  saveHeroForm(){
    this.isFormSubmited = true;
    console.log(this.heroFormGroup.value);
    this.apiService.saveHeroService(this.heroFormGroup.value).then((data: any) => {
      this.isSubmit = true;
      this.isFormSubmited = false;
      this.hero = data.data;
      console.log("hero=="+JSON.stringify(data))
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
