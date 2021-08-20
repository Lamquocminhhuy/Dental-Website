import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';


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
           

            this.setState({
                rangeTime: this.props.allScheduleTime,
            })
        }

    }

    render() {
        let {rangeTime} = this.state;
        console.log('check state', this.state)
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
                                minDate = {new Date()}
                               
                             
                            />

                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                            
                            rangeTime.map((item, index) => {
                                return (
                                    <button className="btn btn-schedule" key={index}>{item.valueVi}</button>
                                )
                            })

                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule">Lưu</button>
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
