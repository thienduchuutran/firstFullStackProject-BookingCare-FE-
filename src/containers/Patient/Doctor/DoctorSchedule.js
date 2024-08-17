import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
// import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'

import { LANGUAGES } from '../../../utils';


class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state={
            allDays: []
        }
    }

    async componentDidMount(){
        let {language} = this.props

        console.log('moment viet: ', moment(new Date()).format('dddd - DD/MM'))                   
        console.log('moment eng: ', moment(new Date()).locale('en').format('ddd - DD/MM'))      //since we imported localization, now it prioritizes viet, so
                                                                                                //if we wanna switch back to english, gotta use locale('en')
        this.setArrays(language)
    }

    //doing this so it looks clean in componentDidMount and componentDidUpdate
    setArrays = (language) => {
        let allDays = []
        for (let i = 0; i < 8 ; i++){
            let object = {}
            if(language === LANGUAGES.VI){
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')         //new Date() is today, inside the format() we have dddd to display "thứ"
            }else{
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - MM/DD')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()       //add(i, 'days') to go through all weekdays, startOf('day') is
                                                                                            // getting the first hour of the day, valueOf() converting to Unix time in milliseconds
            allDays.push(object)
        }

        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){                             //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){
            this.setArrays(this.props.language)
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

        let {allDays} = this.state
        return (        
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    {/* <Select                             //import this library to have options dropdown
                        options={options}
                        styles={customStyles}
                    /> */}

                    <select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
