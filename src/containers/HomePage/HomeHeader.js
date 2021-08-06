import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
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
                                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>

                            </div>
                            <div className="chid-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="sub-title">Chọn bệnh viện phòng khám</div>

                            </div>

                            <div className="chid-content">
                                <div><b>Bác sĩ</b></div>
                                <div className="sub-title">Chọn bác sĩ giỏi</div>

                            </div>

                            <div className="chid-content">
                                <div><b>Gói khám</b></div>
                                <div className="sub-title">Khám sức khỏe tổng quát</div>

                            </div>


                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle">Hỗ trợ</i>
                            </div>

                            <div className="flag">
                                VN
                            </div>
                        </div>
                    </div>

                </div>

                <div className="home-header-banner">

                    <div className="content-up">
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SỐC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Tìm bác sĩ" />
                        </div>
                    </div>

                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-teeth-open"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>

                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-hospital"></i></div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
