import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryModel } from '../../models/country-model';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit,OnDestroy {
  public countries;
  public customCountries: CountryModel[];
  public countryFormGroup: FormGroup;
  public isFormSubmited: boolean = false;
  country;
  subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
      this.subscriptions.push(this.apiService.getAllCountries().subscribe((data: any) => {
          this.countries = data;
        })
      );


      this.subscriptions.push(this.apiService.getCustomCountryList().subscribe((data: CountryModel[]) => {
          this.customCountries = data;
        })
      );

      this.countryFormGroup = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'alpha1': new FormControl(null, Validators.required),
        'alpha2': new FormControl(null, Validators.required),
        'calling_code': new FormControl(null, Validators.required),
        'top_level_domain': new FormControl(null, Validators.required),
        'capital': new FormControl(null, Validators.required),
        'region': new FormControl(null, Validators.required),
        'currency_name': new FormControl(null, Validators.required),
        'currency_symbol': new FormControl(null, Validators.required),
        'currency_code': new FormControl(null, Validators.required)
        //'+' + this.iso2
      })
  }

  onCountryChange(cc){
    this.commonService.onCountryChanged(cc);
    this.subscriptions.push(this.apiService.getCountryDetails(cc).subscribe((data:any) => {
        //this.country = data;
        this.countryFormGroup.patchValue({
          //name: data.name,
          alpha1: data.alpha2Code,
          alpha2: data.alpha3Code,
          calling_code: data.callingCodes['0'],
          top_level_domain: data.topLevelDomain['0'],
          capital: data.capital,
          region: data.region,
          currency_name: data.currencies['0'].name,
          currency_symbol: data.currencies['0'].symbol,
          currency_code: data.currencies['0'].code
        });
      })
    );
  }

  onSubmit(){
    console.log(JSON.stringify(this.countryFormGroup.value))
    this.isFormSubmited = true;
    //console.log(this.countryFormGroup.value);
    this.apiService.saveCountryService(this.countryFormGroup.value).then((data: any) => {
      this.isFormSubmited = false;
      this.countryFormGroup.reset();
      this.customCountries.push(data.data);
      //console.log("hero=="+JSON.stringify(data))
    }, error => {
      alert(JSON.stringify(error))
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
