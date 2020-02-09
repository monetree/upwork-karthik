import React from "react";
import LineChart from "../components/line-chart/line-chart.components";
import Sidebar from "../components/sidebar/sidebar.component";
import Header from "../components/header/header.component";
import Datepicker from "../UI/datepicker";
import {Link} from "react-router-dom";
import CandleChart from "../components/candle-chart/candle-chart.component";

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navbar:true,
            activepill: "SSF"
        }
        this.linechart = React.createRef()
        this.linechart2 = React.createRef()
        this.barchart = React.createRef()
        this.thresholdchart = React.createRef()
    }

    handleSidebar = () => {
        this.setState({
            navbar: !this.state.navbar
        })
    }

    handleSsfButtons = (ssf_type) => {
      this.setState({
        activepill: ssf_type
      })

      this.linechart.current.componentDidMount(ssf_type)
      this.linechart2.current.componentDidMount(ssf_type)
      this.barchart.current.componentDidMount(ssf_type)
      this.thresholdchart.current.componentDidMount(ssf_type)
    }


    render(){
        return (
            <div className={this.state.navbar ? "navbar-fixed sidebar-fixed right-sidebar-toggoler-out sidebar-mobile-out" : "navbar-fixed sidebar-fixed right-sidebar-toggoler-out sidebar-mobile-in"} style={this.state.navbar ? { overflow: 'auto' } : {overflow: 'hidden'}} id="body">
            {
                !this.state.navbar && (
                    <div class="mobile-sticky-body-overlay"></div>
                )
            }
            <div className="wrapper">
            <Sidebar handleSidebar={this.handleSidebar}/>
              <div className="page-wrapper">
          
                <Header handleSidebar={this.handleSidebar}/>
                <div className="content-wrapper">
                  <div className="content">
                  <div className="fl bold" style={{ color:'#192354', fontSize:'30px' }}>Operator Dashboard - Features</div>
                    <div className="fr">
                    <Datepicker></Datepicker>
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
                          <div className="w3-third"><p className="bold black-color">03</p></div>
                        </div>
                        </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">    
                        <div className="w3-row-padding ">
                          <div className="w3-third"><img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img></div>
                          <div className="w3-third"><h2 className="f17">Total no of training sessio</h2></div>
                          <div className="w3-third"><p className="bold black-color">03</p></div>
                        </div>
                        </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">    
                        <div className="w3-row-padding ">
                        <center><button type="button" className="print-btn"><Link to="/certificate" style={{ color:'#fff' }}>Print Certificate</Link></button></center>
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
                                    <div className="col-xl-2 f30 bold black-color">03</div>
                                    <div className="col-xl-2 f30 bold black-color"></div>
                                  </div>
                                </div>
                                <div className="col-xl-8">
                                <div className="row">
                                    <div className="col-xl-4 f17">
                                    <img src ="assets/img/ic_total time@3x.png" className="dashboard-content-icons"></img>
                                    Total time taken</div>
                                    <div className="col-xl-4 f30 bold black-color"><div>568</div></div>
                                    <div className="col-xl-4">
                                      <button type="button" className="print-btn"><Link to="/certificate" style={{ color:'#fff' }}>Print Certificate</Link></button>
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
                              <LineChart chart_id={"training_session_vs_day"} color={"#FF7171"} />
                     
                            </div>
                                
                                    
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-6">
                            <div className="card br10">
                            <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                            <p className="bold f13">PLOT OF NUMBER OF CERTIFICATE SESSIONS VS DAY</p>
                            </div>
                            <div className="card-body">
                            <LineChart chart_id={"certificate_session_vs_day"} color={"#2F53FF"} />
                         
                            </div>
                                
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-xl-12 col-sm-12">
                        <div className="card card-default" style={{ border:'none' }}>
                            <div style={{ background:'#F6F6FB' }} >
                                <button className={this.state.activepill === "SSF" ? "active-ssf-button blr5" : "ssf-button" } onClick={() => this.handleSsfButtons("SSF")}>SSF</button>
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
                                                  <p>Total number of Operators trained</p>
                                                </div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"></div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color">60</div>
                                              </div>
                                              <div className="row mbpb10">
                                              <div className="col-xl-2 col-sm-12">
                                              <img src ="assets/img/ic_undergone certification@3x.png" className="dashboard-content-icons"></img>
                                                </div>
                                                <div className="col-xl-6 col-sm-12">
                                                  <p>Certified ?</p>
                                                </div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"></div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color">580</div>
                                              </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-sm-12">
                                        <div className="card card-default">
                                        <div className="card-header" style={{ background:'#fff', border:'none', color:'#5F61CB', marginTop:'3px' }}>
                                        <p className="bold f13">TOTAL TIME</p>
                                        <p className="f12" style={{ color:'#000' }}>Avg. time, Min. time & max. time with threshold</p>
                                        </div>
                                            <div className="card-body">
                                                <div className="row">
                                                <div className="col-xl-5 col-sm-12 bold black-color">
                                                <img src ="assets/img/ic_undergone certification@3x.png" className="dashboard-content-icons"></img> Certification
                                                </div>
                                                <div className="col-xl-7 col-sm-12">
                                                  <div> 
                                                    <div style={{ display:'flex' }}>
                                                      <p className="yellow-color f12" style={{ marginLeft:'19%' }}>37</p>
                                                      <p className="cyan-color f12" style={{ marginLeft:'15%' }}>40</p>
                                                    </div>
                                                    <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                     
                                                      <div style={{ background:'#5655B4', width:'15%',height:'30px', marginLeft:"20px", borderRight:'1px solid #F2D822' }}></div>
                                                      <div style={{ background:'#5655B4', width:'20%',height:'30px', borderRight:'1px solid #76D9F4' }}></div>
                                                      <div style={{ background:'#5655B4', width:'35%',height:'30px' }}></div>
                                                
                                                    </div>
                                                    <div>
                                                      <p className="fl min-max-color">MIN</p>
                                                      <p className="fr min-max-color">MAX</p>
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
                                                      <p className="yellow-color f12" style={{ marginLeft:'34%' }}>40</p>
                                                      <p className="cyan-color f12" style={{ marginLeft:'15%' }}>45</p>
                                                    </div>
                                                <div> 
                                                    <div style={{ background:'lightgrey', height:'30px', width:"100%", borderRadius:'5px', display:'flex' }}>
                                                    <div style={{ background:'#FF7171', width:'30%',height:'30px', marginLeft:"20px", borderRight:'1px solid #76D9F4' }}></div>
                                                      <div style={{ background:'#FF7171', width:'20%',height:'30px', borderRight:'1px solid #F2D822' }}></div>
                                                      <div style={{ background:'#FF7171', width:'25%',height:'30px' }}></div>
                                                
                                                    </div>
                                                    <div>
                                                      <p className="fl min-max-color">MIN</p>
                                                      <p className="fr min-max-color">MAX</p>
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
                                        <LineChart ref={this.linechart} chart_id={"training_session_vs_day2"} trend_line={"yes"} color={"#FF7171"} />
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
                                        <LineChart ref={this.linechart2} chart_id={"certificate_session_vs_day2"} trend_line={"yes"} color={"#2F53FF"} />
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
                                        <p className="bold f13">DRILL-DOWN TIMING</p>
                                        <p className="f12" style={{ color:'#000' }}>Avg. time, Min. time & max. time with threshold</p>
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
                                          <LineChart ref={this.thresholdchart} chart_id={"threshold_chart"} trend_line={"yes"} color={"#2F53FF"} threshold={"yes"}/>
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