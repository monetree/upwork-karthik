
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class LineChart extends React.Component {
  constructor(props) {
    super(props);

      
    };
    
  

  componentDidMount = (chart_data= null) => {
    let chart = am4core.create(this.props.chart_id, am4charts.XYChart);
    let ssf_data = false

    chart.paddingRight = 20;
    var title = chart.titles.create();
    
    chart.data = []




  if(chart_data){
    chart.data = chart_data;
  }



      if(ssf_data && ssf_data === "MT"){
        chart.data = [
          {"dateTime":"2020-01-10","visits":1,"market1": 21,"stroke":"0",
          "market2": 75,
          "sales1": 5,
          "sales2": 8},
          {"dateTime":"2020-02-20","visits":24,"market1": 54,"stroke":"0",
          "market2": 78,
          "sales1": 4,
          "sales2": 6},
          {"dateTime":"2020-03-12","visits":13, "market1": 78,"stroke":"0",
          "market2": 88,
          "sales1": 5,
          "sales2": 2},
          {"dateTime":"2020-04-15","visits":19,"market1": 155,"stroke":"10",
          "market2": 89,
          "sales1": 8,
          "sales2": 9},
          {"dateTime":"2020-05-19","visits":10, "market1": 122,"stroke":"0",
          "market2": 89,
          "sales1": 9,
          "sales2": 6}
          ]
      } else if (ssf_data && ssf_data === "MICRO"){
        chart.data = [
          {"dateTime":"2020-01-10","visits":15,"market1": 201,"stroke":"0",
          "market2": 75,
          "sales1": 5,
          "sales2": 8},
          {"dateTime":"2020-02-20","visits":14,"market1": 154,"stroke":"0",
          "market2": 78,
          "sales1": 4,
          "sales2": 6},
          {"dateTime":"2020-03-12","visits":63, "market1": 78,"stroke":"0",
          "market2": 88,
          "sales1": 5,
          "sales2": 2},
          {"dateTime":"2020-04-15","visits":19,"market1": 65,"stroke":"10",
          "market2": 89,
          "sales1": 8,
          "sales2": 9}
          ]
      }
  

    chart.dateFormatter.inputDateFormat = "yyyy.MM.dd";

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());



    dateAxis.baseInterval = {
    "timeUnit": "minute",
    "count": 1
    };

      dateAxis.title.text = "Dates";
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.tooltip.disabled = true;
      dateAxis.extraMax = 0.1;
      dateAxis.extraMin = 0.1
      dateAxis.dateFormats.setKey("month","dd-MMM-yy");
      dateAxis.periodChangeDateFormats.setKey('month',"dd-MMM-yy")
      dateAxis.renderer.labels.template.fontSize = 13


    // chart.zoom.disabled = true
    chart.scrollbarX = new am4core.Scrollbar();

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = "Sessions";

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis2.title.text = "Market Days";
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;


    let serie1 = chart.series.push(new am4charts.LineSeries());
    serie1.dataFields.dateX = "dateTime";
    serie1.dataFields.valueY = "visits";
    serie1.tooltipText = "Visits: [bold]{valueY}[/]";
    serie1.fillOpacity = 0.8;
    serie1.strokeOpacity = 0;
    serie1.minBulletDistance = 1;



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
      series2.dataFields.dateX = "dateTime";
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
