import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { scroller } from "react-scroll";
import { withRouter } from "react-router";

import {
    ScrollingProvider,
    useScrollSection,
    Section,
  } from 'react-scroll-section';
class HomeHeader extends Component {
    
    
   

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    
    scrollToSection = () => {
        scroller.scrollTo("service", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      };

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
                                <div><b>Nha sĩ</b></div>
                             

                            </div>

                            <div className="chid-content">
                                <div><b>Về chúng tôi</b></div>
                             

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
                        <div className="title1">NHA KHOA SMILE</div>
                        <div className="title2">PHÒNG KHÁM NHA KHOA ĐẠT CHUẨN QUỐC TẾ</div>
                        {/* <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm nha sĩ" />
                        </div> */}
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
