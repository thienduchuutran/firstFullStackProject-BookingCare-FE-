import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility'
import OutStandingDoctor from './Section/OutStandingDoctor'
import './HomePage.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';

class HomePage extends Component {
    // handleAfterChange = (event, slick, currentSlide) =>{

    // }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // arrows: true,
            className: "myCustomCarousel",
            // afterChange: this.handleAfterChange
          };

        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty 
                    settings={settings}
                />
                <MedicalFacility 
                    settings={settings}
                />
                <OutStandingDoctor
                    settings={settings}
                />
                <HandBook
                    settings={settings}
                />
                <About
                    settings={settings}
                />
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
