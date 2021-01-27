import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldHigh";  


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private chart: am4maps.MapChart;

  ngAfterViewInit() {
    this.chart = am4core.create("chartdiv", am4maps.MapChart);
    this.chart.geodata = am4geodata_worldLow;
    this.chart.projection = new am4maps.projections.Miller();

    this.chart.height = am4core.percent(80);
    this.chart.zoomControl = new am4maps.ZoomControl();
    this.chart.zoomControl.align = "right";
    this.chart.zoomControl.marginRight = 15;
    this.chart.zoomControl.valign = "middle";
    this.chart.zoomControl.paddingTop = am4core.percent(90);

    this.chart.homeGeoPoint = { longitude: 28, latitude: 31 };

    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    

    polygonSeries.heatRules.push({
      "property": "fill",
      "target": polygonSeries.mapPolygons.template,
      "min": am4core.color("#ffffd9"),
      "max": am4core.color("#081d58"),
      "logarithmic": true
    });

    let heatLegend = this.chart.createChild(am4maps.HeatLegend);
    heatLegend.paddingTop = am4core.percent(40);
    heatLegend.height = am4core.percent(100);
    heatLegend.orientation = "vertical";
    heatLegend.series = polygonSeries;
    
    heatLegend.minColor = am4core.color("#ffffd9");
    heatLegend.maxColor = am4core.color("#081d58");
    heatLegend.minValue = 0;
    heatLegend.maxValue = 2000;

    polygonSeries.mapPolygons.template.events.on("over", function(ev) {
      if (!isNaN(ev.target.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
      }
      else {
        heatLegend.valueAxis.hideTooltip();
      }
    });
    
    polygonSeries.mapPolygons.template.events.on("out", function(ev) {
      heatLegend.valueAxis.hideTooltip();
    });

    polygonSeries.data= [{
      "id": "US",
      "name": "United States",
      "value": 100
    }, {
      "id": "FR",
      "name": "France",
      "value": 50
    }]

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;
    polygonTemplate.fill = am4core.color("#74B267");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#74X999");

    polygonTemplate.stroke = am4core.color("#000");
    polygonTemplate.strokeWidth = 0.2;
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
