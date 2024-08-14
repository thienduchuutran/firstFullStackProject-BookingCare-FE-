import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'

class DetailDoctor extends Component {
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
