import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './TableManageUser.scss'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {  // this here is the class TableManageUser
            userRedux: []
        }
    }

    componentDidMount(){
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        console.log(user)
    }
    render() {
        let arrUsers = this.state.userRedux
        return (
                    <table id='TableManageUser'>
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                    arrUsers.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
        
                                <td>
                                    <button 
                                        onClick={()=> this.handleEditUser(item)}
                                        className='btn-edit'  ><i className="fas fa-user-edit"></i></button>
                                    <button 
                                        className='btn-delete' 
                                        onClick={() => this.handleDeleteUser(item)}
                                    >
                                    <i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                    </table>
        )
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
