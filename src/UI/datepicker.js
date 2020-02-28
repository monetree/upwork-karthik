import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Datepicker extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };


  componentDidMount(){
    let node1 = document.getElementsByClassName("c1")
    let node2 = document.getElementsByClassName("c2")
    node1[0].classList.add("main-font")
    node2[0].classList.add("main-font")

  }
  // onChangeStartDate = date => this.setState({ startDate: date });
  // onChangeEndDate = date => this.setState({ endDate: date });

  onChangeStartDate = (startDate) => {
    this.setState({ startDate: startDate })
  }

  onChangeEndDate = (endDate) => {
    this.setState({ endDate: endDate })
    this.props.handleFilterDates(this.state.startDate, endDate)
  }

  toggle = () => {
    this.component1.setOpen(this.focus);
    this.focus = !this.focus;
  };
  toggle2 = () => {
    this.component.setOpen(this.focus);
    this.focus = !this.focus;
  };

  render() {
    return (
      <div className="rect">
        <div style={{ background:'#fff', borderRadius:'10px', paddingBottom:'10px' }}>
          <div class="parent">
            <div class="div1">
              <img
                className="icon1"
                style={{ justifyContent: "center" }}
                src={require("./icons/ic2.png")}
                alt="icon"
              ></img>
            </div>
            <div class="div2">
              <DatePicker
                preventOpenOnFocus={true}
                ref={k => {
                  this.component1 = k;
                }}
                dateFormat="MMMM d,yyyy"
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
                className="c1"
                popperPlacement={"bottom-end"}
              />
            </div>
            <div class="div3">
              <img
                className="icon2"
                src={require("./icons/ic.png")}
                alt="icon"
                onClick={() => this.toggle()}
              ></img>
              <img
                className="icon3"
                style={{ paddingLeft: "1em" }}
                src={require("./icons/ic3.png")}
                alt="icon"
              ></img>
            </div>
            <div class="div4">
              <DatePicker
                preventOpenOnFocus={true}
                ref={r => {
                  this.component = r;
                }}
                dateFormat="MMMM d,yyyy"
                selected={this.state.endDate}
                onChange={this.onChangeEndDate}
                className="c2"
                popperPlacement={"bottom-end"}
              />
            </div>
            <div class="div5">
              <img
                className="icon3"
                src={require("./icons/ic.png")}
                alt="icon"
                onClick={() => this.toggle2()}
              ></img>{" "}
            </div>
          </div>
         
        </div>
     
      </div>
    );
  }
}
export default Datepicker;
