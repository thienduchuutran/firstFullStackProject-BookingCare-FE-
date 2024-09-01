import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import {  Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            imgBase64: '',  //these 2 states are for this child RemedyModal component to manage, placing less burden on its parent component ManagePatient
        }
    }

    async componentDidMount(){
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email       //if a user changes their email, the email showing up in the modal is also changed
            })
        }

    }     
    
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value       //this is so that the doctor can easily directly change patient email in the modal
        })
    }

    handleOnchangeImage = async (event)=>{      //this is to directly change uploaded file
        let data = event.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file)      //encoding the image into base64
            this.setState({
                imgBase64: base64
            })
        }
         
    }

    handleSendRemedy = ()=> {
        this.props.sendRemedy(this.state)       //passing states, email and imgBase64, of this child component back to its parent component, ManagePatient
    }

    render(){ 
        let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props

        return (    
            <Modal 
                isOpen={isOpenModal}  
                centered 
                className={'booking-modal-container'}
                size='lg'

            >
                <div className='modal-header'>
                    <h5 className='modal-title'>
                        Gui hoa don kham benh thanh cong
                    </h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden="true">
                            x
                        </span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                                <label>Email benh nhan</label>
                                <input className='form-control' type='email' value={this.state.email}
                                        onChange={(event)=>this.handleOnchangeEmail(event)}        
                                />
                        </div>

                        <div className='col-6 form-group'>
                                <label>Chon file don thuoc</label>
                                <input className='form-control-file' type='file'
                                onChange={(event)=>this.handleOnchangeImage(event)}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={()=>this.handleSendRemedy()}>     {/*When we have ()=>, the function ain't get mounted until we click, otherwise, the function gets mounted right when component be rerendered */}
                    Send
                </Button>{' '}
                <Button color="secondary" onClick={closeRemedyModal}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
