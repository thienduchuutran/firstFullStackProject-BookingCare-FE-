import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import {  Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';



class BookingModal extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    render(){ 
        let {isOpenModal, closeBookingModal, dataTime} = this.props
        let doctorId = ''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
        // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''


        // toggle={}
        return (    
            <Modal 
                isOpen={isOpenModal}  
                centered 
                className={'booking-modal-container'}
                size='lg'

            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            Thong tin dat lich kham benh
                        </span>
                        <span 
                            className='right'
                            onClick={closeBookingModal}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>

                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>


                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Ho ten</label>
                                <input className='form-control'/>
                            </div>

                            <div className='col-6 form-group'>
                                <label>So dien thoai</label>
                                <input className='form-control'/>
                            </div>

                            <div className='col-6 form-group'>
                                <label>Dia chi email</label>
                                <input className='form-control'/>
                            </div>

                            <div className='col-6 form-group'>
                                <label>Dia chi lien he</label>
                                <input className='form-control'/>
                            </div>

                            <div className=' col-12 form-group'>
                                <label>Ly do kham</label>
                                <input className='form-control'/>
                            </div>

                            <div className='col-6 form-group'>
                                <label>Dat cho ai</label>
                                <input className='form-control'/>
                            </div>

                            <div className='col-6 form-group'>
                                <label>Gioi tinh</label>
                                <input className='form-control'/>
                            </div>
                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button 
                            className='btn-booking-confirm'>Xac nhan</button>
                        <button 
                            className='btn-booking-cancel'
                            onClick={closeBookingModal}    
                        >Huy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
