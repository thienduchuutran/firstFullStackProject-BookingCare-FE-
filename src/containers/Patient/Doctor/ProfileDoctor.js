import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import DoctorExtra from './DoctorExtra';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount(){
        //this is to get the info and assign to state
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async(id) => {
        let result = {}
        if(id){

            let res = await getProfileDoctorById(id)
            if(res && res.errCode === 0){
                result = res.data
            }
        }
        return result
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }
        
        if(this.props.doctorId !== prevProps.doctorId){
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
              dataProfile: data,
            });
        }
         
    }

    renderTimeBooking = (dataTime) => {
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ? 
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY').toUpperCase() //converting a string to JS date type
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')   //the plus sign is to convert from string to integer then divide by 1000 to switch from milliseconds to seconds
            return (
                <>
                    <div>{time}, {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.price-booking"/></div>
                </>
            )
        }
    }

    render(){ 
        let {dataProfile} = this.state
        let {language, isShowDescriptionDoctor, dataTime, isShowPrice, isShowLinkDetail, doctorId} = this.props


        let nameVi = '', nameEn = ''
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        return (    

        <div className='profile-doctor-container'>
            <div className='intro-doctor'>
                <div className='content-left' style={{backgroundImage: `url(${dataProfile && dataProfile.image? dataProfile.image : ''})`}}>

                </div>

                <div className='content-right'>
                    <div className='up'>
                        {language === LANGUAGES.VI? nameVi : nameEn}
                    </div>
                    <div className='down'>
                        {isShowDescriptionDoctor === true ?
                        <>
                            {dataProfile.Markdown && dataProfile.Markdown.description
                            && <span>
                                {dataProfile.Markdown.description}
                            </span>
                            }
                        </>
                        :
                        <>
                            {this.renderTimeBooking(dataTime)}
                        </>
                        }

                    </div>
                </div>
            </div>
            {isShowLinkDetail === true && 
            <div className='view-detail-doctor'
            >
                <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
            </div>}

            {isShowPrice && 
            <div className='price'>
            <FormattedMessage id='patient.extra-info-doctor.price'/>
                {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ?
                    <NumberFormat 
                    value={dataProfile.Doctor_Info.priceTypeData.valueVi} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    suffix={'VND'} 
                    className='currency'
                /> : ''        
                }
                {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN ?
                    <NumberFormat 
                    value={dataProfile.Doctor_Info.priceTypeData.valueEn} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    className='currency'
                /> : ''       
                }
            </div>            
            }

        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
