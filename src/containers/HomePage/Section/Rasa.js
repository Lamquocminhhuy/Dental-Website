import React, { Component } from 'react';
import { connect } from 'react-redux';
import Widget from 'rasa-webchat';

class Rasa extends Component {

    render() {
 
        
        return (
            <div>
                <Widget
              initPayload={"/greet"}
              socketUrl={"http://localhost:5005"}
              socketPath={"/socket.io/"}
              customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
              title={"Bot nè cụ"}
              showMessageDate={true}
            />    
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
export default connect(mapStateToProps, mapDispatchToProps)(Rasa);
