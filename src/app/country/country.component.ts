import * as fromApp from '../store/app.reducer';
import * as CountryActions from './store/country.actions';
import { AppConfigService } from '../services/app-config.service';



import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Country } from './country.model';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-country',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('open => closed', [
        animate('1.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

  data:         any;
  subscription: Subscription;
  routerSub:    Subscription;
  kind:         any;
  countryList:  any;
  confirmedCasesConfig: any;
  recoveredCasesConfig: any;
  deathCasesConfig: any;
  activeCasesConfig: any;
  isSharePopupOpen = false;
  datesAvailable = ['202003', '202004', '202005', '202006', '202007']
  monthsLabels = [ 
    moment('2020-03-01').format('MMM YYYY'),
    moment('2020-04-01').format('MMM YYYY'),
    moment('2020-05-01').format('MMM YYYY'),
    moment('2020-06-01').format('MMM YYYY'),
    moment('2020-07-01').format('MMM YYYY')
  ]

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private configService: AppConfigService,
    private clipboardService: ClipboardService) { }

    popupToggle() {
      this.isSharePopupOpen = !this.isSharePopupOpen;
    }

    createArrayOfDates(dateFrom, dateTo) {
      var r = []; // array of results
      var s = moment(dateFrom, "YYYYMMDD"); // start date
      var e = moment(dateTo, "YYYYMMDD")   //  end date
      while (s < e ) {
        r.push(s.format('DD MMM'));
        s.add(1, 'days');
      }

      return r
    }  

  ngOnInit() {
    this.confirmedCasesConfig = this.configService.confirmedCases;
    this.recoveredCasesConfig = this.configService.recoveredCases;
    this.deathCasesConfig     = this.configService.deathCases;
    this.activeCasesConfig    = this.configService.activeCases;

    this.routerSub = this.activatedRoute.data.subscribe(r => {
      this.kind = r.kind;
      switch (r.kind) {
        case 'daily-growth': {
          this.store.dispatch(new CountryActions.getCountryDailyGrowth);
          this.subscription = this.store.select('country').pipe(
            map(countryState => countryState.countryList))
            .subscribe((countries: Country[]) => {
              this.countryList = countries;
              this.data = {
                labels: this.createArrayOfDates('20200401', '20200731'),
                datasets: [
                  this.confirmedCasesConfig,
                  this.recoveredCasesConfig,
                  this.deathCasesConfig
                ]
              }
              this.data.datasets[0].data = _.map(this.countryList, (i) => { return i['confirmed'] })
              this.data.datasets[1].data = _.map(this.countryList, (i) => { return i['recovered'] })
              this.data.datasets[2].data = _.map(this.countryList, (i) => { return i['deaths'] })
            })
          break;
        }
        case 'days': {
          this.store.dispatch(new CountryActions.getCountriesDaily);
          this.subscription = this.store.select('country').pipe(
            map(countryState => countryState.countryList))
            .subscribe((countries: Country[]) => {
              this.countryList = countries;
              this.data = {
                labels: this.createArrayOfDates('20200401', '20200731'),
                datasets: [
                  this.confirmedCasesConfig,
                  this.activeCasesConfig,
                  this.recoveredCasesConfig,
                  this.deathCasesConfig
                ]
              }
              this.data.datasets[0].data = _.map(this.countryList, (i) => { return i['confirmed'] })
              this.data.datasets[1].data = _.map(this.countryList, (i) => { return i['activeCases'] })
              this.data.datasets[2].data = _.map(this.countryList, (i) => { return i['recovered'] })
              this.data.datasets[3].data = _.map(this.countryList, (i) => { return i['deaths'] })
            })
            break;
        }
        case 'months': {
          this.store.dispatch(new CountryActions.getCountries);
          this.subscription = this.store.select('country').pipe(
            map(countryState => countryState.countryList))
            .subscribe((countries: Country[]) => {
              this.countryList = countries;
              this.data = {
                labels: this.monthsLabels,
                datasets: [
                  this.confirmedCasesConfig,
                  this.activeCasesConfig,
                  this.recoveredCasesConfig,
                  this.deathCasesConfig
                ]
              }
              this.data.datasets[0].data = _.map(this.countryList, (i) => { return i['confirmed'] })
              this.data.datasets[1].data = _.map(this.countryList, (i) => { return i['activeCases'] })
              this.data.datasets[2].data = _.map(this.countryList, (i) => { return i['recovered'] })
              this.data.datasets[3].data = _.map(this.countryList, (i) => { return i['deaths'] })
            })
            break;
        }
        default: {
          break;
        }
      }
    })
  }

  onShareButtonClick() {
    this.popupToggle();
    setTimeout(()=> {
      this.popupToggle();
    }, 2000);
    this.clipboardService.copy(window.location.href);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSub.unsubscribe();
  }

}
