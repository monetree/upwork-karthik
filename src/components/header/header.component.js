import React from "react";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            manageprofiletoggle:false
        }
    }

    handleSidebar = () => {
        this.props.handleSidebar()
    }


    manageProfileToggle = () => {
        this.setState({
          manageprofiletoggle: !this.state.manageprofiletoggle
        })
      }

      
    render(){
        return (          
            <header className="main-header" id="header">
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
   
              <button onClick={this.handleSidebar} id="sidebar-toggler" className="sidebar-toggle">
                <span className="sr-only">Toggle navigation</span>
              </button>

              <div className="navbar-right ">
                <ul className="nav navbar-nav">

                  <li className={this.state.manageprofiletoggle ? "dropdown user-menu" : "dropdown user-menu show" }>
                    <button className="dropdown-toggle nav-link" data-toggle="dropdown" onClick={this.manageProfileToggle}>
                      <img src="assets/img/user/user-md-01.jpg" className="user-image rounded-circle" alt="User Image" />
                      <span style={{ color:'#5655B4' }}>William D.</span>
                 
                    </button>
              
                    <ul className={this.state.manageprofiletoggle ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right"}>
                      <li className="tc pa10">
                        Logout
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div style={{ 	borderRadius: "25px", 	border: "1px solid #D7E8FF", padding:'10px 25px' }} className="bold f16 black-color">
                    <i class="fa fa-question-circle f16" aria-hidden="true"></i> Help
                      </div>
                   
                  </li>
                </ul>
              </div>
            </nav>
          </header>

        )
    }
}


export default Header;