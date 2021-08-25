import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash'; // xử lí object , mảng

class ModalEditUser extends Component {
    //props = properties thuộc tính
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            statusId: '',
            patientId: '',

        }
       
    }

    

    componentDidMount() {
        // console.log('mouting modal')
        let status = this.props.currentUser;
        if(status && !_.isEmpty(status)){
            this.setState({
                id: status.id,
                email: status.PatientData.email,
                firstName: status.PatientData.firstName,
                statusId: status.Status.valueVi,
                patientId: status.PatientData.id
            
            })
        }



    }

    toggle = () => {
        this.props.toggleFromParent();
    }


    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {

            // console.log('check state: ', copyState);
        })
    }


    // checkValidInput = () => {
    //     let isValid = true;
    //     let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    //     for (let i = 0; i < arrInput.length; i++) {
    //         if (!this.state[arrInput[i]]) {
    //             isValid = false;
    //             alert('Missing parameter ' + arrInput[i]);
    //             break;
    //         }

    //     }
    //     return isValid;
    // }


    handleSaveUser = () => {
  
    
            //call api edit user 
            this.props.editUser(this.state);



        
        // console.log('data modal', this.state)

    }
    render() {
        console.log("Check props from parent: ", this.props)
        console.log("check state: ", this.state)

        return (
            <Modal

                size="lg"
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}>
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <lable>Email:</lable>
                            <input disabled type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                    
                        <div className="input-container">
                            <lable>Khách hàng:</lable>
                            <input disabled type="text" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <lable>Status</lable>
                            {/* <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                value={this.state.status}
                            /> */}
                            <select onChange={(event) => { this.handleOnChangeInput(event, "statusId") }}
                                value={this.state.statusId}>
                                    <option value="">----Chọn trạng thái----</option>
                                    <option value="S1">Lịch hẹn mới</option>
                                    <option value="S2">Đã xác nhận</option>
                                    <option value="S3">Đã khám xong</option>
                                    <option value="S4">Đã hủy</option>

                            </select>
                        </div>
                      
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleSaveUser() }}>Save changes</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




