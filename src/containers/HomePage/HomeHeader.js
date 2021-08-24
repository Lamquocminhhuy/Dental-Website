import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'

import { withRouter } from "react-router";
class HomeHeader extends Component {
    
    
   

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        return (   
            <React.Fragment>
                <div className="home-header-container">

                    <div className="home-header-content">
                        <div className="left-content">
                            {/* <i className="fas fa-bars"></i> */}
                            <div className="header-logo"
                            onClick={() => this.returnToHome()}
                            ></div>
                        </div>

                        <div className="center-content">
                            <div className="chid-content">
                                <div><b>Dịch vụ</b></div>
                         

                            </div>
                            <div className="chid-content">
                                <div><b>Cơ sở y tế</b></div>
                       

                            </div>

                            <div className="chid-content">
                                <div><b>Nha sĩ</b></div>
                             

                            </div>

                            <div className="chid-content">
                                <div><b>Gói khám</b></div>
                             

                            </div>


                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"><span>Hỗ trợ</span></i>
                                
                            </div>
                         
                        </div>
                    </div>

                </div>
                {this.props.isShowBanner === true &&
                <div className="home-header-banner">

                    <div className="content-up">
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SỐC SỨC KHỎE RĂNG MIỆNG</div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm nha sĩ" />
                        </div>
                    </div>

                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-notes-medical"></i></div>
                                <div className="text-child">Dịch vụ phổ biên</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-users"></i></div>
                                <div className="text-child">Đội ngũ nha sĩ</div>
                               

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Cơ sở y tế</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-book"></i></div>
                                <div className="text-child">Cẩm nang</div>

                            </div>
                        </div>

                    </div>

                </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
