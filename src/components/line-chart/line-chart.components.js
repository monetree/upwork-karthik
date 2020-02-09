
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class LineChart extends React.Component {
  constructor(props) {
    super(props);

      
    };
    
  

  componentDidMount = (ssf_data = false) => {

    let chart = am4core.create(this.props.chart_id, am4charts.XYChart);

    chart.paddingRight = 20;
    var title = chart.titles.create();
    

    chart.data = [
      {"date":"2020-01-10","visits":1,"market1": 71,"stroke":"0",
      "market2": 75,
      "sales1": 5,
      "sales2": 8},
      {"date":"2020-02-20","visits":24,"market1": 74,"stroke":"0",
      "market2": 78,
      "sales1": 4,
      "sales2": 6},
      {"date":"2020-03-12","visits":13, "market1": 78,"stroke":"0",
      "market2": 88,
      "sales1": 5,
      "sales2": 2},
      {"date":"2020-04-15","visits":19,"market1": 85,"stroke":"10",
      "market2": 89,
      "sales1": 8,
      "sales2": 9},
      {"date":"2020-05-19","visits":10, "market1": 82,"stroke":"0",
      "market2": 89,
      "sales1": 9,
      "sales2": 6},
      {"date":"2020-06-22","visits":22, "market1": 83,
      "market2": 85,
      "sales1": 3,
      "sales2": 5,
      "stroke":"0"}
      
      ]

      if(ssf_data && ssf_data === "MT"){
        chart.data = [
          {"date":"2020-01-10","visits":1,"market1": 21,"stroke":"0",
          "market2": 75,
          "sales1": 5,
          "sales2": 8},
          {"date":"2020-02-20","visits":24,"market1": 54,"stroke":"0",
          "market2": 78,
          "sales1": 4,
          "sales2": 6},
          {"date":"2020-03-12","visits":13, "market1": 78,"stroke":"0",
          "market2": 88,
          "sales1": 5,
          "sales2": 2},
          {"date":"2020-04-15","visits":19,"market1": 155,"stroke":"10",
          "market2": 89,
          "sales1": 8,
          "sales2": 9},
          {"date":"2020-05-19","visits":10, "market1": 122,"stroke":"0",
          "market2": 89,
          "sales1": 9,
          "sales2": 6}
          ]
      } else if (ssf_data && ssf_data === "MICRO"){
        chart.data = [
          {"date":"2020-01-10","visits":15,"market1": 201,"stroke":"0",
          "market2": 75,
          "sales1": 5,
          "sales2": 8},
          {"date":"2020-02-20","visits":14,"market1": 154,"stroke":"0",
          "market2": 78,
          "sales1": 4,
          "sales2": 6},
          {"date":"2020-03-12","visits":63, "market1": 78,"stroke":"0",
          "market2": 88,
          "sales1": 5,
          "sales2": 2},
          {"date":"2020-04-15","visits":19,"market1": 65,"stroke":"10",
          "market2": 89,
          "sales1": 8,
          "sales2": 9}
          ]
      }
  


    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
    "timeUnit": "minute",
    "count": 1
    };
    dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
    dateAxis.renderer.grid.template.disabled = true;

    chart.zoom.disabled = true

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = "Unique visitors";

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "Market Days";
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;


    let serie1 = chart.series.push(new am4charts.LineSeries());
    serie1.dataFields.dateX = "date";
    serie1.dataFields.valueY = "visits";
    serie1.tooltipText = "Visits: [bold]{valueY}[/]";
    serie1.fillOpacity = 0.8;
    serie1.strokeOpacity = 0;

    if(this.props.threshold){
      let bullet4 = serie1.bullets.push(new am4charts.CircleBullet());
      // bullet4.circle.radius = 10;
      bullet4.circle.strokeWidth = 3;
      bullet4.circle.propertyFields.radius = "stroke"
      bullet4.stroke = am4core.color("#fff");
      bullet4.circle.fill = am4core.color("#FF7171");
      bullet4.draggable = true;
    }

    
    if(this.props.trend_line){
      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueY = "market1";
      series2.dataFields.dateX = "date";
      series2.name = "Market Days";
      series2.strokeWidth = 2;
      series2.stroke = am4core.color("#37FF82");
      series2.tensionX = 0.7;
      series2.yAxis = valueAxis2;
      series2.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
      series2.propertyFields.fill = am4core.color("red");
  
    }

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color(this.props.color));
    gradient.addColor(am4core.color("#fff"));
    gradient.rotation = 90;
    serie1.fill = gradient;



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

export default LineChart;
