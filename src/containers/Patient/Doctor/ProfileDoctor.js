import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { lang } from 'moment';
import DoctorExtra from './DoctorExtra';
import NumberFormat from 'react-number-format';

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
            this.getInfoDoctor(this.props.doctorId)
        }
         
    }

    renderTimeBooking = (dataTime) => {
        return (
            <>
                <div>4 - 5 pm, thu 7</div>
                <div>Mien phi dat lich</div>
            </>
        )
    }

    render(){ 
        console.log(this.state)
        let {dataProfile} = this.state
        let {language, isShowDescriptionDoctor, dataTime} = this.props

        let nameVi = '', nameEn = ''
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        console.log('check state: ', dataProfile)
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
                            {this.renderTimeBooking()}
                        </>
                        }

                    </div>
                </div>
            </div>
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
