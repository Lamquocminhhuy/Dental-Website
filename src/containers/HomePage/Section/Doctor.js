import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from "../../../store/actions"
import {withRouter} from "react-router";

class Doctor extends Component {
  


  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: []
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
      this.setState({
        arrDoctor: this.props.topDoctorRedux
      })
    }
  }
  handleViewDetailDoctor = (doctor) => {
    if(this.props.history){
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
   
  }
  componentDidMount() {
    //fire redux actions for
    this.props.loadTopDoctors();
  }


 
    render() {

      console.log('check top doctor', this.props.topDoctorRedux)
      let allDoctor = this.state.arrDoctor;
      
       
       

        return (
            <div className="section-share section-doctor">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">Đặt lịch với nha sĩ</span>
              </div>
              <div className="section-body">
                <Slider {...this.props.settings}> 
              
                {allDoctor && allDoctor.length > 0
                && allDoctor.map((item, index) => {
                  if(index == 0){
                    console.log('check item', item);
                  }

                  let name = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                  
                  return(
                    <div className="section-customize" onClick={() => this.handleViewDetailDoctor(item)}>
                    <div className="outer-bg">
                    <div className="bg-image section-doctor"></div>
                    </div>
                  
                  <div className="position text-center">
                  <div>{name}</div>
                
                  </div>
                 
                </div >
                  )
                })
                }
              
               
    
    
                </Slider>
              </div>
    
            </div>
    
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux : state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
      loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
