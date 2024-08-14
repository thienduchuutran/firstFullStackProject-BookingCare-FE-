import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInfoDoctor } from '../../../services/userService';

class DetailDoctor extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await getDetailInfoDoctor(id)
            console.log('check res: ', res)

            // imageBase64 = new Buffer(user.image, 'base64').toString('binary')

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }


    render() {
        console.log(this.props.match.params.id)     //this to get the id on the URL 
        return (        
            <>
                <HomeHeader isShowBanner={false}/>

                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>

                        </div>

                        <div className='content-right'>
                            <div className='up'>
                                Pho giao su Le Van An
                            </div>
                            <div className='down'>
                                djhfuhsfvscfsijfs
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>

                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
