import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';



class ManagePatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            //assign today's date for currentDate so that it shows up on datePicker as today, and we 
            //don't want it to also get the exact hour minute and second, just the date so we can't use
            //new Date()
            currentDate:  moment(new Date()).startOf('day').valueOf(),    
        }                        
    }

    async componentDidMount(){
        let {user} = this.props
        let {currentDate} = this.state
        let formattedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate

        })

        console.log('check res: ', res)
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    //this is to display the wanted date whenever we pick a date on datePicker
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render(){ 
        console.log('this.props: ', this.props)
        return (    
            <> 
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
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                            <tr>
                                <td>Ernst Handel</td>
                                <td>Roland Mendel</td>
                                <td>Austria</td>
                            </tr>
                            <tr>
                                <td>Island Trading</td>
                                <td>Helen Bennett</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <td>Laughing Bacchus Winecellars</td>
                                <td>Yoshi Tannamuri</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <td>Magazzini Alimentari Riuniti</td>
                                <td>Giovanni Rovelli</td>
                                <td>Italy</td>
                            </tr>
                            </tbody>
                        </table>                        
                    </div>
                </div>
            </div>
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
