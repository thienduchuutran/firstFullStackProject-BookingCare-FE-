import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import {  Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';


class RemedyModal extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    async componentDidMount(){

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
                                <input className='form-control' type='email' value={dataModal.email}/>
                        </div>

                        <div className='col-6 form-group'>
                                <label>Chon file don thuoc</label>
                                <input className='form-control-file' type='file'/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={sendRemedy}>
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
