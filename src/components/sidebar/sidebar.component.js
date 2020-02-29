import React from "react";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navbar:true,
            path : window.location.pathname,
            datasource: [],
            json_files:null,
            dataList: []
        }
    }

    dateFormatter = (date) => {
      let d_array = []
      date = date.split(",")
      date = date.slice(0, 2)
      date = date.toString()
      date = date.replace(",", "")
      date = date.split(" ")

      date[0] = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(date[0]) / 3 + 1 

      let month = date[0]
      let year = date[2]
      let dat = date[1]
      month = month.toString()
      if(month.length === 1){
        month = "0"+month
      }
      d_array = [year, month, dat]
      d_array = d_array.toString()
      d_array = d_array.replace(",", ".")
      d_array = d_array.replace(",", ".")
      d_array = d_array+"-21.10.03"
      return d_array
    }


    convertToNewJson = (old_json) => {
      old_json = JSON.stringify(old_json)
      old_json = JSON.parse(old_json)
      
      for(let i=0; i< old_json.length; i++){
        delete Object.assign(old_json[i], {["formFactor"]: old_json[i]["Form Factor"] })["Form Factor"];
        delete Object.assign(old_json[i], {["badgeNumber"]: old_json[i]["Badge Number"] })["Badge Number"];
        delete Object.assign(old_json[i], {["name"]: old_json[i]["Name"] })["Name"];
        delete Object.assign(old_json[i], {["dateTime"]: old_json[i]["Date and Time"] })["Date and Time"];
        delete Object.assign(old_json[i], {["model"]: old_json[i]["Model Number"] })["Model Number"];
        delete Object.assign(old_json[i], {["mode"]: old_json[i]["Mode"] })["Mode"];
        delete Object.assign(old_json[i], {["repetitions"]: old_json[i]["Repetition"] })["Repetition"];
        delete Object.assign(old_json[i], {["timing"]: old_json[i]["Timing"] })["Timing"];
      
        Object.keys(old_json[i]["timing"]).forEach((zone, j) => {
      
          let zone_times = old_json[i]["timing"][zone];
          let times_array = [];
      
          Object.keys(zone_times).forEach((step, k) => {
      
            times_array.push({
              "stepName": "NA",
              "timeInfo" : zone_times[step] //Int vs String correction required
            })
      
          });

          old_json[i]["new_timing"] = []
      
          old_json[i]["new_timing"].push({
            "zone": times_array
          })
        });

        if(old_json[i]["formFactor"] === "SFF"){
          old_json[i]["formFactor"] = "SSF"
        }

        old_json[i]["dateTime"] = this.dateFormatter(old_json[i]["dateTime"])
        old_json[i]["mode"] = old_json[i]["mode"].replace(" mode", "")
        old_json[i]["mode"] = old_json[i]["mode"].replace(" Mode", "")
        delete old_json[i]["timing"]; 
        delete Object.assign(old_json[i], {["timing"]: old_json[i]["new_timing"] })["new_timing"];
        for(let o of old_json[i]["timing"]){
          delete Object.assign(o, {["zoneInfo"]: o["zone"] })["zone"];
        }
      }

      return old_json
    }

  
    handleSidebar = () => {
      this.props.handleSidebar()
  }

//    onReaderLoad = (e) => {
//     var obj =JSON.parse(e.target.result)
//     this.setState(prevState => ({
//       datasource: [...prevState.datasource, obj]
//     }))
//   }

// ReadFiles = () => {
//   let files = this.state.json_files;

//   for (let i of files){
//     var reader = new FileReader();
//     reader.onload = this.onReaderLoad;
//     reader.readAsText(i);
//   }

// }


//   getfolder = (e) => {
//     var files = e.target.files;
//     this.setState({
//       json_files: files
//     }, () => this.ReadFiles())    
//   }

//   showDataSource = () => {
//     this.props.loadData(this.state.datasource)
//   }


