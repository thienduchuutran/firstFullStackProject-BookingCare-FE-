import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'



class VerifyEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusVerify: false,        //this is to decide if the app still loading to get appointment info or not
            errCode: 0                  //this is to decide if users get into the page 1st time or 2nd time
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
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
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
        let { statusVerify, errCode } = this.state
        console.log(this.state)
        return (    
            <> 
            <HomeHeader/>
            <div className='verify-email-container'>

            
            {statusVerify === false ?
                <div>Loading data...</div>
                :
                <div>
                    {errCode === 0 ? 
                    <div className='info-booking'>
                        Xac nhan lich hen thanh cong
                    </div>
                    :
                    <div className='info-booking'>
                        Lich hen khong ton tai hoac da duoc xac nhan
                    </div>}
                </div>
            }
            </div>
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
