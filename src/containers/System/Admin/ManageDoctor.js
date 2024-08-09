import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class TableManageUser
            contentMarkdown: '',
            contentHTML: '',
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }
    // Finish!
    handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        alert('click')
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
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
