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


    handleHitDrop  = (arr) => {
      arr = [arr]
        let data = arr.map(obj => Object.fromEntries(
          Object.entries(obj).map(([z, {Drop, Hit}]) => [z, Drop[0] + Hit[0]])
      ));
      data = Object.values(data[0]).reduce((a, b) => a + b, 0) 
      return data
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


    convertToNew = (timing) => {
      let new_arr = []
      let keys = Object.keys(timing)
      for(let i of keys){
        new_arr.push(timing[i])
      }



      const outData = [];
      let timeZone;
      for (const obj of new_arr) {
        timeZone = { zone: [] };
        for (const arr of Object.values(obj)) {
          timeZone.zone.push({ timeInfo: arr});
        }
        outData.push(timeZone);
      }
      
      return outData
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

        if(old_json[i]["formFactor"] === "SFF"){
          old_json[i]["formFactor"] = "SSF"
        }

        old_json[i]["timing"] = this.convertToNew(old_json[i]["timing"])
        old_json[i]["dateTime"] = this.dateFormatter(old_json[i]["dateTime"])
        old_json[i]["mode"] = old_json[i]["mode"].replace(" mode", "")
        old_json[i]["mode"] = old_json[i]["mode"].replace(" Mode", "")

        for(let o of old_json[i]["timing"]){
          delete Object.assign(o, {["zoneInfo"]: o["zone"] })["zone"];
        }

        old_json[i]["hit_drop"] = this.handleHitDrop(old_json[i]["Handling"])
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
          try{
            const obj = eval(e.target.result)
            result.push(obj);
          }catch(err) {
            const obj = JSON.parse(e.target.result)
            result.push(obj);
          }
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
        if(j["formFactor"] === "SFF"){
          j["formFactor"] = "SSF"
        }
        for(let k of j["timing"]){
          for(let l of k["zoneInfo"]){
            if(l["timeInfo"].length && !l["timeInfo"][0]){
              l["timeInfo"].splice(0, 1)
            }
          }
        }
      }
    }

    // console.log(JSON.stringify(new_jsons))

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