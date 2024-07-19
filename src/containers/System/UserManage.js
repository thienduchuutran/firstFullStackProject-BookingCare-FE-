import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class UserManage
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
        // console.log('users from nodejs: ', response)
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            // console.log('check state ', this.state.arrUsers)
        }
    }

    handleAddnewUser = ()  => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    /** Life cycle
     * Run component:
     * 1. run constructor -> init state (the varibles we wanna use)
     * 2. render
     * 3. did mount (when we wanna assign a value into a state variable aka set state before it renders into UI)
     * 
     */

    createNewUser = async(data) =>{
        try{
            let response = await createNewUserService(data)
            if(response && response.errCode !== 0){
                alert(response.errMessage)

            }else{
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
                // console.log(emitter)
            }
            
        }catch(e){
            console.log(e)
        }
        console.log('data from child' ,data)
    }

    handleDeleteUser = async (user) => {
        console.log(user)
        try{
            let res = await deleteUserService(user.id)
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact()
            }else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = (user) => {
        console.log('click save user: ', user)
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser={this.doEditUser}                
                />
                }

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
                                        <button className='btn-edit' onClick={()=>this.handleEditUser(item)} ><i className="fas fa-user-edit"></i></button>
                                        <button className='btn-delete' onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
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
