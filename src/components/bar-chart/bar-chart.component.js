
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class BarChart extends React.Component {
  constructor(props) {
    super(props);

      
    };
  

  componentDidMount = (ssf_data=false) => {
    let chart = am4core.create(this.props.chart_id, am4charts.XYChart);

// Add data

chart.data = [ {
  "year": "2003",
  "europe": 2.5,
  "namerica": 2.5,
  "asia": 2.1,
  "lamerica": 1.2,
  "meast": 0.2,
  "africa": 0.1
}, {
  "year": "2004",
  "europe": 2.6,
  "namerica": 2.7,
  "asia": 2.2,
  "lamerica": 1.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "year": "2005",
  "europe": 2.8,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 1.4,
  "meast": 0.3,
  "africa": 0.1
},{
    "year": "2006",
    "europe": 2.8,
    "namerica": 2.9,
    "asia": 2.4,
    "lamerica": 1.4,
    "meast": 0.3,
    "africa": 0.1
  },{
    "year": "2007",
    "europe": 2.8,
    "namerica": 2.9,
    "asia": 2.4,
    "lamerica": 1.4,
    "meast": 0.3,
    "africa": 0.1
  },{
    "year": "2008",
    "europe": 2.8,
    "namerica": 2.9,
    "asia": 2.4,
    "lamerica": 1.4,
    "meast": 0.3,
    "africa": 0.1
  },{
    "year": "2009",
    "europe": 2.8,
    "namerica": 2.9,
    "asia": 2.4,
    "lamerica": 1.4,
    "meast": 0.3,
    "africa": 0.1
  },{
    "year": "2010",
    "europe": 2.8,
    "namerica": 2.9,
    "asia": 2.4,
    "lamerica": 1.4,
    "meast": 0.3,
    "africa": 0.1
  } ];

  if(ssf_data && ssf_data === "MT"){
    chart.data = [ {
      "year": "2010",
      "europe": 1.5,
      "namerica": 2.5,
      "asia": 2.1,
      "lamerica": 1.2,
      "meast": 0.2,
      "africa": 0.1
    }, {
      "year": "2011",
      "europe": 3.6,
      "namerica": 2.7,
      "asia": 2.2,
      "lamerica": 1.3,
      "meast": 0.3,
      "africa": 0.1
    }, {
      "year": "2012",
      "europe": 5.8,
      "namerica": 2.9,
      "asia": 2.4,
      "lamerica": 1.4,
      "meast": 0.3,
      "africa": 0.1
    },{
        "year": "2013",
        "europe": 6.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 1.4,
        "meast": 0.3,
        "africa": 0.1
      },{
        "year": "2014",
        "europe": 4.8,
        "namerica": 3.9,
        "asia": 3.4,
        "lamerica": 2.4,
        "meast": 0.6,
        "africa": 0.2
      },{
        "year": "2014",
        "europe": 4.8,
        "namerica": 3.9,
        "asia": 3.4,
        "lamerica": 2.4,
        "meast": 0.6,
        "africa": 0.2
      },{
        "year": "2014",
        "europe": 4.8,
        "namerica": 3.9,
        "asia": 3.4,
        "lamerica": 2.4,
        "meast": 0.6,
        "africa": 0.2
      },{
        "year": "2014",
        "europe": 4.8,
        "namerica": 3.9,
        "asia": 3.4,
        "lamerica": 2.4,
        "meast": 0.6,
        "africa": 0.2
      } ]
  } else if (ssf_data && ssf_data === "MICRO"){
    chart.data = [ {
      "year": "2018",
      "europe": 2.8,
      "namerica": 2.5,
      "asia": 2.1,
      "lamerica": 1.2,
      "meast": 0.2,
      "africa": 0.1
    }, {
      "year": "2019",
      "europe": 2.0,
      "namerica": 2.7,
      "asia": 2.2,
      "lamerica": 1.3,
      "meast": 0.3,
      "africa": 0.1
    }, {
      "year": "2020",
      "europe": 2.2,
      "namerica": 3.9,
      "asia": 4.4,
      "lamerica": 2.4,
      "meast": 1.3,
      "africa": 0.7
    },{
      "year": "2020",
      "europe": 2.2,
      "namerica": 3.9,
      "asia": 4.4,
      "lamerica": 2.4,
      "meast": 1.3,
      "africa": 0.7
      },{
        "year": "2020",
        "europe": 2.2,
        "namerica": 3.9,
        "asia": 4.4,
        "lamerica": 2.4,
        "meast": 1.3,
        "africa": 0.7
      },{
        "year": "2020",
        "europe": 2.2,
        "namerica": 3.9,
        "asia": 4.4,
        "lamerica": 2.4,
        "meast": 1.3,
        "africa": 0.7
      },{
        "year": "2020",
        "europe": 2.2,
        "namerica": 3.9,
        "asia": 4.4,
        "lamerica": 2.4,
        "meast": 1.3,
        "africa": 0.7
      },{
        "year": "2020",
        "europe": 2.2,
        "namerica": 3.9,
        "asia": 4.4,
        "lamerica": 2.4,
        "meast": 1.3,
        "africa": 0.7
      } ]
  }

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.title.text = "Local country offices";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;
categoryAxis.renderer.grid.template.disabled = true;

let  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.title.text = "Expenditure (M)";
valueAxis.renderer.grid.template.disabled = true;

// Create series
function createSeries(field, name, stacked, colorin) {
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "year";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
  series.stacked = stacked;
  series.columns.template.width = am4core.percent(95);
  series.columns.template.fill=colorin;
  series.columns.template.column.cornerRadiusTopLeft = 5;  
  series.columns.template.column.cornerRadiusTopRight = 5;
  series.columns.template.column.cornerRadiusBottomRight = 5;
  series.columns.template.column.cornerRadiusBottomLeft = 5;
    series.columns.template.strokeOpacity = 0;
}

createSeries("europe", "Europe", false, "#FF7171");
createSeries("asia", "Asia", false, "#5655B4");


};


  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }



  render() {
      let chart_id = this.props.chart_id;
    return (
        <div id={chart_id} style={{ height:'400px' }}>
        </div>
    )
  }
}

export default BarChart;
