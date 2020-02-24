import React from "react";
import LineChart from "../components/line-chart/line-chart.components";
import Sidebar from "../components/sidebar/sidebar.component";
import Header from "../components/header/header.component";
import Datepicker from "../UI/datepicker";
import CandleChart from "../components/candle-chart/candle-chart.component";

class Summary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navbar:true,
            activepill: "SSF",
            datasource: []
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

    loadData = (datasource) => {
      this.setState({
        datasource: datasource
      })
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
            <Sidebar loadData={this.loadData} handleSidebar={this.handleSidebar}/>

              <div className="page-wrapper">
              <Header handleSidebar={this.handleSidebar}/>
                <div className="content-wrapper">
                  <div className="content">
           
                  <div className="fl bold" style={{ color:'#192354', fontSize:'30px' }}>Summary Dashboard - Features</div>
                    <div className="fr"> 
                    <Datepicker></Datepicker>
                    </div>

                <div class="w3-row-padding cards-mobile-show">
                <div class="card active-card card-default w3-third">
                  <div className="card-header" style={{ color:'#fff' }}>
                  <h2 style={{ color:'#fff' }} className="bold tc">32,689</h2>
                  <p className="bold tc">Operators Trained in VR</p>
                </div>
                </div>
                <div class="card card-default w3-third">
                <div className="card-header">
                <ul id="inline-list" style={{ display:'inline' }}>
                    <li style={{ display:'inline' }}><img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img></li>
                    <li style={{ display:'inline' }}><h2>Total no of training sessions</h2></li>
                    <li style={{ display:'inline' }}><p>199</p></li>
                  </ul>
                </div>
                </div>
                <div class="card card-default w3-third">
                <div className="card-header">
                <ul id="inline-list" style={{ display:'inline' }}>
                    <li style={{ display:'inline' }}><img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img></li>
                    <li style={{ display:'inline' }}><h2>Total no of training sessions</h2></li>
                    <li style={{ display:'inline' }}><p>199</p></li>
                  </ul>
                </div>
                </div>
              </div>
                    

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="cards-desktop-show">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6">
                        <div className="card active-card card-default">
                          <div className="card-header">
                            <p className="tc" style={{ fontSize:'30px' }}>32,689</p>

                            <div className="sub-title tc">
                              <span className="mr-1">Operators Trained in VR</span> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-sm-8">
                        <div className="card card-default">
                          <div className="card-header">
                            <div className="row" style={{ marginTop:'13px', marginRight:'5px' }}>
                                <div className="col-xl-2">
                                  <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>
                                </div>
                                <div className="col-xl-8" style={{ color:'#8C8C8C' }}>Total no of training sessions</div>
                                <div className="col-xl-2 bold black-color" style={{ fontSize:'26px' }}>199</div>
                             </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 col-sm-7">
                        <div className="card card-default">
                          <div className="card-header">
                              <div className="ma">
                            <div className="row" style={{ marginTop:'15px', marginRight:'5px' }}>
                                <div className="col-xl-2">
                                <img src ="assets/img/ic_training sessions@3x.png" className="dashboard-content-icons"></img>

                                </div>
                                <div className="col-xl-8" style={{ color:'#8C8C8C' }}>Total no of Operators certified</div>
                                <div className="col-xl-2 bold black-color" style={{ fontSize:'26px' }}>128</div>
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

                                              <div className="row mbpb10" style={{ borderBottom:'0.5px solid #f2f2f2' }}>
                                              <div className="col-xl-2 col-sm-12">
                                              <img src ="assets/img/ic_undergone training@3x.png" className="dashboard-content-icons"></img>
                                                </div>
                                                <div className="col-xl-6 col-sm-12">
                                                  <p>Total number of training session</p>
                                                </div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color"></div>
                                                <div className="col-xl-2 col-sm-12 bold f25 black-color">120</div>
                                              </div>

                                              <div className="row mbpb10">
                                              <div className="col-xl-2 col-sm-12">
                                              <img src ="assets/img/ic_undergone certification@3x.png" className="dashboard-content-icons"></img>
                                                </div>
                                                <div className="col-xl-6 col-sm-12">
                                                  <p>Total number of operators certified</p>
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
                                        <LineChart ref={this.linechart} chart_id={"training_session_vs_day2"} color={"#FF7171"} />
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
                                          <p className="f12" style={{ color:'#000' }}>Click and edit the dots on-hover</p>
                                        </div>
                                        <div className="fr">
                                          <button type="button" className="edit-button">EDIT</button>
                                        </div>
                                        </div>
                                        <div className="card-body">
                                          <LineChart ref={this.thresholdchart} chart_id={"threshold_chart"} color={"#2F53FF"} threshold={"yes"}/>
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


export default Summary;