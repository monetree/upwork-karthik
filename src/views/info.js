import React from "react";
import LineChart from "../components/line-chart/line-chart.components";
import Sidebar from "../components/sidebar/sidebar.component";
import Header from "../components/header/header.component";
import Datepicker from "../UI/datepicker";
import CandleChart from "../components/candle-chart/candle-chart.component";
import LineChartReverse from "../components/line-chart-reverse/line-chart-reverse.component";
import Popup from "reactjs-popup";


const getTotalTimeTakenVsSessionNumber = (datasource, formFactor) => {
  let counter = 0;
  let total_time_taken_vs_session_number = []
  for (let i of datasource){
    if(i["formFactor"] === formFactor){
      let total_time_taken = 0
      for(let j of i["timing"]){
        for (let k of j["zoneInfo"]){
          if(k["timeInfo"].length){
            total_time_taken+= parseFloat(k["timeInfo"][0])
          }
        }
      }
      counter+=1
      total_time_taken_vs_session_number.push({"sessions":total_time_taken,"category":counter,"stroke":"0"})
    }
  }

  return total_time_taken_vs_session_number
}

const getThresholdChart = (datasource, formFactor) => {
  let session_no = 0
  let threshold_chart = []
  for(let i of datasource){
    if(i["formFactor"] === formFactor){
      session_no+=1
      if(i["hit_drop"]){
        threshold_chart.push({"sessions": i["hit_drop"], "category": session_no, "stroke":"0"})
      }
    
    }
  }
  return threshold_chart
}

const getTraingandCertificationData = (datasource,formFactor,  mode) => {
  let new_data_source = []
  for(let i of datasource){
    if(i["formFactor"] === formFactor && i["mode"] === mode){
      new_data_source.push(i)
    }
  }


  if(!new_data_source.length){
    return []
  }

  let input = new_data_source.map(({timing, ...rest}) => ({
        timing: timing.map(({zoneInfo}) => ({
            zone: zoneInfo.reduce((sum, {timeInfo}) => sum + (timeInfo && + timeInfo[0] ? parseFloat(timeInfo[0]) : 0), 0)
        })),
        ...rest
    }));




    

    let res;
    var data = input.map(t => t.timing.map(u => u.zone));
    var output = data[0].map((col, i) => data.map(row => row[i])).map((item, index) => {res = {}; res["zone"+(index+1)] = item.filter(t => t!==undefined); return res});
    let counter = 0;
      for (let i of output){
        counter+=1
        i["max"] = i["zone"+counter].sort(function(a, b){return a-b})[i["zone"+counter].sort(function(a, b){return a-b}).length - 1]
        i["min"] = i["zone"+counter].sort(function(a, b){return a-b})[0]
        i["avg"] =  i["zone"+counter].sort(function(a, b){return a-b}).reduce((a, b) => a + b, 0)/i["zone"+counter].sort(function(a, b){return a-b}).length
        i["high"] = i["zone"+counter].sort(function(a, b){return a-b})[i["zone"+counter].sort(function(a, b){return a-b}).length - 1]+(i["zone"+counter].sort(function(a, b){return a-b})[i["zone"+counter].sort(function(a, b){return a-b}).length - 1]/10)
        i["low"] = i["zone"+counter].sort(function(a, b){return a-b})[0] - (i["zone"+counter].sort(function(a, b){return a-b})[0]/10)
        i["background"] = "#37FF82"
        i["threshold"] = 0
        i["threshold2"] = 0
      }
      return output
}

