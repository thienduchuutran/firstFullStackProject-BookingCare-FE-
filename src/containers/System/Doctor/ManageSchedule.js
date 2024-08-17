import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props){
        super(props)

        // const currentDate = new Date()
        // currentDate.setHours(0, 0, 0, 0)

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '', //this is because we using onChange in DatePicker, so we need a state to save the value
            rangeTime: []
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime
            if(data && data.length > 0){
                // data = data.map((item)=>{
                //     item.isSelected = false
                //     return item
                // })

                data = data.map(item =>({...item, isSelected: false}))           //looping through all the appointments' times options, assign isSelected = false for each option
            }
            this.setState({
                rangeTime: data
            })
        }

        // if(prevProps.language !== this.props.language){                        //need this so the options in the drop down switch from eng format to viet format whenever change language
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }


    buildDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length> 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ 
            selectedDoctor: selectedOption
        });
      };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time)=>{
        let {rangeTime} = this.state
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected          //looping through the array of time options, if the option id looped = the option id selected
                return item                                                         //then assign its isSelected value = the opposite value
            })   
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async()=> {
        let {rangeTime, selectedDoctor, currentDate} = this.state
        let result = []

        //validate date and doctor picks
        if(!currentDate){
            toast.error('Invalid date!')
            return
        }

        if(selectedDoctor && _.isEmpty(selectedDoctor)){    
            toast.error('invalid doctor selected!')
            return
        }

        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)   //not to hardcode, re-format the timestand, sending to backend as string
        // let formattedDate = moment(currentDate).unix()                                 //sending to backend as timestamp
        let formattedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0){                                 //to put all the selected time (with isSelected = true) into a seperate array
            let selectedTime = rangeTime.filter(item=> item.isSelected === true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedDoctor.value //which is doctor id
                    object.date = formattedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            }else{
                toast.error('invalid selected time!')
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        })

        if(res.errCode === 0){
            if(res.errMessage === 'already saved!'){
                toast.info('already saved!')
            }else if(res.errMessage === 'Ok'){
                toast.success('successfully')
            }
        }
    }

    render() {
        console.log('check state: ', this.state)
        // console.log('check props: ', this.props)
        let {rangeTime} = this.state
        let {language} = this.props

        return (        //We only want the header component here because we only wanna see it in the user manage page
            <React.Fragment>   
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id='manage-schedule.title'/>
                    </div>    

                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor"/>
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date"/>
                                </label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate}
                                        minDate={new Date()}
                                        // selected={this.state.currentDate}
                                    />
                            </div>

                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0
                                && rangeTime.map((item, index) => {
                                    return(
                                        <button 
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule' }
                                            key={index}
                                            onClick={()=>this.handleClickBtnTime(item)}             //if we pass a parameter, it's gonna pass the click event as an object, not the actual item
                                        >
                                            {language === LANGUAGES.VI? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                            </div>
                            
                            <div className='col-12'>
                                <button 
                                    onClick={()=> this.handleSaveSchedule()}
                                    className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.save"/>
                                </button>
                            </div>
                        </div>
                    </div>        
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
