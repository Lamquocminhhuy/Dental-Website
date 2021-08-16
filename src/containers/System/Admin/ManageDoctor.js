import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { thisExpression } from '@babel/types';


const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {

    constructor(props) {
        // tạo biến
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '', 
            listDoctors: []


        }
    }
    componentDidMount() {
        //fire redux
        this.props.fetchAllDoctor();

    }


    buildDataInputSelect = (inputData) =>{
        let result = [];
     
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                
                object.lable = `${item.lastName} ${item.firstName}`;
                object.value = item.id;
                
                result.push(object);
            })
           
        }
        return result;
       

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect, 
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }



    handleSaveContentMarkdown = () => {
        console.log('ok')
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })

    }
    render() {
        
        console.log('check state', this.state.listDoctors)


      

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Thêm thông tin bác sĩ</div>
                <div className="more-infor">
                    <div className="content-left form-group">

                        <lable>Chọn bác sĩ </lable>
                        <Select
                          
                            value={this.state.selectOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>

                    <div className="content-right form-group">
                        <lable>Thông tin giới thiệu</lable>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>


                    </div>

                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className="save-content-doctor"


                >Save</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {

        allDoctors: state.admin.allDoctor,
    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
