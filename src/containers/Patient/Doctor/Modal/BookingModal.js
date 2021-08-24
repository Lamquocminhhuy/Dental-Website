import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../Modal/ProfileDoctor";
import _ from "lodash";
import { postPatientAppointment, postSlotAppointment} from "../../../../services/userService";
import * as actions from "../../../../store/actions";

import {toast} from "react-toastify";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeType: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      doctorId: "",
      note: "",

      //service
      genderArr: [],
      serviceArr: [],
      service: "",
      date: "",
      
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.servicesRedux !== this.props.servicesRedux) {
      let serviceArr = this.props.servicesRedux;
      this.setState({
        serviceArr: serviceArr,
        service:
          serviceArr && serviceArr.length > 0 ? serviceArr[0].keyMap : "",
      });
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        let date = this.props.dataTime.date;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
          date: date
        });
      }
    }
  }

  async componentDidMount() {
    this.props.getServiceStart();
    this.props.getGenderStart();
  }

  handleOnChangleInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;

    this.setState({
      ...stateCopy,
    });
  };

  HandleOnChangeSelect = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleComfirmBooking = async () => {
    
    let res = await postPatientAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      note: this.state.note,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      service: this.state.service,
      timeType : this.state.timeType,
      date: this.state.date,
    
    })
    let res1 = await postSlotAppointment({
      doctorId: this.state.doctorId,
      date: this.state.date,
      timeType : this.state.timeType,
    })
    if(res && res.errCode === 0) {
      toast.info("Đặt lịch thành công")
      this.props.closeBookingModal();
    }else{
      toast.error("Có lỗi xảy ra! Vui lòng thử lại")
    }
    if(res1 && res1.errCode === 0){
      setTimeout(() => this.refesh(), 5000)
    }



    // console.log("check state", this.state);
  };
  refesh = () => {
    window.location.reload(false)
  }
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let services = this.state.serviceArr;
    let genders = this.state.genderArr;

    let doctorId = "";
    if (dataTime) {
      doctorId = dataTime.doctorId;
    }

    console.log("check state", this.state);
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor doctorId={doctorId} dataTime={dataTime} />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangleInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangleInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-12 form-group">
                <label>Địa chỉ Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) =>
                    this.handleOnChangleInput(event, "email")
                  }
                />
              </div>
             
              <div className="col-6 form-group">
                <label>Dịch vụ</label>
                <select
                  className="form-control"
                  value={this.state.service}
                  onChange={(event) => {
                    this.HandleOnChangeSelect(event, "service");
                  }}
                >
                  {services &&
                    services.length > 0 &&
                    services.map((item, index) => {
                      // console.log(item)
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
             
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <select
                  className="form-control"
                  value={this.state.gender}
                  onChange={(event) => {
                    this.HandleOnChangeSelect(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      // console.log(item)
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 form-group">
                <label>Note</label>
                <input
                  className="form-control"
                  value={this.state.note}
                  onChange={(event) => this.handleOnChangleInput(event, "note")}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleComfirmBooking()}
            >
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Đóng
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    servicesRedux: state.admin.services,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getServiceStart: () => dispatch(actions.fetchServiceStart()),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
