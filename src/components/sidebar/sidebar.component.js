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
          const obj = JSON.parse(e.target.result);
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
    this.props.loadData(dataList)
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