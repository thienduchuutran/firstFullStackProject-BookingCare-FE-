import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {
        console.log('check prop: ', this.props)
        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <img className='header-logo' src={logo}/>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id='homeheader.specialty'/></b>
                            </div>
                            <div className='subs-title'>
                                <FormattedMessage id='homeheader.searchDoctor'/>
                            </div>                            
                        </div>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id='homeheader.facility'/></b>
                            </div>
                            <div className='subs-title'>
                                <FormattedMessage id='homeheader.selectRoom'/>
                            </div>                             
                        </div>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id='homeheader.doctor'/></b>
                            </div>
                            <div className='subs-title'>
                                <FormattedMessage id='homeheader.goodDoctor'/>
                            </div>                             
                        </div>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id='homeheader.plans'/></b>
                            </div>
                            <div className='subs-title'>
                                <FormattedMessage id='homeheader.healthCheck'/>
                            </div>                             
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className="far fa-question-circle"></i>
                            <FormattedMessage id='homeheader.support'/>
                        </div>
                        <div className='language-vi'>
                            VN
                        </div>
                        <div className='language-en'>
                            EN
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-header-banner'>
                <div className='content-up'>
                    <div className='title1'>
                        <FormattedMessage id='banner.title1'/>
                    </div>
                    <div className='title2'>
                        <FormattedMessage id='banner.title2'/>
                    </div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input placeholder='Tìm chuyên khoa khám bệnh' type='text'/>
                    </div>
                </div>

                <div className='content-down'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child1' />
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child2' />
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fas fa-procedures"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child3' />
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child4' />
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-user-md"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child5' />
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fas fa-briefcase-medical"></i>
                            </div>
                            <div className='text-child'>
                                <FormattedMessage id='banner.child6' />
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
