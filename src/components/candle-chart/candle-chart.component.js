
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class CandleChart extends React.Component {
  constructor(props) {
    super(props);

      
    };
  

  componentDidMount = () => {
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    let chart = am4core.create("candelchart", am4charts.XYChart);
    chart.paddingRight = 20;

    chart.data = [ {
        "zone": "Zone-1",
        "max": 152.3,
        "high": 156.96,
        "low": 121.15,
        "min": 136.49,
        "max2": 156.3,
        "high2": 162.96,
        "low2": 122.15,
        "min2": 137.49,
        "background":"#37FF82",
        "threshold": "100",
        "avg": 20,
        "threshold2": "20",
        "avg2": 100
      }, {
        "zone": "Zone-2",
        "max": 154.3,
        "high": 155.96,
        "low": 119.15,
        "min": 137.49,
        "max2": 153.3,
        "high2": 160.96,
        "low2": 123.15,
        "min2": 138.49,
        "background":"#37FF82",
        "threshold": "100",
        "avg": 21,
        "threshold2": "201",
        "avg2": 197
      }, {
        "zone": "Zone-3",
        "max": 152.3,
        "high": 156.96,
        "low": 121.15,
        "min": 136.49,
        "max2": 156.3,
        "high2": 162.96,
        "low2": 122.15,
        "min2": 137.49,
        "background":"#37FF82",
        "threshold": "100",
        "avg": 20,
        "threshold2": "201",
        "avg2": 100
      }];

      for(let i of chart.data){
          if(i.threshold > i.avg){
              i["background"] = "#37FF82"
          } else {
            i["background"] = "#FF7171"
          }
      }


      for(let i of chart.data){
        if(i.threshold2 > i.avg2){
            i["background2"] = "#37FF82"
        } else {
          i["background2"] = "#FF7171"
        }
    }

    
    // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    
    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.minGridDistance = 40;
    // dateAxis.renderer.grid.template.location = 0;
    // dateAxis.renderer.grid.template.disabled = true;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "zone";
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.grid.template.strokeWidth = 3
    // categoryAxis.renderer.grid.template.disabled = true;


    
    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.grid.template.disabled = true;
    // valueAxis.renderer.gridContainer.propertyFields.grid = "background";
    // console.log(valueAxis.renderer.gridContainer)
    // valueAxis.renderer.gridContainer.background.propertyFields.fill = "background";


    

    function createSeries(background, min, max, low, high, color){
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.marginRight = 10;
      // valueAxis.renderer.gridContainer.background.fill = am4core.color(color);

      let series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.categoryX = "zone";
      series.dataFields.valueY = min;
      series.dataFields.openValueY = max;
      series.dataFields.lowValueY = low;
      series.dataFields.highValueY = high;
      series.simplifiedProcessing = true;

      series.tooltipText = "Max:{openValueY.value}\nAvg:{lowValueY.value}\nThreshold:{highValueY.value}\nMin:{valueY.value}";
      series.riseFromOpenState = undefined;
      series.dropFromOpenState = undefined;
      chart.cursor = new am4charts.XYCursor();
      series.columns.template.propertyFields.fill = background;
      series.columns.template.propertyFields.stroke = background;
      series.columns.template.column.cornerRadiusTopRight = 5;
      series.columns.template.column.cornerRadiusTopLeft = 5;
      series.columns.template.column.cornerRadiusBottomLeft = 5;
      series.columns.template.column.cornerRadiusBottomRight = 5;
      series.columns.template.width = am4core.percent(70);

    }


    function createTopSeries(background, high, start, end){
      let topSeries = chart.series.push(new am4charts.StepLineSeries());
      topSeries.noRisers = true;
      topSeries.startLocation = start;
      topSeries.endLocation = end;
      topSeries.dataFields.valueY = high;
      topSeries.dataFields.categoryX = "zone";
      topSeries.propertyFields.stroke=background;
      topSeries.strokeWidth = 2;
  
    }

    function createBottomSeries(background, low, start, end){
      let bottomSeries = chart.series.push(new am4charts.StepLineSeries());
      bottomSeries.noRisers = true;
      bottomSeries.startLocation = start;
      bottomSeries.endLocation = end;
      bottomSeries.dataFields.valueY = low;
      bottomSeries.dataFields.categoryX = "zone";
      bottomSeries.propertyFields.stroke =  background;
      bottomSeries.strokeWidth = 2;
  
    }

    createSeries("background", "min", "max", "low", "high", "green")
    createTopSeries("background", "high", 0.1, 0.4)
    createBottomSeries("background", "low", 0.1, 0.4)
    
    createSeries("background2", "min2", "max2", "low2", "high2", "blue")
    createTopSeries("background2", "high2", 0.6, 0.9)
    createBottomSeries("background2", "low2", 0.6, 0.9)
    
    
    // chart.scrollbarX = new am4core.Scrollbar();



    // series. = am4core.color("red");
    function createBackground(x, y, widthin, heightin, colorin) {
        var rect = chart.createChild(am4core.Rectangle);
        rect.isMeasured = false;
        rect.width = am4core.percent(widthin);
        rect.height = am4core.percent(heightin);
        rect.x = am4core.percent(x);
        rect.y = am4core.percent(y);
        rect.opacity = .3;
        rect.fill = colorin;
        chart.plotContainer.children.push(rect);
        rect.defaultState.transitionDuration = 0;
        rect.hiddenState.transitionDuration = 0;
      }
  
  
    createBackground(0, 0, 16, 100, "red");
    createBackground(16, 0, 17, 100, "blue");
    createBackground(33, 0, 17, 100, "red");
    createBackground(50, 0, 17, 100, "blue");
    createBackground(67, 0, 16, 100, "red");
    createBackground(83, 0, 17, 100, "blue");



};


  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }



  render() {
    return (
        <div id="candelchart" style={{ height:'400px' }}>
        </div>
    )
  }
}

export default CandleChart;




