import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtra.scss'
// import Select from 'react-select';

import { getScheduleDoctorByDate, getExtraInfoDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import reactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';


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

        return (    
            <> 
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            DIA CHI KHAM
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
                                GIÁ KHÁM: 
                                {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.valueVi : ''}<span onClick={()=> this.showHideDetailInfo()}> xem chi tiet</span>
                            </div>                        
                        }


                        {isShowDetailInfo && 
                        <>
                            <div className='title-price'>GIA KHAM</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>
                                        Gia kham
                                    </span>
                                        
                                    <span className='right'>
                                        250k
                                    </span>
                                </div>
                                <div className='note'>
                                    duoc uu tien kham truoc 
                                </div>
                            </div>
                            <div className='payment'>
                                Nguoi benh co the thanh toan chi phi bang tien mat va quet the
                            </div>
                            <div className='hide-price'>
                                <span onClick={()=> this.showHideDetailInfo()}>
                                    An bang gia
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
