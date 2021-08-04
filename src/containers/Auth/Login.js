import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi }  from '../../services/userService'
// import { userLoginSuccess } from '../../store/actions';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
           
        }
     
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,  
        }) 
        
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });

        try{
           let data =  await handleLoginApi(this.state.username, this.state.password);
           console.log(data);
           if(data && data.errCode === 0){
          
            this.props.userLoginSuccess(data.user) 
            }
           if(data && data.errCode !==0){
               this.setState({
                   errMessage: data.message
                })

           }
           
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                
                        errMessage: error.response.data.message
                    })
                }
            }
           
        }
        
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }
    render() {
        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text"><h1>Login</h1></div>
                        <div className="col-12 form-group login-input">
                            <lable>Username:</lable>
                            <input value={this.state.username}
                             placeholder="Enter your username"
                              type="text" className="form-control"
                              onChange={(event) => this.handleOnChangeUsername(event)}
                             />
                        </div>

                        <div className="col-12 form-group login-input">
                            <lable>Password:</lable>

                            <div className="custom-input-password">
                            <input  value={this.state.password} 
                            placeholder="Enter your password" 
                            type={this.state.isShowPassword ? 'text' : 'password'}
                            className="form-control"
                            onChange={(event) => this.handleOnChangePassword(event)}
                             />
                            <span
                                onClick={() => {this.handleShowHidePassword()}}
                            >
                                <i className={this.state.isShowPassword ? 'far fa-eye icon-eyes ie' : 'far fa-eye-slash ie'}></i></span>
                            
                            </div>
                           
                        </div>

                        <div className="col-12" style={{ color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login" onClick={()=>{this.handleLogin()}  }>Login</button>
                           
                        </div>
                        
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                           
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-orther-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                         
                        </div>
                    </div>

                </div>
            </div>
           
            ) 
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
