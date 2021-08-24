import React, { Component } from "react";
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import {getProfileDoctorById} from "../../../../services/userService"
import _ from 'lodash';
import moment from 'moment';
import localization from "moment/locale/vi";
import { transform } from "typescript";


class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataProfile: {}
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.doctorId !== prevProps.doctorId){
        await this.getInforDoctor(this.props.doctorId)
    }
   
  }

  async componentDidMount() {
    let data =  await this.getInforDoctor(this.props.doctorId)
    this.setState({
        dataProfile:data
    })

    }


  
  getInforDoctor = async (id) =>{
      let result = {};
      if(id){
        let res = await getProfileDoctorById(id);
        if(res && res.errCode === 0){
            result = res.data;
        }
      }
      return result;
  }


  renderTimeBooking = (dataTime) =>{
      if(dataTime){
        let time = dataTime.timeTypeData.valueVi
        let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
        return (
            
            <div>{time} - {date}</div>
            
        )
      } 
  }

  render() {

    let {dataProfile} = this.state;
    let { dataTime } = this.props;
    console.log('check props', this.props)
    let name = "";
    if (dataProfile && dataProfile.positionData) {
      name = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      
        <div className="intro-doctor">
        <div className="content-left" ></div>
        {/* style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}} */}
        <div className="content-rights">
          <div className="up">{name}</div>
          <div className="down"> Giá khám: 
             {dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.Price && (
              <span> {dataProfile.Doctor_Infor.Price.valueVi} VND</span>
            )}
            <><div className="time-booking">{this.renderTimeBooking(dataTime)}</div></>
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
