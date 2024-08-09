import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class TableManageUser
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
    this.setState({                         //save content that user types in for doctor info into state whenever user clicks save button
        contentMarkdown: text,
        contentHTML: html,
    })
    console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
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
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                              <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={options}
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
