import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';




class DefaultClass extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [10, 9 , 8]    //this is to be passed into DoctorScedule component to render schedule for each doctor
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    render(){ 
        let {arrDoctorId} = this.state
        return (    
            <div className='detail-specialty-container'> 
            <HomeHeader/>
            <div className='description-specialty'>
                
            </div>
            {arrDoctorId && arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index)=> {
                return(
                    <div className='each-doctor' key={index}>
                        <div className='content-left'>

                        </div>
                        <div className='content-right'>
                            <div className='doctor-schedule'>
                            <DoctorSchedule
                                doctorIdFromParent={item}
                                
                            />
                            </div>

                            <div className='doctor-extra-info'>
                            <DoctorExtra
                                doctorIdFromParent={item}
                            />
                            </div>

                        </div>
                    </div>

                )
            })}
            


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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
