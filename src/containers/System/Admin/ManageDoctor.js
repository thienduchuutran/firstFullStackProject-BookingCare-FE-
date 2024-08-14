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
import { LANGUAGES } from '../../../utils';
import { saveDetailDoctor } from '../../../services/userService';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class TableManageUser
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            listDoctors: []
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length> 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
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
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
    this.setState({                         //save content that user types in for doctor info into state whenever user clicks save button
        contentMarkdown: text,
        contentHTML: html,
    })
    }

    handleSaveContentMarkdown = () => {
        console.log('check selected doctor: ', this.state.selectedDoctor.value)
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
        console.log('checkk state: ', this.state)
    }

    handleChange = (selectedOption) => {
        console.log(selectedOption)
        this.setState({ 
            selectedDoctor: selectedOption
        });
      };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log('check state: ', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                              <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                    </div>


                    <div className='content-right'>
                        <label>Thông tin giới thiệu: </label>
                        <textarea 
                            className='form-control' rows='4'
                            onChange={ (event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
    
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}              //this is when we are passing props into the component MdEditor, so we don't need arrow function here
                    />
                </div>

                <button 
                    className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}      //We need to know which doctor we are saving this content markdown for
                >Lưu thông tin</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
