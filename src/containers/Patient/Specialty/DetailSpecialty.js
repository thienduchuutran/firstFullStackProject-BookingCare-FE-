import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById } from '../../../services/userService';
import _ from 'lodash';



class DefaultClass extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [10, 9 , 8],    //this is to be passed into DoctorScedule component to render schedule for each doctor
            dataDetailSpecialty: []
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id            //this is getting whatever id on the URL of the page

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            if(res && res.errCode === 0){
                this.setState({
                    dataDetailSpecialty: res.data,
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    render(){ 
        let {arrDoctorId, dataDetailSpecialty} = this.state
        console.log('check state: ', this.state)
        return (    
            <div className='detail-specialty-container'> 
            <HomeHeader/>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        &&
                        <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}>
                                
                        </div>
                        }
                        
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index)=> {
                        return(
                            <div className='each-doctor' key={index}>
                                <div className='dt-content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            // dataTime={dataTime}
                                        />
                                    </div>

                                </div>
                                <div className='dt-content-right'>
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
