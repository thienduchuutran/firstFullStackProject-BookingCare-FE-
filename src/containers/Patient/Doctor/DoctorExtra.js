import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtra.scss'
// import Select from 'react-select';

import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import reactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';


class DoctorExtra extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowDetailInfo: false
        }
    }

    async componentDidMount(){

    }


    async componentDidUpdate(prevProps, prevState, snapshot){                 //gotta run again in the componentDidUpdate() since it's gonna keep running 
        if(this.props.language !== prevProps.language){

        }
         
    }
    
    showHideDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo
        })
    }


    render(){  
        let {isShowDetailInfo} = this.state
        return (    
            <> 
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            DIA CHI KHAM
                        </div>
                        <div className='name-clinic'>
                            PHONG KHAM CHUYEN KHOA DA LIEU
                        </div>
                        <div className='detail-address'>
                            207 pho hue hai ba trung ha noi
                        </div>
                    </div>

                    <div className='content-down'>
                        {isShowDetailInfo === false && 
                            <div className='short-info'>
                                Gia kham 250k <span onClick={()=> this.showHideDetailInfo()}>xem chi tiet</span>
                            </div>                        
                        }


                        {isShowDetailInfo && 
                        <>
                            <div className='title-price'>GIA KHAM</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>
                                        Gia kham
                                    </span>
                                        
                                    <span className='right'>
                                        250k
                                    </span>
                                </div>
                                <div className='note'>
                                    duoc uu tien kham truoc 
                                </div>
                            </div>
                            <div className='payment'>
                                Nguoi benh co the thanh toan chi phi bang tien mat va quet the
                            </div>
                            <div className='hide-price'>
                                <span onClick={()=> this.showHideDetailInfo()}>
                                    An bang gia
                                </span>
                            </div>        
                        </>            
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
