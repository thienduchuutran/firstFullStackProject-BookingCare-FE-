import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { dateFilter } from 'react-bootstrap-table2-filter';
import { LANGUAGES } from '../../../utils';



class DefaultClass extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [],    //this is to be passed into DoctorScedule component to render schedule for each doctor
            dataDetailSpecialty: [],
            listProvince: []
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id            //this is getting whatever id on the URL of the page

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })  

            //this is getting a list of provinces
            let resProvince = await getAllCodeService('PROVINCE')
            console.log('check res province: ', resProvince.data)

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data
                let arrDoctorId = []
                //dynamically loading doctors list
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId) //pushing each doctorId into arrDoctorId since from arrDoctorId we dynamically
                        })                                   // render doctors based on specialty using doctor id
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    handleOnChangeSelect = (event) =>  {
        console.log('check onchange event: ', event.target.value)
    }

    render(){ 
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state
        let {language} = this.props
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

                    <div className='search-sp-doctor'>
                        <select onChange={(event)=> this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0
                            && listProvince.map((item, index)=>{
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })}
                        </select>
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
