import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays();
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  async componentDidMount() {
    let allDays = this.getArrDays();

    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allDays: allDays,
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      let label = moment(new Date()).add(i, "days").format("dddd - DD/MM");

      object.label = this.capitalizeFirstLetter(label);

      // lay timestamp tai thoi diem hien tai - startOf day : lay thoi diem dau ngay 00:00:00
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
    // console.log('arrDate: ', allDays)
  };

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorid = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorid, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      // console.log("check res", res);
    }
  };



  handleClickScheduleTime = (item) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: item
    })
    // console.log("check time", item)
  }


  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false
    })
  }
  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;

    // console.log('check check check', dataScheduleTimeModal)
    // console.log('check', this.state)
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {" "}
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {" "}
                      {item.label}{" "}
                    </option>
                  );
                })}
            </select>{" "}
          </div>{" "}
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                {" "}
                <span> Lịch khám </span>{" "}
              </i>
              <div className="time-content">
                {" "}
                {allAvailableTime && allAvailableTime.length > 0 ? (
                  allAvailableTime.map((item, index) => {
                    // console.log(item)
                    // console.log(allAvailableTime)
                    if(item.currentNumber === null){
                      return (
                        <button key={index}
                        onClick={() =>this.handleClickScheduleTime(item)}
                        
                        
                        > {item.timeTypeData.valueVi} </button>
                      );
                    }
                  
                  })
                ) : (
                  <div> Không có lịch hẹn trong khoảng thời gian này! </div>
                )}
              </div>{" "}
              <div className="book-free">Chọn và đặt miễn phí </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      
        <BookingModal
          isOpenModal = {isOpenModalBooking}
          closeBookingModal ={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        
        
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
