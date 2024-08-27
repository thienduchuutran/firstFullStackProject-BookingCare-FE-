import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';



class VerifyEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusVerify: false
        }
    }

    async componentDidMount(){
        if(this.props.location && this.props.location.search){
            //get query string
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true
                })
            }else{

            }
        }

        if(this.props.match && this.props.match.params && this.props.match.params.id){
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }  
         
    }

    render(){ 

        return (    
            <> 
            <div>hello from verufy</div>
            </>   
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
