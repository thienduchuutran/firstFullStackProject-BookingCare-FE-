import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
// import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import reactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state={
            allDays: [],
            allAvailableTime: []
        }
    }

    async componentDidMount(){
        let {language} = this.props

        // console.log('moment viet: ', moment(new Date()).format('dddd - DD/MM'))                   
        // console.log('moment eng: ', moment(new Date()).locale('en').format('ddd - DD/MM'))      //since we imported localization, now it prioritizes viet, so
        //                                                                                         //if we wanna switch back to english, gotta use locale('en')
        let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays,
            })
    }

    //doing this so it looks clean in componentDidMount and componentDidUpdate
    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 8 ; i++){
            let object = {}
            if(language === LANGUAGES.VI){
                if(i=== 0){
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }else{
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')         //new Date() is today, inside the format() we have dddd to display "thứ"
                }
            }else{
                if(i === 0){
                    let ddMM = moment(new Date()).format('MM/DD')
                    let today = `Today - ${ddMM}`
                    object.label = today                    
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - MM/DD')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()       //add(i, 'days') to go through all weekdays, startOf('day') is
                                                                                            // getting the first hour of the day, valueOf() converting to Unix time in milliseconds
            allDays.push(object)
        }
        return allDays
    }

    async componentDidUpdate(prevProps, prevState, snapshot){                             //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays,
            })
        }
        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }         
    }

    handleOnChangeSelect = async(event) => {

        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check res from react: ', res)

            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data? res.data : []       //since the data is holding all the timestamp
                })
            }
        }
    }
    


    render(){  
        // let options = [
        //     {label: 'Thứ 2', value: '2'},
        //     {label: 'Thứ 2', value: '2'},
        //     {label: 'Thứ 2', value: '2'},
        // ]

        // const customStyles = {
        //     control: () => ({
        //         width: 200,
        //     })
        // }

        let {allDays, allAvailableTime} = this.state
        let {language} = this.props
        return (
            <>  
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        {/* <Select                             //import this library to have options dropdown
                            options={options}
                            styles={customStyles}
                        /> */}

                        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0
                            && allDays.map((item, index)=>{
                                return(
                                    <option
                                        value={item.value}     //its value is timestamp, label's value is the one that gets shown on UI
                                        key={index}
                                    > 
                                        {item.label}             
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule"/></span></i>
                        </div>

                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                            <React.Fragment>
                                <div className='time-content-btns'>
                                    {allAvailableTime.map((item, index)=>{
                                    let timeDisplay = language === LANGUAGES.VI? 
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return(
                                        <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>{timeDisplay}</button>
                                        )
                                    })
                                    }
                                </div>

                            <div className='book-free'>
                                <span><FormattedMessage id="patient.detail-doctor.choose"/> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free"/></span>
                            </div>
                            </React.Fragment>
                        :
                            <div className='no-schedule'>
                                <FormattedMessage id='patient.detail-doctor.no-schedule'/>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <BookingModal />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
