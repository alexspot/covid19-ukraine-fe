import { City } from './city.model';
import * as fromApp from '../store/app.reducer';

import * as CityActions from './store/city.actions';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Chart } from 'chart.js';
import { UIChart } from "node_modules/primeng/chart/chart";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit, OnDestroy {
  @ViewChild("chart", {static: false}) chart: UIChart; 

  minDateCalendar = new Date('2020-06-02')
  maxDateCalendar = new Date('2020-07-31')
  defaultCalendarDate = this.minDateCalendar;
  calendarDateFormat = 'M dd yy'
  calendarValue : String = null;

  uiChartCityLabels = [
    'Cherkasy Oblast', 
    'Chernihiv Oblast',
    'Chernivtsi Oblast',
    'Crimea Republic*',
    'Dnipropetrovsk Oblast',
    'Donetsk Oblast',
    'Ivano-Frankivsk Oblast',
    'Kharkiv Oblast',
    'Kherson Oblast',
    'Khmelnytskyi Oblast',
    'Kiev',
    'Kiev Oblast',
    'Kirovohrad Oblast',
    'Luhansk Oblast',
    'Lviv Oblast',
    'Mykolaiv Oblast',
    'Odessa Oblast',
    'Poltava Oblast',
    'Rivne Oblast',
    'Sevastopol*',
    'Sumy Oblast',
    'Ternopil Oblast',
    'Vinnytsia Oblast',
    'Volyn Oblast',
    'Zakarpattia Oblast',
    'Zaporizhia Oblast',
    'Zhytomyr Oblast',
  ]

  cityList: City[];
  list: any;
  cityListForNumbersChart = [];
  maxDate: String;
  subscription: Subscription;
  data: any;
  annotation: any;
  options: any;

  constructor(private store: Store<fromApp.AppState>) {}

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

  this.store.dispatch(new CityActions.getMaxDate());
  this.subscription = this.store.select('city').pipe(
    map((cityState) => {
      return cityState.maxDate
    }))
    .subscribe((d) => {
      this.maxDate = d;
    })

  this.data = {
    labels: [
      'Cherkasy Oblast',
      'Chernihiv Oblast',
      'Chernivtsi Oblast',
      'Crimea Republic*',
      'Dnipropetrovsk Oblast',
      'Donetsk Oblast',
      'Ivano-Frankivsk Oblast',
      'Kharkiv Oblast',
      'Kherson Oblast',
      'Khmelnytskyi Oblast',
      'Kiev',
      'Kiev Oblast',
      'Kirovohrad Oblast',
      'Luhansk Oblast',
      'Lviv Oblast',
      'Mykolaiv Oblast',
      'Odessa Oblast',
      'Poltava Oblast',
      'Rivne Oblast',
      'Sevastopol*',
      'Sumy Oblast',
      'Ternopil Oblast',
      'Vinnytsia Oblast',
      'Volyn Oblast',
      'Zakarpattia Oblast',
      'Zaporizhia Oblast',
      'Zhytomyr Oblast',
    ],
    // labels: this.createArrayOfDates('20200601', '20200630'),
    datasets: [
      {
        label: 'My First dataset',
        barPercentage: 0.9,
        minBarLength: 2,
        backgroundColor: '#42A5F5',
        data: []
      }
    ]
  }

  this.annotation = {
    annotation: {
      annotations: [{
        type: 'bar',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: '100',
        borderColor: 'tomato',
        borderWidth: 2
      }],
      drawTime: "afterDraw" // (default)
    }
  }

  this.options = {
    legend: {
      display: true,
    },
    tooltips: {
      enabled: true,
    },
    annotation: {
      annotations: [{
        type: 'bar',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: '0',
        borderColor: 'tomato',
        borderWidth: 2
      }],
      drawTime: "afterDraw" // (default)
    }
  };
    // hardcode date for now, later we should use some sort of dropdown to get desired month
    // this.store.dispatch(new CityActions.getDailyStatsByDate('20200606'));
    // this.subscription = this.store.select('city').pipe(
    //   map(cityState => cityState.cityList))
    //   .subscribe((cities) => {
    //     this.list = cities;
    //     this.data.datasets[0].data = _.map(this.list, (i) => { return i['confirmed'] })
    //   })
  }

  getCityDailyDataByDate(date) {
    this.store.dispatch(new CityActions.getDailyStatsByDate(date));
    this.subscription = this.store.select('city').pipe(
      map(cityState => cityState.cityList))
      .subscribe((cities) => {
        this.list = cities;
        this.data.datasets[0].data = _.map(this.list, (i) => { return i['confirmed'] })
        this.chart.refresh();
      })
  }

  transformCityListToNgxChartsFormat(data) {
    let r = [];
    data.forEach(i => {
      let t = { name: i.name, value: i.confirmed }
      r.push(t);
    })
    return r
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleChange(e) {
    let isChecked = e.checked;
    if (isChecked) {
      this.ngOnInit();
      this.options.annotation = this.annotation;
    } else {
      this.options.annotation = {}; 
      this.ngOnInit();
    }
  }

  onCalendarDateChange(event) {
    this.getCityDailyDataByDate(moment(event).format('YYYYMMDD'));
  }
}



    // this.store.dispatch(new CityActions.getCities('20200705'));
    // this.subscription = this.store.select('city').pipe(
    //   map(cityState => cityState.cityList))
    //   .subscribe((cities: City[]) => {
    //     this.cityList = cities;
    //     this.cityListForNumbersChart = this.transformCityListToNgxChartsFormat(this.cityList);
    //   })
    //   let namedChartAnnotation = ChartAnnotation;
    //   namedChartAnnotation["id"]="annotation";
    //   Chart.pluginService.register(namedChartAnnotation);