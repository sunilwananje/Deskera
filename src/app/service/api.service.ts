import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../config/env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // Get Client IP Address
  getClientIp() {
    return this.httpClient.get(`${env.ipfApi}`); //return ip;
  }

  // Get Client location from IP Address
  getClientLocation(ip) {
    return this.httpClient.get(`${env.localApi}/api/country/${ip}`); // return iso2
  }

  // Get all countries
  getAllCountries() {
    return this.httpClient.get(`${env.countryApi}/all`);
  }

  // Get Client country
  getCountryDetails(iso2) {
    return this.httpClient.get(`${env.countryApi}/alpha/${iso2}`);
  }

  // Fetch all featurs
  getFeatures(iso2) {
    return this.httpClient.get(`${env.localApi}/api/features/${iso2}`);
  }

  // Fetch all testimonials
  getTestimonials() {
    return this.httpClient.get(`${env.localApi}/api/testimonials`);
  }

  // Save hero form data
  saveHeroService(inputData) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
      this.httpClient.post(`${env.localApi}/api/hero/save`, inputData, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          // console.log(err);
          reject(err.error);
        });
    });
  }

  // Save hero form data
  saveCountryService(inputData) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
      this.httpClient.post(`${env.localApi}/api/country/save`, inputData, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          // console.log(err);
          reject(err.error);
        });
    });
  }

  // Fetch all custom addedd countries
  getCustomCountryList() {
    return this.httpClient.get(`${env.localApi}/api/countries`);
  }
}
