import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService'; 




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
                object.value = item.id;
                object.label = `${item.lastName} ${item.firstName}`;
                 
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
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value

        })
        
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,

            })
        }else{
            this.setState({
                contentMarkdown: "Nhập thông tin",
                contentHTML: '',
                description: '',
                
            })
        }
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })

    }
    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Thêm thông tin bác sĩ</div>
                <div className="more-infor">
                    <div className="content-left form-group">

                        <lable>Chọn bác sĩ </lable>
                        <Select
                          
                            value={this.state.selectOption}
                            onChange={this.handleChangeSelect}
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
                        value={this.state.contentMarkdown}
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
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data))
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
