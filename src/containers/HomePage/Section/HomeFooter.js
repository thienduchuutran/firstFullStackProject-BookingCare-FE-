import React, { Component } from 'react'; 
import { connect } from 'react-redux';


// import { FormattedMessage } from 'react-intl';


// import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg"

  
class HomeFooter extends Component {


    render() {

        return(
            <div className='home-footer'>
                <p>&copy; 2024 Duc Tran. More information visit my Linkedln.<a target='_blank' href='https://www.linkedin.com/in/duc-tran-277564229/'> &#8594; Click here &#8592;</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
