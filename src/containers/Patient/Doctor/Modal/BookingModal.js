import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import {  Modal } from 'reactstrap';




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
        let {isOpenModal, closeBookingModal} = this.props
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

                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xac nhan</button>
                        <button className='btn-booking-cancel'>Huy</button>
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
