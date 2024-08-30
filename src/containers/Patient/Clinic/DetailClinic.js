import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodeService, getAllDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { dateFilter } from 'react-bootstrap-table2-filter';
import { LANGUAGES } from '../../../utils';



class DetailClinic extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [],    //this is to be passed into DoctorScedule component to render schedule for each doctor
            dataDetailClinic: []
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id            //this is getting whatever id on the URL of the page

            let res = await getAllDetailClinicById({
                id: id
            })  

            //this is getting a list of provinces


            if(res && res.errCode === 0){
                let data = res.data
                let arrDoctorId = []
                //dynamically loading doctors list
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId) //pushing each doctorId into arrDoctorId since from arrDoctorId we dynamically
                        })                                   // render doctors based on specialty using doctor id
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    getDataDetailSpecialty = () => {

    }

    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    render(){ 
        let {arrDoctorId, dataDetailClinic} = this.state
        let {language} = this.props
        console.log('check state: ', this.state)
        return (    
            <div className='detail-specialty-container'> 
            <HomeHeader/>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                        &&
                        <>
                        <div>
                            {dataDetailClinic.name}
                        </div>
                        <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}>
                                
                        </div>
                        </>
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
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                            // dataTime={dataTime}
                                        />

                                        {/* {dataDetailSpecialty.doctorSpecialty[0].provinceId} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
