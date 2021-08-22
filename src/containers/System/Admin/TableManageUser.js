import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import * as actions from "../../../store/actions"
import './TableManageUser.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        // tạo biến
        super(props);
        this.state = {
            userRedux: []

        }
    }
    componentDidMount() {
        //fire redux
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log('check delete user', user)

        this.props.deleteAUserRedux(user.id);
        
    }

    handleEditUser = (user) =>{
        // call function from parent (UserRedux)
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
       



        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                
            <table id="TableManageUser">
                 
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>


                    {arrUsers && arrUsers.map((item, index) => {

                        return (
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}



                </tbody>
            </table>
            
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {

        listusers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) =>dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
