import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService , getAllBooking} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";


class UserManage extends Component {

    constructor(props) {
        // tạo biến
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser :false,
            userEdit: {}

        }
    }

    async componentDidMount() {
       await this.getAllUserFromReact();

    }

    getAllUserFromReact = async () =>{
        let response = await getAllBooking();
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.data
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

//Tạo user qua API
    createNewUser = async (data) => {
        console.log('check data from child', data)
        try{
           let response = await createNewUserService(data);
           if(response && response.errCode !==0){
               alert(response.errmessage);
           }else{
               // Fetch lại api show user sau khi tạo
               await this.getAllUserFromReact();
               this.setState({
                isOpenModalUser: false,
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
           }
        }catch(e){
            console.log(e)
        }
    }

    // delete user by api
    handleDeleteUser = async (user) => {
        
        try{
           let response = await deleteUserService(user.id)
           if (response && response.errCode === 0){
                await this.getAllUserFromReact();
           }else{
                alert(response.errmessage)
           }

           
        }catch(e){
            console.log(e)
        }

    }

    handleEditUser = (user) =>{
        console.log('check edit user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) =>{
        try{
            let response = await editUserService(user);
            if (response && response.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
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
                    toggleFromParent={this.toggleUserModal}
                    isOpen={this.state.isOpenModalUser}
                    createNewUser={this.createNewUser}


                />
                {this.state.isOpenModalEditUser &&

                    <ModalEditUser
                        toggleFromParent={this.toggleUserEditModal}
                        isOpen={this.state.isOpenModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    //   createNewUser={this.createNewUser}

                    />
                }
                <div className="title text-center">
                    Manage User
                </div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}

                    ><i className="fas fa-plus"></i>Add new users</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Họ và tên</th>
                                <th>Ngày đặt</th>
                                <th>Khung giờ</th>
                                <th>Dịch vụ</th>
                                <th>Nha sĩ</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {

                                return (
                                    <tr>
                                        <td>{item.PatientData.email}</td>
                                        <td>{item.PatientData.phonenumber}</td>
                                        <td>{item.PatientData.firstName}</td>
                                        
                                        <td>{item.date}</td>
                                        <td>{item.Time.valueVi}</td>
                                        <td>{item.Service.valueVi}</td>
                                        <td>{item.DoctorData.firstName}</td>
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
