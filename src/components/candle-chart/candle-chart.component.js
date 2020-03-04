
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class CandleChart extends React.Component {
  constructor(props) {
    super(props);

      
    };
  

  componentDidMount = (chart_data=null) => {
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    let chart = am4core.create("candelchart", am4charts.XYChart);
    chart.paddingRight = 20;


    chart.data = []

      if(chart_data){
        console.log(chart_data, "-->")
        for(let i=0;i<chart_data.length;i++){
          chart_data[i]["zone"] = "Zone"+(i+1)
        }
        chart.data = chart_data
      }

      for(let i of chart.data){
          if(parseInt(i.threshold) > i.avg){
              i["background"] = "#37FF82"
          } else {
            i["background"] = "#FF7171"
          }
      }


      for(let i of chart.data){
        if(parseInt(i.threshold2) > i.avg2){
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
      if(background === "background"){
        series.tooltipText = "Max:{openValueY.value}\nAvg:{avg}\nMin:{valueY.value}";
      } else {
        series.tooltipText = "Max:{openValueY.value}\nAvg:{avg2}\nMin:{valueY.value}";
      }
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
      topSeries.propertyFields.fill = background;
  
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
      bottomSeries.propertyFields.fill = background;
  
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
  
      if(chart.data.length === 3){
        createBackground(0, 0, 16, 100, "red");
        createBackground(16, 0, 17, 100, "blue");
        createBackground(33, 0, 17, 100, "red");
        createBackground(50, 0, 17, 100, "blue");
        createBackground(67, 0, 16, 100, "red");
        createBackground(83, 0, 17, 100, "blue");
      } else if (chart.data.length === 2){    
        createBackground(0, 0, 24, 100, "red");
        createBackground(24, 0, 26, 100, "blue");
        createBackground(50, 0, 26, 100, "red");
        createBackground(76, 0, 24, 100, "blue");
      } else if(chart.data.length === 7){
        createBackground(0, 0, 7, 100, "red");
        createBackground(7, 0, 7.5, 100, "blue");
        createBackground(14.4, 0, 7, 100, "red");
        createBackground(21.3, 0, 7.2, 100, "blue");
        createBackground(28.4, 0, 7, 100, "red");
        createBackground(35.3, 0, 7.5, 100, "blue");
        createBackground(42.9, 0, 7, 100, "red");
        createBackground(49.8, 0, 7.3, 100, "blue");
        createBackground(56.9, 0, 7, 100, "red");
        createBackground(63.8, 0, 7.3, 100, "blue");
        createBackground(71.1, 0, 7, 100, "red");
        createBackground(78, 0, 7.5, 100, "blue");
        createBackground(85.5, 0, 7, 100, "red");
        createBackground(92.5, 0, 7.5, 100, "blue");
      } else if(chart.data.length === 6){
        createBackground(0, 0, 8, 100, "red");
        createBackground(8, 0, 8.5, 100, "blue");
        createBackground(16.6, 0, 8.2, 100, "red");
        createBackground(24.8, 0, 8.3, 100, "blue");
        createBackground(33.1, 0, 8.3, 100, "red");
        createBackground(41.3, 0, 8.5, 100, "blue");
        createBackground(49.9, 0, 8.5, 100, "red");
        createBackground(58.3, 0, 8.5, 100, "blue");
        createBackground(66.7, 0, 8.5, 100, "red");
        createBackground(75.2, 0, 8.2, 100, "blue");
        createBackground(83.3, 0, 8.2, 100, "red");
        createBackground(91.4, 0, 8.6, 100, "blue");
      } else if(chart.data.length === 5){
        createBackground(0, 0, 10, 100, "red");
        createBackground(10, 0, 10, 100, "blue");
        createBackground(20, 0, 10, 100, "red");
        createBackground(30, 0, 10, 100, "blue");
        createBackground(40, 0, 10, 100, "red");
        createBackground(50, 0, 10, 100, "blue");
        createBackground(60, 0, 10, 100, "red");
        createBackground(70, 0, 10, 100, "blue");
        createBackground(80, 0, 10, 100, "red");
        createBackground(90, 0, 10, 100, "blue");
      }else if(chart.data.length === 4){
        createBackground(0, 0, 13, 100, "red");
        createBackground(13, 0, 12, 100, "blue");
        createBackground(25, 0, 12, 100, "red");
        createBackground(37, 0, 13, 100, "blue");
        createBackground(50, 0, 13, 100, "red");
        createBackground(63, 0, 12, 100, "blue");
        createBackground(75, 0, 13, 100, "red");
        createBackground(88, 0, 12, 100, "blue");
      }else if(chart.data.length === 1){
        createBackground(0, 0, 50, 100, "red");
        createBackground(50, 0, 50, 100, "blue");
      }else if(chart.data.length === 8){
        createBackground(0, 0, 7, 100, "red");
        createBackground(7, 0, 5.5, 100, "blue");
        createBackground(12.5, 0, 6.2, 100, "red");
        createBackground(18.6, 0, 6.2, 100, "blue");
        createBackground(24.8, 0, 6.2, 100, "red");
        createBackground(30.9, 0, 6.4, 100, "blue");
        createBackground(37.4, 0, 6.4, 100, "red");
        createBackground(43.8, 0, 6.3, 100, "blue");
        createBackground(50.1, 0, 6.3, 100, "red");
        createBackground(56.2, 0, 6.3, 100, "blue");
        createBackground(62.4, 0, 6.3, 100, "red");
        createBackground(68.7, 0, 6.3, 100, "blue");
        createBackground(75, 0, 6.3, 100, "red");
        createBackground(81.2, 0, 6.2, 100, "blue");
        createBackground(87.4, 0, 6.3, 100, "red");
        createBackground(93.6, 0, 6.3, 100, "blue");
      }

      chart.maxZoomLevel = 1;
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;

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




