import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Facility from './Section/Facility'
import Doctor from './Section/Doctor'
import Handbook from './Section/Handbook';
import Widget from './Section/Rasa';
import './Homepage.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
      
          };
       

        return (
            <div>
                <HomeHeader/>
                <Specialty 
                settings={settings}/>
                <Facility 
                settings={settings}/>
                <Doctor 
                settings={settings}/>
                <Handbook 
                settings={settings}/>
                <Widget/>
            
            
                
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
