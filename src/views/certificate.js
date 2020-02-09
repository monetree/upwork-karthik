import React from "react";
import { handleScreenCapture } from '../utils/screenshot'

class Certificate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){
    handleScreenCapture("certificate", "certificate", false)
  }

  render() {
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
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Average Time</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Best Time</td>
                <td>203.3</td>
                <td>203.3</td>
                <td>203.3</td>
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
