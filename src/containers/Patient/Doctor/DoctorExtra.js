import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtra.scss'
// import Select from 'react-select';

import { getScheduleDoctorByDate, getExtraInfoDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import reactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';


class DoctorExtra extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }

        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if(res && res.errCode === 0){
                this.setState({
                    extraInfo: res.data
                })
            }

        }   
         
    }
    
    showHideDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo
        })
    }


    render(){  
        let {isShowDetailInfo, extraInfo} = this.state
        let {language} = this.props

        return (    
            <> 
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                        <FormattedMessage id="patient.extra-info-doctor.text-address"/>
                        </div>
                        <div className='name-clinic'>
                            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                        </div>
                        <div className='detail-address'>
                            {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                        </div>
                    </div>

                    <div className='content-down'>
                        {isShowDetailInfo === false && 
                            <div className='short-info'>
                                <FormattedMessage id="patient.extra-info-doctor.price"/> 
                            {extraInfo && extraInfo.priceTypeData &&
                                language === LANGUAGES.VI && 
                                <NumberFormat 
                                    value={extraInfo.priceTypeData.valueVi} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix={'VND'} 
                                    className='currency'
                                />
                            }

                            {extraInfo && extraInfo.priceTypeData &&
                                language === LANGUAGES.EN && 
                                <NumberFormat 
                                    value={extraInfo.priceTypeData.valueEn} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'} 
                                    className='currency'
                                />
                            }
                                <span className='detail' onClick={()=> this.showHideDetailInfo()}> <FormattedMessage id="patient.extra-info-doctor.detail"/></span>
                            </div>                        
                        }


                        {isShowDetailInfo && 
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-info-doctor.price"/></div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-info-doctor.price"/>
                                    </span>
                                        
                                    <span className='right'>
                                    {extraInfo && extraInfo.priceTypeData &&
                                        language === LANGUAGES.VI && 
                                        <NumberFormat 
                                            value={extraInfo.priceTypeData.valueVi} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            suffix={'VND'} 
                                            className='currency'
                                        />
                                    }

                                    {extraInfo && extraInfo.priceTypeData &&
                                        language === LANGUAGES.EN && 
                                        <NumberFormat 
                                            value={extraInfo.priceTypeData.valueEn} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            prefix={'$'} 
                                            className='currency'
                                        />
                                    }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-info-doctor.payment"/>
                                {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI ? extraInfo.paymentTypeData.valueVi : ''}
                                {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN ? extraInfo.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={()=> this.showHideDetailInfo()}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price"/>
                                </span>
                            </div>        
                        </>            
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
