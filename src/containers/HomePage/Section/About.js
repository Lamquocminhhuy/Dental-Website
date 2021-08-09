import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {

    render() {



        return (
            <div className="section-share section-about">
                This is about

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
