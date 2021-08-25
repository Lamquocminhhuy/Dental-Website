import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService , getAllBooking,UpdateStatusBooking} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditStatus';
import { emitter } from "../../utils/emitter";
import moment from "moment";

class UserManage extends Component {

    constructor(props) {
        // tạo biến
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser :false,
            statusEdit: {}

        }
    }

    async componentDidMount() {
       await this.getAllBookingFromReact();

    }

    getAllBookingFromReact = async () =>{
        let response = await getAllBooking();
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.data
            })
        }
    }

    // handleAddNewUser = () => {
    //     this.setState({
    //         isOpenModalUser: true,
    //     })
    // }

    toggleChangeModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleStatusEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

//Tạo status qua API
    // createNewUser = async (data) => {
    //     console.log('check data from child', data)
    //     try{
    //        let response = await createNewUserService(data);
    //        if(response && response.errCode !==0){
    //            alert(response.errmessage);
    //        }else{
    //            // Fetch lại api show status sau khi tạo
    //            await this.getAllBookingFromReact();
    //            this.setState({
    //             isOpenModalUser: false,
    //         })
    //         emitter.emit('EVENT_CLEAR_MODAL_DATA')
    //        }
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    // delete status by api
    // handleDeleteUser = async (status) => {
        
    //     try{
    //        let response = await deleteUserService(status.id)
    //        if (response && response.errCode === 0){
    //             await this.getAllBookingFromReact();
    //        }else{
    //             alert(response.errmessage)
    //        }

           
    //     }catch(e){
    //         console.log(e)
    //     }

    // }

    handleEditUser = (status) =>{
        console.log('check edit status', status)
        this.setState({
            isOpenModalEditUser: true,
            statusEdit: status
        })
    }

    doEditUser = async (status) =>{
        try{
            let response = await UpdateStatusBooking(status);
            if (response && response.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllBookingFromReact();
            }else{
                alert(response.errCode)
            }
        }catch(e){
            console.log(e)
        }
       
    }
    render() {

        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className="users-container">
                <ModalUser
                    toggleFromParent={this.toggleChangeModal}
                    isOpen={this.state.isOpenModalUser}
                    createNewUser={this.createNewUser}


                />
                {this.state.isOpenModalEditUser &&

                    <ModalEditUser
                        toggleFromParent={this.toggleStatusEditModal}
                        isOpen={this.state.isOpenModalEditUser}
                        currentUser={this.state.statusEdit}
                        editUser={this.doEditUser}
                    //   createNewUser={this.createNewUser}

                    />
                }
                <div className="title text-center">
                    Thông tin đặt lịch
                </div>
                {/* <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}

                    ><i className="fas fa-plus"></i>Add new users</button>
                </div> */}
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr> 
                                <th>STT</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Họ và tên</th>
                                <th>Ngày đặt</th>
                                <th>Khung giờ</th>
                                <th>Dịch vụ</th>
                                <th>Nha sĩ</th>
                                <th>Trạng thái</th>
                                <th>Cập nhật trạng thái</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                            let date = moment.unix(+item.date / 1000).format('DD/MM/YYYY')
                                return (
                                    <tr>
                                        <td>{index  + 1}</td>
                                        <td>{item.PatientData.email}</td>
                                        <td>{item.PatientData.phonenumber}</td>
                                        <td>{item.PatientData.firstName}</td>
                                        
                                        <td>{date}</td>
                                        <td>{item.Time.valueVi}</td>
                                        <td>{item.Service.valueVi}</td>
                                        <td>{item.DoctorData.firstName}</td>
                                        <td>{item.Status.valueVi}</td>
                                        <td><button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button></td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>

                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
