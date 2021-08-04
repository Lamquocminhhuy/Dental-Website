import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ModalUser extends Component {
    //props = properties thuộc tính
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }


    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {

            // console.log('check state: ', copyState);
        })
    }


    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if(isValid === true) {
            //call api create user 
            this.props.createNewUser(this.state);
            


        }
        // console.log('data modal', this.state)

    }
    render() {

        return (
            <Modal

                size="lg"
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}>
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <lable>Email:</lable>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <lable>Passoword:</lable>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <lable>First name:</lable>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <lable>Last name:</lable>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <lable>Address:</lable>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleAddNewUser() }}>Add new</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




