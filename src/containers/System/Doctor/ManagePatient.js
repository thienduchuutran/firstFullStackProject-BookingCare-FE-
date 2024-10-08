import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate, FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment, { lang } from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';



class ManagePatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            //assign today's date for currentDate so that it shows up on datePicker as today, and we 
            //don't want it to also get the exact hour minute and second, just the date so we can't use
            //new Date()
            currentDate:  moment(new Date()).startOf('day').valueOf(), 
            dataPatient: [],        //this is the list of patient to show on table
            isOpenRemedyModal: false,
            dataModal: {},               //to get individual patient data
            isShowLoading: false
        }                        
    }

    async componentDidMount(){

        this.getDataPatient()   
    }

    //getting list of patient based on a selected date and selected doctor
    getDataPatient = async() => {
        let {user} = this.props
        let {currentDate} = this.state
        let formattedDate = new Date(currentDate).getTime()
        
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate

        })

        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    //this is to display the wanted date whenever we pick a date on datePicker
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async ()=>{
            await this.getDataPatient()             
        })          //making the page re-render the patient list every time we onChange the date
    }

    handleBtnConfirm = (item)=> {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })        
    }

    sendRemedy = async (dataChild) =>{
        let {dataModal} = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,                //passing imgBase64 and email states
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })

        if(res && res.errCode === 0){
            this.setState({isShowLoading: false})
            toast.success('Sent remedy successfully')
            await this.getDataPatient()                //this is to fetch the table of patient list   
            this.closeRemedyModal()                    // immediately
        }else{
            this.setState({isShowLoading: false})
            toast.error('Something wrong...')
        }
    }

    render(){ 
        let {dataPatient, isOpenRemedyModal, dataModal} = this.state
        let {language} = this.props
        return (    
            <> 
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading your content...'
            >
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quan ly benh nhan kham benh
                </div>

                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chon ngay kham</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}
                                            // selected={this.state.currentDate}
                        />
                    </div>

                    <div className='col-12 table-manage-patient'>
                        <table style={{width:'100%'}} >
                            <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thoi Gian</th>
                                <th>Ho va Ten</th>
                                <th>Dia chi</th>
                                <th>Gioi tinh</th>
                                <th>Action</th>
                            </tr>
                            {dataPatient && dataPatient.length > 0 ?
                            dataPatient.map((item, index)=>{
                                let time = language === LANGUAGES.VI? 
                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn

                                let gender = language === LANGUAGES.VI? 
                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                return(
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{time}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>{gender}</td>
                                    <td>
                                        <button className='mp-btn-confirm'
                                                onClick={() => this.handleBtnConfirm(item)}        
                                        >
                                            Xac nhan
                                        </button>

                                    </td>
                                </tr>                                    
                                )
                            })
                        :
                            <tr>
                                <td colSpan='6' style={{textAlign: 'center'}}>no data</td>
                            </tr>
                        }

                            </tbody>
                        </table>                        
                    </div>
                </div>
            </div>

            <RemedyModal
                isOpenModal={isOpenRemedyModal}
                dataModal={dataModal}
                closeRemedyModal={this.closeRemedyModal}
                sendRemedy={this.sendRemedy}
            />


            </LoadingOverlay>
            </>   
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo       //this is to get all the data of the user that is using the account, so that we can get id of this user
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
