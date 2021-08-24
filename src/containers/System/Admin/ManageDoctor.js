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

            // markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],



            // infor table
            listPrice: [],
            listPayment: [],
            listAddress: [],
            selectectedPrice: '',
            selectectedPayment: '',
            selectectedAddress: '',
            note: ''


        }
    }
    componentDidMount() {
        //fire redux
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();

    }


    buildDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    object.value = item.id;
                    object.label = `${item.lastName} ${item.firstName}`;

                    result.push(object);
                })
            }
            if (type === 'PRICE' || type === 'PAYMENT' || type === 'ADDRESS') {
                inputData.map((item, index) => {
                    let object = {};
                    object.value = item.keyMap;
                    object.label = item.valueVi;

                    result.push(object);
                })
            }



        }
        return result;



    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resAddress } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectAdress = this.buildDataInputSelect(resAddress, 'ADDRESS')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listAddress: dataSelectAdress,
            })
            console.log(dataSelectPrice, dataSelectPayment, dataSelectAdress)
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
            doctorId: this.state.selectedOption.value,
            selectectedPrice: this.state.selectectedPrice.value,
            selectectedPayment: this.state.selectectedPayment.value,
            selectectedAddress: this.state.selectectedAddress.value,
            note: this.state.note,

        })

    }

    handleChangeSelect = async (selectedOption, name) => {
        this.setState({ selectedOption });
        let {listPayment, listAddress, listPrice} = this.state;
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let selectectedPrice = '', selectectedPayment = '' , 
            selectectedAddress = '', note = '',paymentId='',addressId='',priceId=''

            let finditem = listPayment.find
            if(res.data.Doctor_Infor.priceId){
           
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                addressId = res.data.Doctor_Infor.addressId;

                 selectectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                 selectectedAddress = listAddress.find(item => {
                    return item && item.value === addressId
                })

       

            }



            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                note:note,
                selectectedPrice:selectectedPrice,
                selectectedPayment:selectectedPayment,
                selectectedAddress:selectectedAddress

            })
        } else {
            this.setState({
                contentMarkdown: "Nhập thông tin",
                contentHTML: '',
                description: '',

            })
        }
    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        })
        console.log('check name', selectedOption, stateName)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }
    render() {
        console.log('check state', this.state)
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
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>

                    <div className="content-right form-group">
                        <lable>Thông tin giới thiệu</lable>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>


                    </div>


                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <lable>Chon giá</lable>
                        <Select

                            value={this.state.selectectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            name="selectectedPrice"
                            placeholder={'Chọn giá'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <lable>Chọn phương thức thanh toán</lable>
                        <Select

                            value={this.state.selectectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name="selectectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <lable>Chọn địa chỉ</lable>
                        <Select

                            value={this.state.selectectedAddress}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listAddress}
                            placeholder={'Chọn địa chỉ'}
                            name="selectectedAddress"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <lable>Note</lable>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
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
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
