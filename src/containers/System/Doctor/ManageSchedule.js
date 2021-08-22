import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor} from "../../../services/userService"
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }


    componentDidMount() {
        //fire redux
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();

    }
        

    buildDataInputSelect = (inputData) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = `${item.lastName} ${item.firstName}`;

                result.push(object);
            })

        }
        return result;



    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ 
            selectedDoctor : selectedOption 
        });

       
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)

            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
           let data = this.props.allScheduleTime;
           if ( data && data.length > 0 ) {
               data = data.map(item =>{
                   item.isSelected = false;
                   return item;
               })
           }

            this.setState({
                rangeTime: data
            })
        }

    }
    handleClickBtnTime = (time) =>{
        console.log('check time', time)
        let {rangeTime} = this.state;

        if(rangeTime && rangeTime.length > 0 ){
           
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime,
            })
        }

        
    }

    handleSaveSchedule = async() => {

        let {rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if(!currentDate){
            toast.success("Vui lòng chọn ngày!")
            return;
        }if(selectedDoctor && _.isEmpty(selectedDoctor)){

            toast.error("Vui lòng chọn bác sĩ!")
            return;
        }

        let formattedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0 ){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
                
            }else {
                toast.error("Vui lòng chọn bác sĩ!")
                return;
            }
            
    
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule : result,
            doctorId: selectedDoctor.value,
            formatedDate: formattedDate,
        });
        if(res && res.errCode === 0){
            toast.success("Save schedule succeed")
        }else{
            toast.error("Error")
        }
        console.log('check res save', res)
          
    }
    
    render() {
        let {rangeTime} = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
        console.log('check state', rangeTime)
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    Quản lý kế hoạch khám bệnh nha sĩ
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <lable>Chọn nha sĩ</lable>
                            
                            <Select
                    
                                value={this.state.selectDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />

                        </div>
                        <div className="col-6 form-group">
                            <lable>Chọn ngày</lable>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate = { yesterday}
                               
                             
                            />

                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                            
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                     onClick={() => this.handleClickBtnTime(item)}
                                     className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule" }
                                     key={index}>{item.valueVi}</button>
                                )
                            })

                            }
                        </div>
                        <div className="col-12">
                            <button 
                            
                            onClick={() => {this.handleSaveSchedule()}}
                            className="btn btn-primary btn-save-schedule">Lưu</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
