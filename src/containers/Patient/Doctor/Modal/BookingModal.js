import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import {  Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'


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
            selectedGender: '',
            doctorId: '',
            genders: '',
        }
    }

    async componentDidMount(){
        this.props.getGenders()
    }

    builtDataGender = (data) => {
        let result = []
        let language = this.props.language

        if(data && data.length > 0){
            data.map(item=> {
                if(item.keyMap !== 'O'){
                    let object = {}
                    object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    object.value = item.keyMap
                    result.push(object)
                }
            })
        }
        return result
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.builtDataGender(this.props.genders)
            })
        }  

        //need this so that the gender options be rendered the first time 
        if(this.props.genders !== prevProps.genders){
            this.setState({
                genders: this.builtDataGender(this.props.genders)
            })
        }

        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId
                this.setState({
                    doctorId: doctorId
                })
            }            
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

    handleChangeSelect = (selectedOption) => {
        this.setState({selectedGender: selectedOption})
    }

    handleConfirmBooking = () => {
        console.log('check state: ', this.state)
    }
    render(){ 
        let {isOpenModal, closeBookingModal, dataTime} = this.props
        let doctorId = ''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
        // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''

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
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}    
                                />
                            </div>
                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button 
                            className='btn-booking-confirm'
                            onClick={()=>this.handleConfirmBooking()}    
                        >Xac nhan</button>
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
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
