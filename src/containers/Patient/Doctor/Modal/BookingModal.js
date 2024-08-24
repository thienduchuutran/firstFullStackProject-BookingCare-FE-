import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import {  Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';



class BookingModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: ''
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    handleOnChangeInput = (event, id)=> {
        let valueInput = event.target.value 
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date)=> {
        this.setState({
            birthday: date[0]
        })
    }

    render(){ 
        let {isOpenModal, closeBookingModal, dataTime} = this.props
        let doctorId = ''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
        // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''

        console.log('check state: ', this.state)
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
                                <input 
                                    className='form-control'
                                    value={this.state.fullName}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'fullName')} 
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>So dien thoai</label>
                                <input 
                                    className='form-control'
                                    value={this.state.phoneNumber}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'phoneNumber')}                                     
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Dia chi email</label>
                                <input 
                                    className='form-control'
                                    value={this.state.email}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'email')}                                     
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Dia chi lien he</label>
                                <input 
                                    className='form-control'
                                    value={this.state.address}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'address')}                                     
                                />
                            </div>

                            <div className=' col-12 form-group'>
                                <label>Ly do kham</label>
                                <input 
                                    className='form-control'
                                    value={this.state.reason}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'reason')}                                     
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Ngay sinh</label>
                                <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate}
                                        // selected={this.state.currentDate}
                                    />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Gioi tinh</label>
                                <input 
                                    className='form-control'
                                    value={this.state.gender}   
                                    onChange={(event)=>this.handleOnChangeInput(event, 'fullName')}                                     
                                />
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
