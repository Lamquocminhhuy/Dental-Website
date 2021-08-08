import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import {FormattedMessage} from 'react-intl';

class HomeHeader extends Component {
    
    
   

    
    render() {



       

        return (
            
            <React.Fragment>
                <div className="home-header-container">

                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>

                        <div className="center-content">
                            <div className="chid-content">
                                <div><b>Chuyên khoa</b></div>
                                <div className="sub-title">Tìm nha sĩ theo dịch vụ</div>

                            </div>
                            <div className="chid-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="sub-title">Chọn phòng khám</div>

                            </div>

                            <div className="chid-content">
                                <div><b>Nha sĩ</b></div>
                                <div className="sub-title">Chọn nha sĩ giỏi</div>

                            </div>

                            <div className="chid-content">
                                <div><b>Gói khám</b></div>
                                <div className="sub-title">Khám tổng quát</div>

                            </div>


                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"><span>Hỗ trợ</span></i>
                                
                            </div>
                            <div className="language-vi">
                                VN
                            </div>
                            <div className="language-en">
                                EN
                            </div>
                        </div>
                    </div>

                </div>

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
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-teeth-open"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>
                               

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>

                        </div>

                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