readFilesNew = (files) => {
  let result = [];
  let count = 0;
  for (let i of files) {
      count++;
      const reader = new FileReader();
      reader.onload = function (e) {
          const obj = eval(e.target.result)
          result.push(obj);
      };
      reader.readAsText(i);
      if (count === files.length - 1) {
          this.setState(({
              dataList: result,
              json_files: files
          }), () => setTimeout(() => {
              this.showDataSource()
          }, 1000));
      }
  }
};

  getfolder = (e) => {
    let files = e.target.files;
    this.readFilesNew(files);
  };

  showDataSource = () => {
    const {dataList} = this.state;
    let old_jsons = []
    let new_jsons = []
    for(let i of dataList){
      if(Array.isArray(i)){
        old_jsons.push(this.convertToNewJson(eval(i)))
      }
    }
    for(let i of dataList){
      if(!Array.isArray(i)){
        new_jsons.push(i)
      }
    }

    for(let i of old_jsons){
      new_jsons.push({
        "sessions": i
      })
    }

    for (let i of new_jsons){
      for(let j of i["sessions"]){
        for(let k of j["timing"]){
          for(let l of k["zoneInfo"]){
            if(l["timeInfo"].length && !l["timeInfo"][0]){
              l["timeInfo"].splice(0, 1)
            }
          }
        }
      }
    }


    for (let i=0; i<new_jsons.length;i++){
      
    }

    this.props.loadData(new_jsons)
  };






    render(){
        return (

              <aside className="left-sidebar sidebar-dark" id="left-sidebar">
                <div id="sidebar" className="sidebar sidebar-with-footer">
                  {/* Aplication Brand */}
                  <div className="app-brand">
                    <Link to="/">
                      <img src="assets/img/logo.png" alt="Mono" />
                      <span className="brand-name"></span>
                    </Link>
                    <i onClick={this.handleSidebar} class="fa fa-times f16 sidebar-close-toggle" style={{ color:'#fff', position:'fixed', top:'0.7cm', left:'6cm' }} aria-hidden="true"></i>
                  </div>
                  {/* begin sidebar scrollbar */}
                  <div className="sidebar-left" data-simplebar style={{height: '100%'}}>
                    {/* sidebar menu */}
                    <ul className="nav sidebar-inner" id="sidebar-menu">
                      <li className={this.state.path === "/" ? "active active-border-sidebar" : "brbt"}>
                        <Link to="/" className="sidenav-item-link"  style={this.state.path === "/" ? {} : { color:'#5D60A0' }}>
                        {
                            this.state.path === "/" ? 
                            (
                              <img src ="assets/img/ic_data summary-active@3x.png" className="sidebar-icons"></img>
                            ):(
                              <img src ="assets/img/ic_data summary-active@3x-inactive.png" className="sidebar-icons"></img>
                            )
                          }
                          <span className="nav-text"> Data summary</span>
                        </Link>
                      </li>
                      <li className={this.state.path === "/info" ? "active active-border-sidebar" : "brbt"}>
                        <Link to="/info" className="sidenav-item-link" style={this.state.path === "/info" ? {} : { color:'#5D60A0' }}>
                          {
                            this.state.path === "/info" ? 
                            (
                              <img src ="assets/img/ic_operator info@3x-active.png" className="sidebar-icons"></img>
                              
                            ):(
                              <img src ="assets/img/ic_operator info@3x.png" className="sidebar-icons"></img>
                            )
                          }
                          
                          <span className="nav-text">Operator info</span>
                        </Link>
                      </li>
                      <li className="brbt">
                        <a className="sidenav-item-link" href="#" style={{ color:'#5D60A0' }}>
                        <img src ="assets/img/ic_data source@3x.png" className="sidebar-icons"></img>
                          
                          <label className="nav-text" style={{color:'rgb(93, 96, 160)', marginTop:'10px'  }}>Data source
                           <input type="file" style={{ display:'none' }} onChange={this.getfolder} directory="" webkitdirectory="" multiple accept=".json"/>
                          </label>
                          
                          
                        </a>
                      </li>
                      <li className="brbt">
                        <a className="sidenav-item-link" href="#" style={{ color:'#5D60A0' }}>
                        <img src ="assets/img/ic_help@3x.png" className="sidebar-icons"></img>
                          <span className="nav-text">Help</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

        )
    }
}


export default Sidebar;