const getCandleStickData = (datasource, formFactor) => {
  let training_res = getTraingandCertificationData(datasource,formFactor, "Training")
  let certificate_res = getTraingandCertificationData(datasource,formFactor, "Certification")

  for(let i=0; i < training_res.length;i++){
    if(training_res[i].length && certificate_res[i].length){
      training_res[i]["zone"] = "Zone-"+i
      training_res[i]["max2"] = certificate_res[i]["max"]
      training_res[i]["min2"] = certificate_res[i]["min"]
      training_res[i]["avg2"] = certificate_res[i]["avg"]
      training_res[i]["high2"] = certificate_res[i]["max"]+(certificate_res[i]["max"]/10)
      training_res[i]["low2"] = certificate_res[i]["min"] - (certificate_res[i]["min"]/10)
    }
  }

  if(training_res.length){
    if(!certificate_res.length){
      for(let i=0; i < training_res.length;i++){
        training_res[i]["zone"] = "Zone-"+i
        training_res[i]["max2"] = 0
        training_res[i]["min2"] = 0
        training_res[i]["avg2"] = 0
        training_res[i]["high2"] = 0
        training_res[i]["low2"] = 0
    }
    }
}

    if(certificate_res.length){
      if(!training_res.length){
        for(let i=0; i < certificate_res.length;i++){
          certificate_res[i]["zone"] = "Zone-"+i
          certificate_res[i]["max2"] = 0
          certificate_res[i]["min2"] = 0
          certificate_res[i]["avg2"] = 0
          certificate_res[i]["high2"] = 0
          certificate_res[i]["low2"] = 0
      }
      training_res = certificate_res
    }
}
  return training_res      
}

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navbar:true,
            activepill: "SSF",
            datasource: [],
            operators: [],
            operator: null,
            total_no_of_training_sessions: 0,
            total_no_of_certification_sessions :0,
            total_time_taken: 0,
            total_no_of_training_sessions_SSF: 0,
            total_no_of_training_sessions_MT: 0,
            total_no_of_training_sessions_MICRO : 0,
            total_no_of_certification_sessions_SSF : 0,
            total_no_of_certification_sessions_MT : 0,
            total_no_of_certification_sessions_MICRO : 0,
            total_time_chart_certification_ssf_max: 0,
            total_time_chart_certification_ssf_min: 0,
            total_time_chart_certification_ssf_avg: 0,
            total_time_chart_certification_mt_max: 0,
            total_time_chart_certification_mt_min: 0,
            total_time_chart_certification_mt_avg: 0,
            total_time_chart_certification_micro_max: 0,
            total_time_chart_certification_micro_min: 0,
            total_time_chart_certification_micro_avg: 0,
            total_time_chart_training_ssf_max: 0,
            total_time_chart_training_ssf_min: 0,
            total_time_chart_training_ssf_avg: 0,
            certificate_threshold:0,
            training_threshold:0,
            certification_threshold_for_candel:[],
            training_threshold_for_candel: [],
            ssf_candel_data:null,
            mt_candel_data:null,
            micro_candel_data:null
        }
        this.linechart = React.createRef()
        this.linechartfirst = React.createRef()
        this.linechartsecond = React.createRef()
        this.linechart2 = React.createRef()
        this.linechart3 = React.createRef()
        this.linechart4 = React.createRef()
        this.barchart = React.createRef()
        this.thresholdchart = React.createRef()
    }


    componentDidMount(){
      let datasource =  sessionStorage.getItem("datasource")
      if(!datasource){
        return
      }

      datasource = JSON.parse(datasource);

      let operators = []
      for(let i of datasource){
        operators.push(i["sessions"][0]["name"])
      }
      this.setState({
        datasource: datasource,
        operators: operators
      })
    }

    addTotalTimeThreshold = () => {
      const { training_threshold,  certificate_threshold} = this.state;

    }

    handleSidebar = () => {
        this.setState({
            navbar: !this.state.navbar
        })
    }

    handleSsfButtons = (ssf_type) => {
      this.setState({
        activepill: ssf_type
      }, () => this.loadChartASPerFormFactor())
    }

    loadChartASPerFormFactor = () => {
      if(this.state.activepill === "SSF"){
        this.linechart.current.componentDidMount(this.state.plot_of_number_of_training_sessions_vs_day_SSF)
        this.linechart2.current.componentDidMount(this.state.plot_of_number_of_certification_sessions_vs_day_SSF) 
        this.barchart.current.componentDidMount(this.state.ssf_candle_stick)
        this.thresholdchart.current.componentDidMount(this.state.threshold_chart_ssf)
        this.linechart3.current.componentDidMount(this.state.total_time_taken_vs_session_number_Training_ssf)
        this.linechart4.current.componentDidMount(this.state.total_time_taken_vs_session_number_Certification_ssf)
      } else if (this.state.activepill === "MT"){
        this.linechart.current.componentDidMount(this.state.plot_of_number_of_training_sessions_vs_day_MT)
        this.linechart2.current.componentDidMount(this.state.plot_of_number_of_certification_sessions_vs_day_MT) 
        this.barchart.current.componentDidMount(this.state.mt_candle_stick)
        this.thresholdchart.current.componentDidMount(this.state.threshold_chart_mt)
        this.linechart3.current.componentDidMount(this.state.total_time_taken_vs_session_number_Training_mt)
        this.linechart4.current.componentDidMount(this.state.total_time_taken_vs_session_number_Certification_mt)
      } else {
        this.linechart.current.componentDidMount(this.state.plot_of_number_of_training_sessions_vs_day_MICRO)
        this.linechart2.current.componentDidMount(this.state.plot_of_number_of_certification_sessions_vs_day_MICRO) 
        this.barchart.current.componentDidMount(this.state.micro_candle_stick)
        this.thresholdchart.current.componentDidMount(this.state.threshold_chart_micro)
        this.linechart3.current.componentDidMount(this.state.total_time_taken_vs_session_number_Training_micro)
        this.linechart4.current.componentDidMount(this.state.total_time_taken_vs_session_number_Certification_micro)
      }
    }

    loadData = (datasource) => {
      let operators = []
      for(let i of datasource){
        operators.push(i["sessions"][0]["name"])
      }
      this.setState({
        datasource: datasource,
        operators: operators
      })
    }

    handleNoDta = () => {
      this.setState({
        total_no_of_training_sessions: 0,
        total_no_of_certification_sessions :0,
        total_time_taken: 0,
        total_no_of_training_sessions_SSF: 0,
        total_no_of_training_sessions_MT: 0,
        total_no_of_training_sessions_MICRO : 0,
        total_no_of_certification_sessions_SSF : 0,
        total_no_of_certification_sessions_MT : 0,
        total_no_of_certification_sessions_MICRO : 0,
        total_time_chart_certification_ssf_max: 0,
        total_time_chart_certification_ssf_min: 0,
        total_time_chart_certification_ssf_avg: 0,
        total_time_chart_training_ssf_max: 0,
        total_time_chart_training_ssf_min: 0,
        total_time_chart_training_ssf_avg: 0
      })
      this.linechartfirst.current.componentDidMount([])
      this.linechartsecond.current.componentDidMount([])
      this.linechart.current.componentDidMount([])
      this.linechart2.current.componentDidMount([]) 
      this.barchart.current.componentDidMount([])
      this.thresholdchart.current.componentDidMount([])
      this.linechart3.current.componentDidMount([])
      this.linechart4.current.componentDidMount([]) 
    }
    
    handleOperator = (operator, from_date=null, to_date = null) => {
      

      this.setState({
        operator:operator
      })

      let datasource = this.state.datasource;
      
      let selected_datasource = []
      for(let i of datasource){
        if(operator === i["sessions"][0]["name"]){
          selected_datasource = i["sessions"];
        }
      }
      
      let required_time_interval_data = []
      let one_year_back_date = new Date(new Date().setFullYear(new Date().getFullYear() - 1))

      if(from_date){
        for(let s of selected_datasource){
          if(s["dateTime"]){
            let datetime = s["dateTime"].split("-")[0]
            let first_replace = datetime.replace(".", "-")
            if(new Date(first_replace.replace(".", "-")) > from_date && new Date(first_replace.replace(".", "-")) < to_date){
              required_time_interval_data.push(s)
            }
          }
        }
      } else {
        for(let s of selected_datasource){
          if(s["dateTime"]){
            let datetime = s["dateTime"].split("-")[0]
            let first_replace = datetime.replace(".", "-")
            if(new Date(first_replace.replace(".", "-")) > one_year_back_date){
              required_time_interval_data.push(s)
            }
          }
        }
      }

      selected_datasource = required_time_interval_data
      if(!selected_datasource.length){
        this.handleNoDta()
      }

      let total_no_of_training_sessions = 0;
      let total_no_of_certification_sessions = 0;
      let total_no_of_training_sessions_SSF = 0;
      let total_no_of_training_sessions_MT = 0;
      let total_no_of_training_sessions_MICRO = 0;
      let total_no_of_certification_sessions_SSF = 0;
      let total_no_of_certification_sessions_MT = 0;
      let total_no_of_certification_sessions_MICRO = 0;
      let training_data_source = []
      let certification_data_source = []

      for(let i of selected_datasource){
        if(i["mode"] === "Certification"){
          certification_data_source.push(i)
          total_no_of_certification_sessions+=1
        }
        if(i["mode"] === "Training"){
          training_data_source.push(i)
          total_no_of_training_sessions+=1
        }

        if(i["mode"] === "Training" && i["formFactor"] === "SSF"){
          total_no_of_training_sessions_SSF+=1
        }
        if(i["mode"] === "Training" && i["formFactor"] === "MT"){
          total_no_of_training_sessions_MT+=1
        }
        if(i["mode"] === "Training" && i["formFactor"] === "MICRO"){
          total_no_of_training_sessions_MICRO+=1
        }

        if(i["mode"] === "Certification" && i["formFactor"] === "SSF"){
          total_no_of_certification_sessions_SSF+=1
        }
        if(i["mode"] === "Certification" && i["formFactor"] === "MT"){
          total_no_of_certification_sessions_MT+=1
        }
        if(i["mode"] === "Certification" && i["formFactor"] === "MICRO"){
          total_no_of_certification_sessions_MICRO+=1
        }


      }


      this.setState({
        total_no_of_training_sessions:  total_no_of_training_sessions,
        total_no_of_certification_sessions: total_no_of_certification_sessions,
        total_no_of_training_sessions_SSF: total_no_of_training_sessions_SSF,
        total_no_of_training_sessions_MT: total_no_of_training_sessions_MT,
        total_no_of_training_sessions_MICRO: total_no_of_training_sessions_MICRO,
        total_no_of_certification_sessions_SSF: total_no_of_certification_sessions_SSF,
        total_no_of_certification_sessions_MT: total_no_of_certification_sessions_MT,
        total_no_of_certification_sessions_MICRO: total_no_of_certification_sessions_MICRO
      })


      let total_time_taken = 0
      let certification_datetimes = [ ] 
      let training_datetimes = [ ] 

      let ssf_certication_datetimes = []
      let mt_certication_datetimes = []
      let micro_certication_datetimes = []

      let ssf_training_datetimes = []
      let mt_training_datetimes = []
      let micro_training_datetimes = []

      for(let i of selected_datasource){
        if(i["mode"] === "Certification"){
          if(i["formFactor"] === "SSF"){
            ssf_certication_datetimes.push(i["dateTime"].split("-")[0])
          }
          if(i["formFactor"] === "MT"){
            mt_certication_datetimes.push(i["dateTime"].split("-")[0])
          }
          if(i["formFactor"] === "MICRO"){
            micro_certication_datetimes.push(i["dateTime"].split("-")[0])
          }
          certification_datetimes.push(i["dateTime"].split("-")[0])
        } else if (i["mode"] === "Training"){
          if(i["formFactor"] === "SSF"){
            ssf_training_datetimes.push(i["dateTime"].split("-")[0])
          }
          if(i["formFactor"] === "MT"){
            mt_training_datetimes.push(i["dateTime"].split("-")[0])
          }
          if(i["formFactor"] === "MICRO"){
            micro_training_datetimes.push(i["dateTime"].split("-")[0])
          }
          training_datetimes.push(i["dateTime"].split("-")[0])
        }


         for (let j of i["timing"]){
            for (let k of j["zoneInfo"]){
              total_time_taken += parseInt(k["timeInfo"][0])
            }
         }
      }


        let certification_counts = {};
        for (var i = 0; i < certification_datetimes.length; i++) {
          var num = certification_datetimes[i];
          certification_counts[num] = certification_counts[num] ? certification_counts[num] + 1 : 1;  
        }

        let training_counts = {};
        for (var i = 0; i < training_datetimes.length; i++) {
          var num = training_datetimes[i];
          training_counts[num] = training_counts[num] ? training_counts[num] + 1 : 1;  
        }


        // ssf mt micro data

        // certification

        let ssf_certification_counts = {};
        for (var i = 0; i < ssf_certication_datetimes.length; i++) {
          var num = ssf_certication_datetimes[i];
          ssf_certification_counts[num] = ssf_certification_counts[num] ? ssf_certification_counts[num] + 1 : 1;  
        }

        let mt_certification_counts = {};
        for (var i = 0; i < mt_certication_datetimes.length; i++) {
          var num = mt_certication_datetimes[i];
          mt_certification_counts[num] = mt_certification_counts[num] ? mt_certification_counts[num] + 1 : 1;  
        }

        let micro_certification_counts = {};
        for (var i = 0; i < micro_certication_datetimes.length; i++) {
          var num = micro_certication_datetimes[i];
          micro_certification_counts[num] = micro_certification_counts[num] ? micro_certification_counts[num] + 1 : 1;  
        }

        // training

        let ssf_training_counts = {};
        for (var i = 0; i < ssf_training_datetimes.length; i++) {
          var num = ssf_training_datetimes[i];
          ssf_training_counts[num] = ssf_training_counts[num] ? ssf_training_counts[num] + 1 : 1;  
        }

        let mt_training_counts = {};
        for (var i = 0; i < mt_training_datetimes.length; i++) {
          var num = mt_training_datetimes[i];
          mt_training_counts[num] = mt_training_counts[num] ? mt_training_counts[num] + 1 : 1;  
        }

        let micro_training_counts = {};
        for (var i = 0; i < micro_training_datetimes.length; i++) {
          var num = micro_training_datetimes[i];
          micro_training_counts[num] = micro_training_counts[num] ? micro_training_counts[num] + 1 : 1;  
        }
        


        // overall data 

        let certification_unique_dates = Object.keys(certification_counts)
        let certification_sessions = Object.values(certification_counts)
        let plot_of_number_of_certification_sessions_vs_day = []
        for( let i=0; i < certification_unique_dates.length; i++){
          plot_of_number_of_certification_sessions_vs_day.push(
            {"dateTime":certification_unique_dates[i],"visits":certification_sessions[i],"stroke":"0"}
          )
        }

        

        let training_unique_dates = Object.keys(training_counts)
        let training_sessions = Object.values(training_counts)
        let plot_of_number_of_training_sessions_vs_day = []
        for( let i=0; i < training_unique_dates.length; i++){
          plot_of_number_of_training_sessions_vs_day.push(
            {"dateTime":training_unique_dates[i],"visits":training_sessions[i],"stroke":"0"}
          )
        }
        // ssf mt micro data
        // certification

        let ssf_certification_unique_dates = Object.keys(ssf_certification_counts)
        let ssf_certification_sessions = Object.values(ssf_certification_counts)
        let plot_of_number_of_certification_sessions_vs_day_SSF = []
        for( let i=0; i <= ssf_certification_unique_dates.length; i++){
          plot_of_number_of_certification_sessions_vs_day_SSF.push(
            {"dateTime":ssf_certification_unique_dates[i],"visits":ssf_certification_sessions[i],"stroke":"0"}
          )
        }

        let mt_certification_unique_dates = Object.keys(mt_certification_counts)
        let mt_certification_sessions = Object.values(mt_certification_counts)
        let plot_of_number_of_certification_sessions_vs_day_MT = []
        for( let i=0; i <= mt_certification_unique_dates.length; i++){
          plot_of_number_of_certification_sessions_vs_day_MT.push(
            {"dateTime":mt_certification_unique_dates[i],"visits":mt_certification_sessions[i],"stroke":"0"}
          )
        }

        let micro_certification_unique_dates = Object.keys(micro_certification_counts)
        let micro_certification_sessions = Object.values(micro_certification_counts)
        let plot_of_number_of_certification_sessions_vs_day_MICRO = []
        for( let i=0; i <= micro_certification_unique_dates.length; i++){
          plot_of_number_of_certification_sessions_vs_day_MICRO.push(
            {"dateTime":micro_certification_unique_dates[i],"visits":micro_certification_sessions[i],"stroke":"0"}
          )
        }

        // training

        let ssf_training_unique_dates = Object.keys(ssf_training_counts)
        let ssf_training_sessions = Object.values(ssf_training_counts)
        let plot_of_number_of_training_sessions_vs_day_SSF = []
        for( let i=0; i <= ssf_training_unique_dates.length; i++){
          plot_of_number_of_training_sessions_vs_day_SSF.push(
            {"dateTime":ssf_training_unique_dates[i],"visits":ssf_training_sessions[i],"stroke":"0"}
          )
        }

        

        

        let mt_training_unique_dates = Object.keys(mt_training_counts)
        let mt_training_sessions = Object.values(mt_training_counts)
        let plot_of_number_of_training_sessions_vs_day_MT = []
        for( let i=0; i <= mt_training_unique_dates.length; i++){
          if(mt_training_unique_dates[i]){
            plot_of_number_of_training_sessions_vs_day_MT.push(
              {"dateTime":mt_training_unique_dates[i],"visits":mt_training_sessions[i],"stroke":"0"}
            )
          }
        }

  

        let micro_training_unique_dates = Object.keys(micro_training_counts)
        let micro_training_sessions = Object.values(micro_training_counts)
        let plot_of_number_of_training_sessions_vs_day_MICRO = []
        for( let i=0; i <= micro_training_unique_dates.length; i++){
          plot_of_number_of_training_sessions_vs_day_MICRO.push(
            {"dateTime":micro_training_unique_dates[i],"visits":micro_training_sessions[i],"stroke":"0"}
          )
        }




        let total_time_taken_vs_session_number_Training_ssf = getTotalTimeTakenVsSessionNumber(training_data_source, "SSF")
        let total_time_taken_vs_session_number_Certification_ssf = getTotalTimeTakenVsSessionNumber(certification_data_source, "SSF")
        let total_time_taken_vs_session_number_Training_mt = getTotalTimeTakenVsSessionNumber(training_data_source, "MT")
        let total_time_taken_vs_session_number_Certification_mt = getTotalTimeTakenVsSessionNumber(certification_data_source, "MT")
        let total_time_taken_vs_session_number_Training_micro = getTotalTimeTakenVsSessionNumber(training_data_source, "MICRO")
        let total_time_taken_vs_session_number_Certification_micro = getTotalTimeTakenVsSessionNumber(certification_data_source, "MICRO")


        // candel chart training
        // ssf
      
        

        let ssf_candle_stick = getCandleStickData(selected_datasource, "SSF")
        let mt_candle_stick = getCandleStickData(selected_datasource, "MT")
        let micro_candle_stick = getCandleStickData(selected_datasource, "MICRO")

        for(let i=0; i<ssf_candle_stick.length;i++){
          ssf_candle_stick[i]["zone"] = "zone"+(i+1)
        }



        // threshold chart certification
        // SSF
        let threshold_chart_ssf = getThresholdChart(certification_data_source, "SSF")
        let threshold_chart_mt = getThresholdChart(certification_data_source, "MT")
        let threshold_chart_micro = getThresholdChart(certification_data_source, "MICRO")


        
        let total_time_chart_certification_ssf = []
        let total_time_chart_certification_mt = []
        let total_time_chart_certification_micro = []
        for (let i of certification_data_source){
          if(i["formFactor"] === "SSF"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_certification_ssf.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
          if(i["formFactor"] === "MT"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_certification_mt.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
          if(i["formFactor"] === "MICRO"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_certification_micro.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
        }

 
        total_time_chart_certification_ssf = total_time_chart_certification_ssf.sort(function(a, b){return a-b})
        let total_time_chart_certification_ssf_max = total_time_chart_certification_ssf[total_time_chart_certification_ssf.length - 1]
        let total_time_chart_certification_ssf_min = total_time_chart_certification_ssf[0]
        let total_time_chart_certification_ssf_avg = total_time_chart_certification_ssf.reduce((a, b) => a + b, 0)/total_time_chart_certification_ssf.length
        
        if(!total_time_chart_certification_ssf.length){
          total_time_chart_certification_ssf_max = 0
          total_time_chart_certification_ssf_min = 0
          total_time_chart_certification_ssf_avg = 0
        }

        total_time_chart_certification_mt = total_time_chart_certification_mt.sort(function(a, b){return a-b})
        let total_time_chart_certification_mt_max = total_time_chart_certification_mt[total_time_chart_certification_mt.length - 1]
        let total_time_chart_certification_mt_min = total_time_chart_certification_mt[0]
        let total_time_chart_certification_mt_avg = total_time_chart_certification_mt.reduce((a, b) => a + b, 0)/total_time_chart_certification_mt.length

        if(!total_time_chart_certification_mt.length){
          total_time_chart_certification_mt_max = 0
          total_time_chart_certification_mt_min = 0
          total_time_chart_certification_mt_avg = 0
        }

        total_time_chart_certification_micro = total_time_chart_certification_micro.sort(function(a, b){return a-b})
        let total_time_chart_certification_micro_max = total_time_chart_certification_micro[total_time_chart_certification_micro.length - 1]
        let total_time_chart_certification_micro_min = total_time_chart_certification_micro[0]
        let total_time_chart_certification_micro_avg = total_time_chart_certification_micro.reduce((a, b) => a + b, 0)/total_time_chart_certification_micro.length

        if(!total_time_chart_certification_micro.length){
          total_time_chart_certification_micro_max = 0
          total_time_chart_certification_micro_min = 0
          total_time_chart_certification_micro_avg = 0
        }


        let total_time_chart_training_ssf = []
        let total_time_chart_training_mt = []
        let total_time_chart_training_micro = []
        for (let i of training_data_source){
          if(i["formFactor"] === "SSF"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_training_ssf.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
          if(i["formFactor"] === "MT"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_training_mt.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
          if(i["formFactor"] === "MICRO"){
            for (let j of i["timing"]){
              for (let k of j["zoneInfo"]){
                if(k["timeInfo"][0]){
                  total_time_chart_training_micro.push(parseFloat(k["timeInfo"][0]))
                }
              }
            }
          }
        }

        
        total_time_chart_training_ssf = total_time_chart_training_ssf.sort(function(a, b){return a-b})
        let total_time_chart_training_ssf_max = total_time_chart_training_ssf[total_time_chart_training_ssf.length - 1]
        let total_time_chart_training_ssf_min = total_time_chart_training_ssf[0]
        let total_time_chart_training_ssf_avg = total_time_chart_training_ssf.reduce((a, b) => a + b, 0)/total_time_chart_training_ssf.length
        if(!total_time_chart_training_ssf.length){
          total_time_chart_training_ssf_max = 0
          total_time_chart_training_ssf_min = 0
          total_time_chart_training_ssf_avg = 0
        }

        total_time_chart_training_mt = total_time_chart_training_mt.sort(function(a, b){return a-b})
        let total_time_chart_training_mt_max = total_time_chart_training_mt[total_time_chart_training_mt.length - 1]
        let total_time_chart_training_mt_min = total_time_chart_training_mt[0]
        let total_time_chart_training_mt_avg = total_time_chart_training_mt.reduce((a, b) => a + b, 0)/total_time_chart_training_mt.length
        
        if(!total_time_chart_training_mt.length){
          total_time_chart_training_mt_max = 0
          total_time_chart_training_mt_min = 0
          total_time_chart_training_mt_avg = 0
        }

        total_time_chart_training_micro = total_time_chart_training_micro.sort(function(a, b){return a-b})
        let total_time_chart_training_micro_max = total_time_chart_training_micro[total_time_chart_training_micro.length - 1]
        let total_time_chart_training_micro_min = total_time_chart_training_micro[0]
        let total_time_chart_training_micro_avg = total_time_chart_training_micro.reduce((a, b) => a + b, 0)/total_time_chart_training_micro.length
        
        if(!total_time_chart_training_micro.length){
          total_time_chart_training_micro_max = 0
          total_time_chart_training_micro_min = 0
          total_time_chart_training_micro_avg = 0
        }


      this.setState({
        total_time_taken: total_time_taken,
        plot_of_number_of_training_sessions_vs_day: plot_of_number_of_training_sessions_vs_day,
        plot_of_number_of_certification_sessions_vs_day: plot_of_number_of_certification_sessions_vs_day,
        plot_of_number_of_training_sessions_vs_day_SSF: plot_of_number_of_training_sessions_vs_day_SSF,
        plot_of_number_of_training_sessions_vs_day_MT: plot_of_number_of_training_sessions_vs_day_MT,
        plot_of_number_of_training_sessions_vs_day_MICRO : plot_of_number_of_training_sessions_vs_day_MICRO,
        plot_of_number_of_certification_sessions_vs_day_SSF: plot_of_number_of_certification_sessions_vs_day_SSF,
        plot_of_number_of_certification_sessions_vs_day_MT: plot_of_number_of_certification_sessions_vs_day_MT,
        plot_of_number_of_certification_sessions_vs_day_MICRO: plot_of_number_of_certification_sessions_vs_day_MICRO,

        total_time_taken_vs_session_number_Training_ssf: total_time_taken_vs_session_number_Training_ssf,
        total_time_taken_vs_session_number_Certification_ssf: total_time_taken_vs_session_number_Certification_ssf,
        total_time_taken_vs_session_number_Training_mt: total_time_taken_vs_session_number_Training_mt,
        total_time_taken_vs_session_number_Certification_mt: total_time_taken_vs_session_number_Certification_mt,
        total_time_taken_vs_session_number_Training_micro: total_time_taken_vs_session_number_Training_micro,
        total_time_taken_vs_session_number_Certification_micro: total_time_taken_vs_session_number_Certification_micro,

        ssf_candle_stick: ssf_candle_stick,
        mt_candle_stick: mt_candle_stick,
        micro_candle_stick: micro_candle_stick,
        threshold_chart_ssf: threshold_chart_ssf,
        threshold_chart_mt: threshold_chart_mt,
        threshold_chart_micro: threshold_chart_micro,
        total_time_chart_certification_ssf_max: parseInt(total_time_chart_certification_ssf_max),
        total_time_chart_certification_ssf_min: parseInt(total_time_chart_certification_ssf_min),
        total_time_chart_certification_ssf_avg: parseInt(total_time_chart_certification_ssf_avg),
        total_time_chart_certification_mt_max: parseInt(total_time_chart_certification_mt_max),
        total_time_chart_certification_mt_min: parseInt(total_time_chart_certification_mt_min),
        total_time_chart_certification_mt_avg: parseInt(total_time_chart_certification_mt_avg),
        total_time_chart_certification_micro_max: parseInt(total_time_chart_certification_micro_max),
        total_time_chart_certification_micro_min: parseInt(total_time_chart_certification_micro_min),
        total_time_chart_certification_micro_avg: parseInt(total_time_chart_certification_micro_avg),
        total_time_chart_training_ssf_max: parseInt(total_time_chart_training_ssf_max),
        total_time_chart_training_ssf_min: parseInt(total_time_chart_training_ssf_min),
        total_time_chart_training_ssf_avg: parseInt(total_time_chart_training_ssf_avg),
        total_time_chart_training_mt_max: parseInt(total_time_chart_training_mt_max),
        total_time_chart_training_mt_min: parseInt(total_time_chart_training_mt_min),
        total_time_chart_training_mt_avg: parseInt(total_time_chart_training_mt_avg),
        total_time_chart_training_micro_max: parseInt(total_time_chart_training_micro_max),
        total_time_chart_training_micro_min: parseInt(total_time_chart_training_micro_min),
        total_time_chart_training_micro_avg: parseInt(total_time_chart_training_micro_avg),



      }, () => this.loadCharts())

    }

    loadCharts = () => {
      this.linechartfirst.current.componentDidMount(this.state.plot_of_number_of_training_sessions_vs_day)
      this.linechartsecond.current.componentDidMount(this.state.plot_of_number_of_certification_sessions_vs_day)
      this.loadFormFactorCharts()
    }

    loadFormFactorCharts = () => {
      this.linechart.current.componentDidMount(this.state.plot_of_number_of_training_sessions_vs_day_SSF)
      this.linechart2.current.componentDidMount(this.state.plot_of_number_of_certification_sessions_vs_day_SSF) 
      this.barchart.current.componentDidMount(this.state.ssf_candle_stick)
      this.thresholdchart.current.componentDidMount(this.state.threshold_chart_ssf)
      this.linechart3.current.componentDidMount(this.state.total_time_taken_vs_session_number_Training_ssf)
      this.linechart4.current.componentDidMount(this.state.total_time_taken_vs_session_number_Certification_ssf) 
    }

    handleFilterDates = (start_date, end_date) => {
      const { operator } = this.state;
      if(!operator){
        alert("operator name required")
        return
      }
      this.handleOperator(operator, start_date, end_date)
    } 



    onCertificationThresholdChange = (e, index) => {
      this.state.certification_threshold_for_candel[index] = {"threshold": e.target.value, "index": index}
      this.setState({
        certification_threshold_for_candel: this.state.certification_threshold_for_candel
      })
    }

    onTrainingThresholdChange = (e, index) => {
      this.state.training_threshold_for_candel[index] = {"threshold": e.target.value, "index": index}
      this.setState({
        training_threshold_for_candel: this.state.training_threshold_for_candel
      })
    }

    addThresholds = (close) => {
      const { 
        certification_threshold_for_candel, 
        training_threshold_for_candel,
        ssf_candle_stick,
        mt_candle_stick,
        micro_candle_stick,
        activepill
       } = this.state;
       let candle_data = []
       if(activepill === "SSF"){
        candle_data = ssf_candle_stick
       } else if(activepill === "MT"){
         candle_data = mt_candle_stick
       } else {
         candle_data = micro_candle_stick
       }
       for(let i=0;i<candle_data.length;i++){
        try{
          candle_data[i]["threshold"] = training_threshold_for_candel[i]["threshold"]
          candle_data[i]["threshold2"] = certification_threshold_for_candel[i]["threshold"] 
        } catch(err) {
          
        }
       }


       if(this.state.activepill === "SSF"){
         this.setState({
           ssf_candel_data: candle_data
         }, () => this.barchart.current.componentDidMount(this.state.ssf_candel_data, true))
      } else if (this.state.activepill === "MT"){
        this.setState({
          mt_candel_data: candle_data
        }, () => this.barchart.current.componentDidMount(this.state.mt_candel_data, true))
      } else {
        this.setState({
          micro_candel_data: candle_data
        }, () => this.barchart.current.componentDidMount(this.state.micro_candel_data, true))
      }
      close()

    }


    printCertificate = () => {
      const {
          total_no_of_certification_sessions_SSF,
          total_no_of_certification_sessions_MT,
          total_no_of_certification_sessions_MICRO ,
          total_time_chart_certification_ssf_min,
          total_time_chart_certification_ssf_avg,
          total_time_chart_certification_mt_max,
          total_time_chart_certification_mt_min,
          total_time_chart_certification_mt_avg,
          total_time_chart_certification_micro_max,
          total_time_chart_certification_micro_min,
          total_time_chart_certification_micro_avg,
          operator
        } = this.state;

        let certificate_data = JSON.stringify({
          total_no_of_certification_sessions_SSF:total_no_of_certification_sessions_SSF,
          total_no_of_certification_sessions_MT:total_no_of_certification_sessions_MT,
          total_no_of_certification_sessions_MICRO:total_no_of_certification_sessions_MICRO,
          total_time_chart_certification_ssf_min:total_time_chart_certification_ssf_min,
          total_time_chart_certification_ssf_avg:total_time_chart_certification_ssf_avg,
          total_time_chart_certification_mt_max:total_time_chart_certification_mt_max,
          total_time_chart_certification_mt_min:total_time_chart_certification_mt_min,
          total_time_chart_certification_mt_avg:total_time_chart_certification_mt_avg,
          total_time_chart_certification_micro_max:total_time_chart_certification_micro_max,
          total_time_chart_certification_micro_min:total_time_chart_certification_micro_min,
          total_time_chart_certification_micro_avg:total_time_chart_certification_micro_avg,
          operator:operator
        })

        localStorage.setItem("certificate_data", certificate_data)
        this.setState({
          certificate_data: certificate_data
        }, () => this.props.history.push("/certificate"))
    }


    render(){
      const { 
        total_no_of_training_sessions, 
        total_no_of_certification_sessions,
         total_no_of_training_sessions_SSF ,
         total_no_of_training_sessions_MT,
         total_no_of_training_sessions_MICRO,
         total_time_chart_certification_ssf_min,
         total_time_chart_certification_ssf_max,
         total_time_chart_certification_ssf_avg,
         total_time_chart_certification_mt_min,
         total_time_chart_certification_mt_max,
         total_time_chart_certification_mt_avg,
         total_time_chart_certification_micro_min,
         total_time_chart_certification_micro_max,
         total_time_chart_certification_micro_avg,
         total_time_chart_training_ssf_max,
         total_time_chart_training_ssf_min,
         total_time_chart_training_ssf_avg,
         total_time_chart_training_mt_max,
         total_time_chart_training_mt_min,
         total_time_chart_training_mt_avg,
         total_time_chart_training_micro_max,
         total_time_chart_training_micro_min,
         total_time_chart_training_micro_avg,
         certificate_threshold,
         training_threshold, 
         ssf_candle_stick,
         mt_candle_stick,
         micro_candle_stick,
         activepill,
         ssf_candel_data,
         mt_candel_data,
         micro_candel_data
      } = this.state;
      const candle_stick_threshold = activepill === "SSF" ? 
                                                ssf_candle_stick : 
                                                activepill === "MT" ? 
                                                mt_candle_stick: 
                                                micro_candle_stick
                                                
        return (
            <div className={this.state.navbar ? "navbar-fixed sidebar-fixed right-sidebar-toggoler-out sidebar-mobile-out" : "navbar-fixed sidebar-fixed right-sidebar-toggoler-out sidebar-mobile-in"} style={this.state.navbar ? { overflow: 'auto' } : {overflow: 'hidden'}} id="body">
            
            
            
           


            
            {
                !this.state.navbar && (
                    <div class="mobile-sticky-body-overlay"></div>
                )
            }
            <div className="wrapper">
            <Sidebar loadData={this.loadData} handleSidebar={this.handleSidebar}/>
              <div className="page-wrapper">
          

                <Header handleOperator={this.handleOperator} handleSidebar={this.handleSidebar} operators={this.state.operators} />
                <div className="content-wrapper">
                  <div className="content">
                  <div className="fl bold" style={{ color:'#192354', fontSize:'30px' }}>Operator Dashboard - Features</div>
       
                    <div className="fr">
                    <Datepicker handleFilterDates={this.handleFilterDates}></Datepicker>
                    </div>
                  

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div className="cards-mobile-show">
                      <br/>  <br/>  <br/>  <br/>
                      <div className="card card-default">
                      <div className="card-header">    
                        <div className="w3-row-padding">
                          <div className="w3-third"><img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img></div>
                          <div className="w3-third"><h2 className="f17">Total no of training sessio</h2></div>
                          <div className="w3-third"><p className="bold black-color">{total_no_of_training_sessions}</p></div>
                        </div>
                        </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">    
                        <div className="w3-row-padding ">
                          <div className="w3-third"><img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img></div>
                          <div className="w3-third"><h2 className="f17">Total no of training sessio</h2></div>
                          <div className="w3-third"><p className="bold black-color">{total_no_of_training_sessions}</p></div>
                        </div>
                        </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">    
                        <div className="w3-row-padding ">
                        <center><button type="button" className="print-btn"  onClick={this.printCertificate}><a href="#" style={{ color:'#fff' }}>Print Certificate</a></button></center>
                        </div>
                        </div>
                    </div>
                  </div>
              

                    <div className="w3-row-padding cards-desktop-show">
                        <div className="card card-default">
                          <div className="card-header">
                            <div className="row">
                              <div className="col-xl-4" style={{ borderRight:'1px solid lightgrey'}}>
                                  <div className="row">
                                    <div className="col-xl-2">
                                    <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>
                                    </div>
                                    <div className="col-xl-6 f17"><div>Total no of training session</div></div>
                                    <div className="col-xl-2 f30 bold black-color">{total_no_of_training_sessions}</div>
                                    <div className="col-xl-2 f30 bold black-color"></div>
                                  </div>
                                </div>
                                <div className="col-xl-8">
                                <div className="row">
                                    <div className="col-xl-4 f17">
                                    <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>
                                    Total no of certification sessions</div>
                                    <div className="col-xl-4 f30 bold black-color"><div>{total_no_of_certification_sessions}</div></div>
                                    <div className="col-xl-4"> 
                                      <button type="button" className="print-btn" onClick={this.printCertificate}><a href="#" style={{ color:'#fff' }}>Print Certificate</a></button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-sm-6">
                            <div className="card br10">
                            <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                            <p className="bold f13">PLOT OF NUMBER OF TRAINING SESSIONS VS DAY</p>
                            </div>
                            <div className="card-body">
                              <LineChart ref={this.linechartfirst} chart_id={"training_session_vs_day"} color={"#FF7171"} />
                     
                            </div>
                                
                                    
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-6">
                            <div className="card br10">
                            <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                            <p className="bold f13">PLOT OF NUMBER OF CERTIFICATE SESSIONS VS DAY</p>
                            </div>
                            <div className="card-body">
                            <LineChart ref={this.linechartsecond} chart_id={"certificate_session_vs_day"} color={"#2F53FF"} />
                         
                            </div>
                                
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-xl-12 col-sm-12">
                        <div className="card card-default" style={{ border:'none' }}>
                            <div style={{ background:'#F6F6FB' }} >
                                <button className={this.state.activepill === "SSF" ? "active-ssf-button blr5" : "ssf-button" } onClick={() => this.handleSsfButtons("SSF")}>SFF</button>
                                <button className={this.state.activepill === "MT" ? "active-ssf-button blr5" : "ssf-button" } onClick={() => this.handleSsfButtons("MT") }>MT</button>
                                <button className={this.state.activepill === "MICRO" ? "active-ssf-button blr5 ssf-button-last" : "ssf-button ssf-button-last" } onClick={() => this.handleSsfButtons("MICRO")}>MICRO</button>
                            </div>


                                <div className="card-body">
                                    
                                <div className="row">
                                    <div className="col-xl-5 col-sm-12">
                                        <div className="card card-default" style={{ height:'353px' }}>
                                            <div className="card-body">
                                              <div className="row mbpb10" style={{ borderBottom:'0.5px solid #f2f2f2' }}>
                                              <div className="col-xl-2 col-sm-12">
                                              <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>
                                                </div>
                                                <div className="col-xl-6 col-sm-12">
                                                  <p>Total number of training sessions</p>
                                                </div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"></div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color">
                                                {activepill === "SSF" ? total_no_of_training_sessions_SSF : 
                                                activepill ===  "MT" ? total_no_of_training_sessions_MT :
                                                total_no_of_training_sessions_MICRO
                                                }
                                                </div>
                                              </div>
                                              <div className="row mbpb10">
                                              <div className="col-xl-2 col-sm-12">
                                              <img src ="assets/img/ic_undergone certification@3x.png" className="dashboard-content-icons"></img>
                                                </div>
                                                <div className="col-xl-6 col-sm-12">
                                                  <p>Certified ?</p>
                                                </div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"></div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"><i class="fa fa-thumbs-up" aria-hidden="true"></i>
</div>
                                              </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-sm-12">
                                        <div className="card card-default">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <div className="fl">
                                        <p className="bold f13">TOTAL TIME</p>
                                        <p className="f12" style={{ color:'#000' }}>Avg. time, Min. time & max. time with threshold</p>

                                        </div>
                                        <div className="fr">
                                        <Popup
                                            trigger={
                                                    <button className="btn btn-success mt-4 ma10" style={{ marginLeft:'0.6cm' }}>
                                                      Add threshold
                                                    </button>
                                                    }
                                            closeOnDocumentClick
                                            modal
                                        >{close => (
                                            <div className="popupContainer">
                                            
                                                  <div>
                                                  <div  class="form-inline">
                                                      <div className="form-group">
                                                        Certificate threshold
                                                      </div>
                                                      <div className="form-group ml15">
                                                        Training threshold
                                                      </div>
                                                      </div>
                                                  <div class="form-inline">

                                                    <div className="form-group">
                                                      <input defaultValue={certificate_threshold} onChange={(e) => this.setState({ certificate_threshold: e.target.value })} className="form-control" placeholder="Certificate threshold" type="number" />
                                                    </div>
                                                    <div className="form-group">
                                                      <input defaultValue={training_threshold} onChange={(e) => this.setState({ training_threshold: e.target.value })} className="form-control" placeholder="Training threshold" type="number" />
                                                    </div>
                                                    </div>

                                                    <div className="form-group">
                                                      <center>
                                                    <button className="btn btn-success mr15px" onClick={close}>Submit</button>

                                                    <button className="btn btn-success" onClick={close}>Close</button>
                                                    </center>
                                                    </div>
                                                    
                                                  </div>

                                            </div>
                                        )}
                                        </Popup>
                                        </div>
                   
                               


                                        </div>
                                            <div className="card-body">
                                                <div className="row">
                                                <div className="col-xl-5 col-sm-12 bold black-color">
                                                <img src ="assets/img/ic_undergone certification@3x.png" className="dashboard-content-icons"></img> Certification
                                                </div>
                                                <div className="col-xl-7 col-sm-12">
                                                  <div> 
                                                    <div style={{ display:'flex' }}>
                                                      <p className="yellow-color f12" style={{ marginLeft:'19%' }}>
                                                      {activepill === "SSF" ? total_time_chart_certification_ssf_avg : activepill === "MT" ?
                                                        total_time_chart_certification_mt_avg : total_time_chart_certification_micro_avg }
                                                      </p>
                                                      <p className="cyan-color f12" style={{ marginLeft:'15%' }}>{certificate_threshold}</p>
                                                    </div>
                                                     
                                                     {
                                                       total_time_chart_certification_ssf_avg || total_time_chart_certification_mt_avg || total_time_chart_certification_micro_avg ? (
                                                        <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                        <div title={activepill === "SSF" ? total_time_chart_certification_ssf_min : activepill === "MT" ?
                                                        total_time_chart_certification_mt_min : total_time_chart_certification_micro_min } style={{ background:'#5655B4', width:'15%',height:'30px', marginLeft:"20px", borderRight:'1px solid #F2D822' }}></div>
                                                        <div title={activepill === "SSF" ? total_time_chart_certification_ssf_avg : activepill === "MT" ?
                                                        total_time_chart_certification_mt_avg : total_time_chart_certification_micro_avg } style={{ background:'#5655B4', width:'20%',height:'30px', borderRight:'1px solid #76D9F4' }}></div>
                                                        <div title={activepill === "SSF" ? total_time_chart_certification_ssf_max : activepill === "MT" ?
                                                        total_time_chart_certification_mt_max : total_time_chart_certification_micro_max } style={{ background:'#5655B4', width:'35%',height:'30px' }}></div>
                                                        </div>
                                                       ): (
                                                        <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                        </div>
                                                       )
                                                     }
                                               
                                                
                                                  
                                                    <div>
                                                      <p className="fl min-max-color">MIN :&nbsp;
                                                      {activepill === "SSF" ? total_time_chart_certification_ssf_min : activepill === "MT" ?
                                                        total_time_chart_certification_mt_min : total_time_chart_certification_micro_min }
                                                      </p>
                                                      <p className="fr min-max-color">MAX :&nbsp;
                                                      {activepill === "SSF" ? total_time_chart_certification_ssf_max : activepill === "MT" ?
                                                        total_time_chart_certification_mt_max : total_time_chart_certification_micro_max }
                                                        </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                </div>
                                              <br/>
                                                <div className="row">
                                                <div className="col-xl-5 col-sm-12 bold black-color">
                                                <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>Training
                                                </div>
                                                <div className="col-xl-7 col-sm-12">
                                                <div style={{ display:'flex' }}>
                                                      <p className="yellow-color f12" style={{ marginLeft:'34%' }}>
                                                      {activepill === "SSF" ? total_time_chart_training_ssf_avg : activepill === "MT" ?
                                                        total_time_chart_training_mt_avg : total_time_chart_training_micro_avg }
                                                      </p>
                                                      <p className="cyan-color f12" style={{ marginLeft:'15%' }}>{training_threshold}</p>
                                                    </div>
                                                <div> 
                                                     {
                                                       total_time_chart_training_ssf_avg || total_time_chart_training_mt_avg || total_time_chart_training_micro_avg ?
                                                       (
                                                        <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                        <div title={activepill === "SSF" ? total_time_chart_training_ssf_min : activepill === "MT" ?
                                                        total_time_chart_training_mt_min : total_time_chart_training_micro_min } style={{ background:'#FF7171', width:'30%',height:'30px', marginLeft:"20px", borderRight:'1px solid #76D9F4' }}></div>
                                                        <div title={activepill === "SSF" ? total_time_chart_training_ssf_avg : activepill === "MT" ?
                                                        total_time_chart_training_mt_avg : total_time_chart_training_micro_avg } style={{ background:'#FF7171', width:'20%',height:'30px', borderRight:'1px solid #F2D822' }}></div>
                                                        <div title={activepill === "SSF" ? total_time_chart_training_ssf_max : activepill === "MT" ?
                                                        total_time_chart_training_mt_max : total_time_chart_training_micro_max } style={{ background:'#FF7171', width:'25%',height:'30px' }}></div>
                                                      </div>
                                                       ): (
                                                        <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                        
                                                      </div>
                                                       )
                                                     }


                                                    <div>
                                                      <p className="fl min-max-color">MIN :&nbsp;
                                                      {activepill === "SSF" ? total_time_chart_training_ssf_min : activepill === "MT" ?
                                                        total_time_chart_training_mt_min : total_time_chart_training_micro_min }
                                                      </p>
                                                      <p className="fr min-max-color">MAX : &nbsp;
                                                      {activepill === "SSF" ? total_time_chart_training_ssf_max : activepill === "MT" ?
                                                        total_time_chart_training_mt_max : total_time_chart_training_micro_max }
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                         
                                                </div>

                                                <ul id="inline-list" className="fr">
                                                  <li><button className="legend-buttons legend-buttons-yellow" type="button"></button> &nbsp;Avg, time &nbsp;</li>
                                                  <li><button className="legend-buttons legend-buttons-cyan" type="button"></button> &nbsp; Threshold</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-6 col-sm-6">
                                        <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">PLOT OF NUMBER OF TRAINING SESSIONS VS DAY</p>
                                        </div>
                                        <div className="card-body">
                                        <LineChart ref={this.linechart} chart_id={"training_session_vs_day2"} color={"#FF7171"} />
                                        <ul id="inline-list" className="fr">
                                          <li><button className="legend-buttons legend-buttons-green" type="button"></button> &nbsp;Session no &nbsp;</li>
                                          <li><button className="legend-buttons legend-buttons-red" type="button"></button> &nbsp; Training</li>
                                        </ul>
                                        </div>
                                            
                                                
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-sm-6">
                                        <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">PLOT OF NUMBER OF CERTIFICATE SESSIONS VS DAY</p>
                                        </div>
                                        <div className="card-body">
                                        <LineChart ref={this.linechart2} chart_id={"certificate_session_vs_day2"} color={"#2F53FF"} />
                                        <ul id="inline-list" className="fr">
                                          <li><button className="legend-buttons legend-buttons-green" type="button"></button> &nbsp;Session no &nbsp;</li>
                                          <li><button className="legend-buttons legend-buttons-blue" type="button"></button> &nbsp; Certification</li>
                                        </ul>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div className="row">
                                    <div className="col-xl-6 col-sm-6">
                                        <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">Total Time Taken vs Session number - Training</p>
                                        </div>
                                        <div className="card-body">
                                        <LineChartReverse ref={this.linechart3} chart_id={"total_time_taken_vs_session_number_training"} color={"#FF7171"} />
                                        <ul id="inline-list" className="fr">
                                          <li><button className="legend-buttons legend-buttons-green" type="button"></button> &nbsp;Session no &nbsp;</li>
                                          <li><button className="legend-buttons legend-buttons-red" type="button"></button> &nbsp; Training</li>
                                        </ul>
                                        </div>
                                            
                                                
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-sm-6">
                                        <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">Total Time Taken vs Session number - Certification</p>
                                        </div>
                                        <div className="card-body">
                                        <LineChartReverse ref={this.linechart4} chart_id={"total_time_taken_vs_session_number_certification"} color={"#2F53FF"} />
                                        <ul id="inline-list" className="fr">
                                          <li><button className="legend-buttons legend-buttons-green" type="button"></button> &nbsp;Session no &nbsp;</li>
                                          <li><button className="legend-buttons legend-buttons-blue" type="button"></button> &nbsp; Certification</li>
                                        </ul>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div className="row">
                                    <div className="col-xl-12 col-sm-12">
                    
                                        <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        
                                        <div className="fl">
                                        <p className="bold f13">DRILL-DOWN TIMING</p>
                                        <p className="f12" style={{ color:'#000' }}>Avg. time, Min. time & max. time with threshold</p>

                                          </div>
                                          <div className="fr">
                                          <Popup
                                            trigger={
                                                    <button className="btn btn-success mt-4 ma10" style={{ marginLeft:'0.6cm' }}>
                                                      Add threshold
                                                    </button>
                                                    }
                                            closeOnDocumentClick
                                            modal
                                        >{close => (
                                            <div className="popupContainer" style={{ width:'400px' }}>
                                            
                                                  <div>
                                                      <div  class="form-inline">
                                                      <div className="form-group">
                                                        Certification threshold
                                                      </div>
                                                      <div className="form-group ml15">
                                                        Training threshold
                                                      </div>
                                                      </div>

                                                    {
                                                      candle_stick_threshold.map((candle, index) => (
                                                        <div key={index} class="form-inline">
                                                          Zone {index+1}
                                                           <div className="form-group">
                                                            {
                                                              activepill === "MT" && mt_candel_data ?
                                                              (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onCertificationThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ):activepill === "SSF" && ssf_candel_data ?
                                                              (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onCertificationThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ): activepill === "MICTO" && micro_candel_data ? (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onCertificationThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ):(
                                                                <input onChange={(e) => this.onCertificationThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              )
                                                            }


                                                            {
                                                              activepill === "MT" && mt_candel_data ?
                                                              (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold2"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onTrainingThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ):activepill === "SSF" && ssf_candel_data ?
                                                              (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold2"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onTrainingThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ): activepill === "MICTO" && micro_candel_data ? (
                                                                <input defaultValue={activepill === "SSF" ? ssf_candel_data[index]["threshold2"] : activepill === "MT" ? mt_candel_data[index]["threshold"] : micro_candel_data[index]["threshold"] } onChange={(e) => this.onTrainingThresholdChange(e, index)} className="form-control" placeholder="Certification threshold" type="number" />
                                                              ):(
                                                                <input onChange={(e) => this.onTrainingThresholdChange(e, index)} className="form-control" placeholder="Training threshold" type="number" />
                                                                )
                                                            }



                                                            </div>
                                                        </div>
                                                      ))
                                                    }
                                                   

                                                    <div className="form-group">
                                                    <button className="btn btn-success mr15px" onClick={() => this.addThresholds(close)}>Submit</button>

                                                    <button className="btn btn-success" onClick={close}>Close</button>
                                                    </div>
                                                    
                                                  </div>

                                            </div>
                                        )}
                                        </Popup>
                                          </div>
                                 
                                      

                                        </div>
                                        <div className="card-body">
                                        <CandleChart ref={this.barchart} chart_id={"drill_doen-timing"} />
                                        <ul id="inline-list" className="fr">
                                          <li><button className="legend-buttons legend-buttons-yellow" type="button"></button> &nbsp;Avg. time &nbsp;</li>
                                          <li><button className="legend-buttons legend-buttons-cyan" type="button"></button> &nbsp; Threshold</li>
                                        </ul>
                                        </div>
                                            
                                        </div>

                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-xl-12 col-sm-12">
                                    <div className="card br10">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">DRILL-DOWN TIMING</p>
                                        <p className="f12" style={{ color:'#000' }}>Click and edit the dots on-hover</p>
                                        </div>
                                        <div className="card-body">
                                          <LineChartReverse hit_drop={true} ref={this.thresholdchart} chart_id={"threshold_chart"} trend_line={"yes"} color={"#2F53FF"} threshold={"yes"}/>
                                          <ul id="inline-list" className="fr">
                                            <li><button className="legend-buttons legend-buttons-green" type="button"></button> &nbsp;session no &nbsp;</li>
                                            <li><button className="legend-buttons legend-buttons-blue" type="button"></button> &nbsp; Hits/Drops</li>
                                          </ul>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>



                                </div>
                            </div>
                        </div>
                    </div>
                        

              
                  </div>
                </div>
              </div>
            </div>
    
          </div>
        )
    }
}


export default Info;