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
        // toggle={}
        return (    
            <Modal isOpen={true}  centered className={'booking-modal-container'}
                size='lg'
            >
                <div
                    style={{height: '100px'}}
                > inside modal</div>
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
