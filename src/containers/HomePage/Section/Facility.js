import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Facility.scss'
import Slider from 'react-slick';

class Facility extends Component {

    render() {
       
       

        return (
            <div className="section-share section-facility">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">Cơ sở nổi bật</span>
                <button  className="btn-section">Xem thêm</button>
              </div>
              <div className="section-body">
                <Slider {...this.props.settings}> 
                  <div className="section-customize">
                    <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
                  <div className="section-customize">
                  <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
                  <div className="section-customize">
                  <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
                  <div className="section-customize">
                  <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
                  <div className="section-customize">
                  <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
                  <div className="section-customize">
                  <div className="bg-image section-facility"></div>
                    <div>Nha khoa test</div>
                  </div >
    
    
                </Slider>
              </div>
    
            </div>
    
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
