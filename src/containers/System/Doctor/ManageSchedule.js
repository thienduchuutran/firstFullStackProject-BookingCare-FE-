import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

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
            this.setState({
                rangeTime: this.props.allScheduleTime
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

    render() {
        // console.log('check state: ', this.state)
        console.log('check props: ', this.props)
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
                                    Chọn bác sĩ
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Chọn ngày
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
                                            className='btn btn-schedule' 
                                            key={index}
                                        >
                                            {language === LANGUAGES.VI? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                            </div>
                            
                            <div className='col-12'>
                                <button className='btn btn-primary'> Lưu thông tin</button>
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