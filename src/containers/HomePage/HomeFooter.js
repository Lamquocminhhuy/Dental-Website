import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {

    render() {



        return (
            <div className="home-footer">
                <hr></hr>
                <p>&copy; 2021 Nha Khoa Smile</p>
                <p>Phòng Khám Nha Khoa Smile
999 Đường 3/2, Quận Ninh Kiều ,TP.Cần Thơ</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
