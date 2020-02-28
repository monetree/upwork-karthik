import React from "react";
import { handleScreenCapture } from '../utils/screenshot'

class Certificate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      total_no_of_certification_sessions_SSF:0,
      total_no_of_certification_sessions_MT:0,
      total_no_of_certification_sessions_MICRO:0,
      total_time_chart_certification_ssf_min:0,
      total_time_chart_certification_ssf_avg:0,
      total_time_chart_certification_mt_max:0,
      total_time_chart_certification_mt_min:0,
      total_time_chart_certification_mt_avg:0,
      total_time_chart_certification_micro_max:0,
      total_time_chart_certification_micro_min:0,
      total_time_chart_certification_micro_avg:0,
    }
  }

  componentDidMount(){
    if(!localStorage.getItem("certificate_data")){
      this.props.history.push("/info")
    }
    let certificate_data = JSON.parse(localStorage.getItem("certificate_data"))
    this.setState({
      total_no_of_certification_sessions_SSF:certificate_data.total_no_of_certification_sessions_SSF,
      total_no_of_certification_sessions_MT:certificate_data.total_no_of_certification_sessions_MT,
      total_no_of_certification_sessions_MICRO:certificate_data.total_no_of_certification_sessions_MICRO,
      total_time_chart_certification_ssf_min:certificate_data.total_time_chart_certification_ssf_min,
      total_time_chart_certification_ssf_avg:certificate_data.total_time_chart_certification_ssf_avg,
      total_time_chart_certification_mt_max:certificate_data.total_time_chart_certification_mt_max,
      total_time_chart_certification_mt_min:certificate_data.total_time_chart_certification_mt_min,
      total_time_chart_certification_mt_avg:certificate_data.total_time_chart_certification_mt_avg,
      total_time_chart_certification_micro_max:certificate_data.total_time_chart_certification_micro_max,
      total_time_chart_certification_micro_min:certificate_data.total_time_chart_certification_micro_min,
      total_time_chart_certification_micro_avg:certificate_data.total_time_chart_certification_micro_avg
    }, () => handleScreenCapture("certificate", "certificate", false))

  }

  render() {
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
    } = this.state;

    return (
      <div className="certificate" id="certificate">
      <div className="certbox">
        <div className="cert-title">
          <p className="comp-text bold">Certificate</p>
          <br/>
          <p className="comp-text2">OF COMPLETION</p>
        </div>
        <div className="cert-mid">
          <div className="cert-m-text">
            <h3>This certificate is<br />presented to</h3>
            <h4>Alex Sandler</h4>
            <h5>Chief Training Officer</h5>
            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain</p>
          </div>
        </div>
        <div className="cert-table">
          <table>
            <tbody><tr>
                <th />
                <th>SFF</th>
                <th>MT</th>
                <th>MICRO</th>
              </tr>
              <tr>
                <td>No. of Certification Sessions</td>
                <td>{total_no_of_certification_sessions_SSF}</td>
                <td>{total_no_of_certification_sessions_MT}</td>
                <td>{total_no_of_certification_sessions_MICRO}</td>
              </tr>
              <tr>
                <td>Average Time</td>
                <td>{total_time_chart_certification_ssf_avg}</td>
                <td>{total_time_chart_certification_mt_avg}</td>
                <td>{total_time_chart_certification_mt_avg}</td>
              </tr>
              <tr>
                <td>Best Time</td>
                <td>{total_time_chart_certification_ssf_min}</td>
                <td>{total_time_chart_certification_mt_min}</td>
                <td>{total_time_chart_certification_micro_min}</td>
              </tr>
              <tr>
                <td>Best Performing Zone</td>
                <td>369</td>
                <td>369</td>
                <td>369</td>
              </tr>
            </tbody></table>
        </div>
        <div className="cert-signature">
          <div className="cert-signature-box">
            <p>Certified By</p>
            <div className="sign-box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Signature_of_Andrew_Scheer.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="certificate-badge1" />
      <div className="certificate-badge2" />
    </div>
    )
  }
}

export default Certificate;
