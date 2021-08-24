import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import TableManageUser from './TableManageUser';
import { CRUD_ACTION } from '../../../utils';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],



            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',


            action: '',
            userEditId:  '',



        }

    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // this.props.dispatch(actions.fetchGenderStart())
        // this.props.dispatch(actions.getGenderStart()); Viết chuẩn của Redux | viết theo dòng dưới dùng hàm mapDispatch


        //     try{
        //        let res = await getAllCodeService("gender");
        //        if(res && res.errCode === 0){
        //            this.setState({
        //                genderArr: res.data
        //            })
        //        }

        //     }catch(e){
        //         console.log(e)
        //     }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;

            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''


            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({

                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevProps.listusers !== this.props.listusers) {
            let arrPosition = this.props.positionRedux;
            let arrGender = this.props.genderRedux;
            let arrRole = this.props.roleRedux;



            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                actions: CRUD_ACTION.CREATE,
              

            })
        }

    }



    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === false) return;


        let actions = this.state.actions;

        if (actions === CRUD_ACTION.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,

            })
        }
        if (actions === CRUD_ACTION.EDIT) {
            //fire redux edit user
            this.props.editAUserRedux({


                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,



            });
        }






    }
    checkValidInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password',
            'firstName', 'lastName',
            'phoneNumber', 'address',
            'gender', 'position', 'role']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required input ' + arrCheck[i])
                break;


            }
        }

        return isValid;
    }
    onChangeInput = (event, id) => {

        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }
        ); 
    }

    handleEditUserFromParent = (user) => {
        //fire redux action
        console.log('check handleEditUserFromParent', user)

        this.setState({
            email: user.email,
            password: 'COCONCEC',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            actions: CRUD_ACTION.EDIT,
            userEditId:  user.id,

        })
    }
    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let isLoadingGender = this.props.isLoadingGender


        let { email, password,
            firstName, lastName,
            phoneNumber, address,
            gender, position, role,
            avatar } = this.state;


        // let email = this.state.email; bad way :v


        // console.log('check', this.state)
        return (

            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isLoadingGender === true ? 'Loading genders' : ''}</div>
                            <div className="col-3">
                                <lable>Email</lable>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.actions === CRUD_ACTION.EDIT ? true : false}

                                />

                            </div>

                            <div className="col-3">
                                <lable>Password</lable>
                                <input className="form-control" type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.actions === CRUD_ACTION.EDIT ? true : false}
                                />

                            </div>
                            <div className="col-3">
                                <lable>First Name</lable>
                                <input className="form-control" type="text"

                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />

                            </div>
                            <div className="col-3">
                                <lable>Last Name</lable>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />

                            </div>
                            <div className="col-3">
                                <lable>Phone Number</lable>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />

                            </div>

                            <div className="col-9">
                                <lable>Address</lable>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />

                            </div>
                            <div className="col-3">
                                <lable>Gender</lable>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            // console.log(item)
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                    }



                                </select>

                            </div>
                            <div className="col-3">
                                <lable>Position</lable>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}

                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            // console.log(item)
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                            <div className="col-3">
                                <lable>RoleId</lable>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}

                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            // console.log(item)
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                            <div className="col-3">
                                <lable>Image</lable>
                                <input type="text" />
                                <div className="preview-image"></div>
                            </div>
                            <div className="col-12 mt-3 ">
                                <button className={this.state.actions === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >

                                    {this.state.actions === CRUD_ACTION.EDIT ? "Edit" : "Save"}


                                </button>
                            </div>
                            <div className="col-12 my-3 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}

                                />
                            </div>








                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listusers: state.admin.users,

    };
};

//Redux :v
const mapDispatchToProps = dispatch => {

    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),


        getRoleStart: () => dispatch(actions.fetchRoleStart()),


        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),


        editAUserRedux: (data) => dispatch(actions.editAUser(data)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
