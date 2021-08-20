import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi"
import './DoctorSchedule.scss'

import { getScheduleDoctorByDate } from "../../../services/userService"


class DetailDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],

        }
    }

    async componentDidMount() {
        this.setArrDays(this.props.language)
  
     
    }
    setArrDays = () =>{
        let allDays = [];
        for (let i = 0; i < i < 7; i++) {
            let object = {};
          
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
         
           
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
      
   
    }

    handleOnChangeSelect = async (event) =>{ 
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await this.getScheduleDoctorByDate(doctorId, date);
            

        }
    }
    render() {
       let { allDays} = this.state;
        console.log('check state', this.props)
       return (
           <div className="doctor-schedule-container">
               <div className="all-schedule">
                   <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                        allDays.map((item, index) =>{
                            return(
                                <option value={item.value}
                                    key={index}
                                >
                                    {item.label}fefefewfwef
                                </option>
                            )
                        })
                        }

                   </select>

               </div>
               <div className="all-available-time">

               </div>

           </div>
       )
        
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
