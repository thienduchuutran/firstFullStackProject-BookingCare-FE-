import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import {toast} from "react-toastify"
import { createNewClinic } from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({                        
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnchangeImage = async (event)=>{
        let data = event.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file)      //encoding the image into base64
            this.setState({
                imageBase64: base64
            })
        }
         
    }

    handleSaveNewClinic = async() => {
        let res = await createNewClinic(this.state)
        if(res && res.errCode === 0){
            toast.success("add new clinic successfully")
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''                
            })
        }else{
            toast.error("somthing wrong try again")
            console.log('check error: ', res)

        }
    }

    render(){ 

        return (    
            <> 
            <div className='manage-specialty-container'>
                <div className='ms-title'>
                    Quan ly phong kham
                </div>
                <div className='btn-add-new-specialty'>

                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Ten phong kham</label>
                        <input className='form-control' type='text' value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event, 'name')}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh phong kham</label>
                        <input className='form-control-file' type='file'
                            onChange={(event)=>this.handleOnchangeImage(event)}
                        />
                    </div>

                    <div className='col-6 form-group'>
                    <label>Dia chi phong kham</label>
                    <input className='form-control' type='text' value={this.state.address}
                        onChange={(event)=>this.handleOnChangeInput(event, 'address')}/>
                    </div>

                    <div className='col-12'>
                    <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}       
                        value={this.state.descriptionMarkdown}
                    />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                                onClick={()=>this.handleSaveNewClinic()}>Save</button>
                    </div>
                </div>


            </div>
            </>   
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
