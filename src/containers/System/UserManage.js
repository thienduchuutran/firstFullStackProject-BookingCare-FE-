import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class UserManage
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            console.log('check state ', this.state.arrUsers)
            
        }
        console.log('users from nodejs: ', response)
    }
    /** Life cycle
     * Run component:
     * 1. run constructor -> init state (the varibles we wanna use)
     * 2. render
     * 3. did mount (when we wanna assign a value into a state variable aka set state before it renders into UI)
     * 
     */

    render() {
        console.log(this.state)
        return (
            <div className="users-container">
                <div className='title text-center'>
                    Manage users
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                   
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
