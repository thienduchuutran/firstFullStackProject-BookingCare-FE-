import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { lang } from 'moment';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { saveDetailDoctor } from '../../../services/userService';

import { getDetailInfoDoctor } from '../../../services/userService';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {  
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '', //this is to pass down to db
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
            
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfo()
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length> 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn
                object.label = language === LANGUAGES.VI? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.language !== this.props.language){                        //need this so the options in the drop down switch from eng format to viet format whenever change language
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)

            console.log('checking: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,                
            })
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
    this.setState({                         //save content that user types in for doctor info into state whenever user clicks save button
        contentMarkdown: text,
        contentHTML: html,
    })
    }

    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('checkk state: ', this.state)
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ 
            selectedDoctor: selectedOption
        });

        let res = await getDetailInfoDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description, 
                hasOldData: true               
            })
        }
        else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        console.log('check res select: ', res)
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        console.log('check new select on change: ', selectedOption, name)

        let stateName = name.name
        let stateCopy = {...this.state}
        stateCopy[stateName] = selectedOption

        this.setState({
            // selectedPrice: selectedOption.label, 
            // selectedPayment: selectedOption.label,
            // selectedProvince: selectedOption.label 
            ...stateCopy           
        })
        console.log('check state: ', this.state)
    }

    
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let {hasOldData} = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title"/></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                              <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={"Chọn bác sĩ"}
                                />
                    </div>


                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/> </label>
                        <textarea 
                            className='form-control'
                            onChange={ (event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
    
                        </textarea>
                    </div>

                </div>

                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={"Chọn giá"}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={"Chọn phương thức thanh toán"}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={"Chọn tỉnh thành"}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control'/>
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}              //this is when we are passing props into the component MdEditor, so we don't need arrow function here
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button 
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}      //We need to know which doctor we are saving this content markdown for
                >
                    {hasOldData === true? 
                <span>
                    <FormattedMessage id="admin.manage-doctor.save"/>
                </span>
                :
                <span>
                    <FormattedMessage id="admin.manage-doctor.add"/>
                </span>  
                }
                    </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
