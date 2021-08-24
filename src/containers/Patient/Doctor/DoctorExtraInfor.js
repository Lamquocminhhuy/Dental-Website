import React, { Component } from "react";
import { connect } from "react-redux";

import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService"

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {}
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
        
        if(res && res.errCode === 0){
            this.setState({
                extraInfor : res.data,
            })
        }
        // console.log('check res ',res)
    }
  }



  showHideDetailInfor = (status) => {
      this.setState({
          isShowDetailInfor: status
      })

  }
  render() {
    let { isShowDetailInfor , extraInfor} = this.state;
    // console.log('check state ', this.state)
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">Địa chỉ phòng khám</div>

          <div className="detail-address">Phòng Khám Nha Khoa Smile</div>
          <div className="address">{extraInfor && extraInfor.AddressData ? extraInfor.AddressData.valueVi : ' ' }</div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div>Giá Khám  <span className="showhide" onClick={()=>this.showHideDetailInfor(true)}>
                
                Xem chi tiết </span></div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className = "detail-price">
                  <span className="left">Giá Khám: </span>
                  <span className="right">{extraInfor && extraInfor.Price ? extraInfor.Price.valueVi : ' ' }</span>
                  <span> VND</span>
              </div>
              <div>
                  <span>Phương thức thanh toán: </span>
                  <span>{extraInfor && extraInfor.PaymentData ? extraInfor.PaymentData.valueVi : ' ' }</span>
              </div>
              <div><span className="showhide" onClick={()=>this.showHideDetailInfor(false)}>
                  
                  Ẩn bảng giá</span></div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
