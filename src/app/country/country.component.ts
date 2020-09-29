import * as fromApp from '../store/app.reducer';
import * as CountryActions from './store/country.actions';

import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Country } from './country.model';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

  data:         any;
  subscription: Subscription;
  routerSub:    Subscription;
  kind:         any;
  countryList:  any;

  
  datesAvailable = ['202003', '202004', '202005', '202006', '202007']

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute) { }

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
                  {
                    label: 'Confirmed Cases',
                    backgroundColor: '#B03A2E',
                    borderColor: '#B03A2E',
                    fill: false,
                    data: []
                  },
                  {
                    label: 'Recovered Cases',
                    backgroundColor: '#148F77',
                    fill: false,
                    borderColor: '#148F77',
                    data: []
                  },
                  {
                    label: 'Deaths',
                    backgroundColor: '#154360',
                    fill: false,
                    borderColor: '#154360',
                    data: []
                  }
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
                  {
                    label: 'Confirmed Cases',
                    backgroundColor: '#B03A2E',
                    borderColor: '#B03A2E',
                    fill: false,
                    data: []
                  },
                  {
                    label: 'Active Cases',
                    backgroundColor: '#2980B9',
                    fill: false,
                    borderColor: '#2980B9',
                    data: []
                  },
                  {
                    label: 'Recovered Cases',
                    backgroundColor: '#148F77',
                    fill: false,
                    borderColor: '#148F77',
                    data: []
                  },
                  {
                    label: 'Deaths',
                    backgroundColor: '#154360',
                    fill: false,
                    borderColor: '#154360',
                    data: []
                  }
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
                labels: [
                  moment('2020-03-01').format('MMM YYYY'),
                  moment('2020-04-01').format('MMM YYYY'),
                  moment('2020-05-01').format('MMM YYYY'),
                  moment('2020-06-01').format('MMM YYYY'),
                  moment('2020-07-01').format('MMM YYYY')
                ],
                datasets: [
                  {
                    label: 'Confirmed Cases',
                    backgroundColor: '#B03A2E',
                    data: []
                  },
                  {
                    label: 'Active Cases',
                    backgroundColor: '#2980B9',
                    data: []
                  },
                  {
                    label: 'Recovered Cases',
                    backgroundColor: '#148F77',
                    data: []
                  },
                  {
                    label: 'Deaths',
                    backgroundColor: '#154360',
                    data: []
                  }
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSub.unsubscribe();
  }

}
