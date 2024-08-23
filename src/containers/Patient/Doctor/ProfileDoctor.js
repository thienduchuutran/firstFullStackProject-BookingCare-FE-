import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';


class ProfileDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount(){
        //this is to get the info and assign to state
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async(id) => {
        let result = {}
        if(id){

            let res = await getProfileDoctorById(id)
            if(res && res.errCode === 0){
                result = res.data
            }
        }
        return result
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }
        
        if(this.props.doctorId !== prevProps.doctorId){
            this.getInfoDoctor(this.props.doctorId)
        }
         
    }

    render(){ 
        let {dataProfile} = this.state
        console.log('check state: ', this.state)

        return (    
            <div>hello profile doctor</div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
