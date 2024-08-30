import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { dateFilter } from 'react-bootstrap-table2-filter';
import { LANGUAGES } from '../../../utils';



class DetailClinic extends Component {
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

                let dataProvince = resProvince.data
                let result = []
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "National",
                        valueVi: "Toàn quốc"
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
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

    //this is to determine what province id the user just clicks on
    handleOnChangeSelect = async (event) =>  {
        //this is to get the prop (id) on URL which is the id of the specialty
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let location = event.target.value   //this is province Id

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            })  

            if(res && res.errCode === 0){
                let data = res.data
                let arrDoctorId = []
                //dynamically getting doctors list
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId) //pushing each doctorId into arrDoctorId since from arrDoctorId we dynamically
                        })                                   // render doctors based on specialty using doctor id
                    }
                }
                
                //updating the state arrDoctorId based on location
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
    }
}

    render(){ 
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state
        let {language} = this.props
        console.log('state: ', this.state)
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
