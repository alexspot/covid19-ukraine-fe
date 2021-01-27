import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
      
  }

  get confirmedCases() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.countryChartConfig.confirmedCases;
  }

  get recoveredCases() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.countryChartConfig.recoveredCases;
  }

  get deathCases() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.countryChartConfig.deathCases;
  }

  get activeCases() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.countryChartConfig.activeCases;
  }
}