import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService'
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        // tạo biến
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,

        }
    }

    async componentDidMount() {
       await this.getAllUserFromReact();

    }

    getAllUserFromReact = async () =>{
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
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
           }
        }catch(e){
            console.log(e)
        }
    }
    render() {

        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    toggleFromParent={this.toggleUserModal}
                    isOpen={this.state.isOpenModalUser}
                    createNewUser={this.createNewUser}


                />
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {

                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>
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
