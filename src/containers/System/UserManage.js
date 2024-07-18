import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class UserManage
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            // console.log('check state ', this.state.arrUsers)
            
        }
        // console.log('users from nodejs: ', response)
    }

    handleAddnewUser = ()  => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: ! this.state.isOpenModalUser,
        })
    }
    /** Life cycle
     * Run component:
     * 1. run constructor -> init state (the varibles we wanna use)
     * 2. render
     * 3. did mount (when we wanna assign a value into a state variable aka set state before it renders into UI)
     * 
     */

    render() {
        console.log(this.state.isOpenModalUser)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleModalUser}
                />
                <div className='title text-center'>
                    Manage users
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                            onClick={()=>this.handleAddnewUser()}
                    >
                        
                        <i class="fas fa-plus"></i>  Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    
                        {arrUsers && arrUsers.map((item, index) => {
                            
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-user-edit"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>

                    
                   
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
