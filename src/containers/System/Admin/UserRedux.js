import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService}  from "../../../services/userService"
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []

        }

    }

    async componentDidMount() {
        try{
           let res = await getAllCodeService("gender");
           if(res && res.errCode === 0){
               this.setState({
                   genderArr: res.data
               })
           }
          
        }catch(e){
            console.log(e)
        }
    }


    render() {
        let genders = this.state.genderArr
        // console.log('check', this.state)
        return (
            
            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">Thêm mới người dùng</div>
                            <div className="col-3">
                                <lable>Email</lable>
                                <input className="form-control" type="email"/>

                            </div>

                            <div className="col-3">
                                <lable>Password</lable>
                                <input className="form-control" type="password"/>

                            </div>
                            <div className="col-3">
                                <lable>First Name</lable>
                                <input className="form-control" type="text"/>

                            </div>
                            <div className="col-3">
                                <lable>Last Name</lable>
                                <input className="form-control" type="text"/>

                            </div>
                            <div className="col-3">
                                <lable>Phone Number</lable>
                                <input className="form-control" type="text"/>

                            </div>

                            <div className="col-9">
                                <lable>Address</lable>
                                <input className="form-control" type="text"/>

                            </div>
                            <div className="col-3">
                                <lable>Gender</lable>
                                <select className="form-control">
                                    {genders && genders.length > 0 && 
                                    genders.map((item,index) =>{
                                        // console.log(item)
                                        return(
                                            <option key={index}>{item.valueVi}</option>
                                        )
                                    })
                                    }
                                   
                                    
                                    
                                </select>

                            </div>
                            <div className="col-3">
                                <lable>Position</lable>
                                <select className="form-control">
                                    <option selected>Choose..</option>
                                    <option selected>Choose..</option>
                                </select>

                            </div>
                            <div className="col-3">
                                <lable>RoleId</lable>
                                <select className="form-control">
                                    <option selected>Choose..</option>
                                    <option selected>Choose..</option>
                                </select>

                            </div>
                            <div className="col-3">
                                <lable>Image</lable>
                                <input type="text" className="form-control"/>

                            </div>
                            <div className="col-12">
                            <button className="btn btn-primary">Save</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
