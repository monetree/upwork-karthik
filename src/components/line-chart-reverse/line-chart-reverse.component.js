
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class LineChartReverse extends React.Component {
  constructor(props) {
    super(props);

      
    };
    
  

  componentDidMount = (chart_data= null) => {
    let chart = am4core.create(this.props.chart_id, am4charts.XYChart);
    chart.cursor = new am4charts.XYCursor();
    chart.paddingRight = 20;
    var title = chart.titles.create();
    
    chart.data = []




  if(chart_data){
    chart.data = chart_data;
  }


  chart.leftAxesContainer.layout = "horizontal";



  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.text = "Total time taken";
  if(this.props.hit_drop){
    valueAxis.title.text = "Hit Drop";
  }
  valueAxis.renderer.minGridDistance = 30;
  valueAxis.dataFields.value = "sessions";


  
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.title.text = "Sessions";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.fontSize = 13
    categoryAxis.dataFields.category = "category";


    // chart.zoom.disabled = true
    chart.scrollbarX = new am4core.Scrollbar();




    let serie1 = chart.series.push(new am4charts.ColumnSeries());
    serie1.dataFields.categoryX = "category";
    serie1.dataFields.valueY = "sessions";
    serie1.tooltipText = "sessions: [bold]{valueY}[/]";
    serie1.fillOpacity = 0.8;
    serie1.strokeOpacity = 0;
    serie1.minBulletDistance = 1;

    let columnTemplate = serie1.columns.template;
    columnTemplate.strokeWidth = 0;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.width = 30;



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

export default LineChartReverse;
