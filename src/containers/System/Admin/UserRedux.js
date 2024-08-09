import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { valuesIn } from 'lodash';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props){
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'M',
            position: 'P0',
            role: 'R0',
            avatar: '',
            action: '',
            userEditId: '',            

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try{
        //     let res = await getAllCodeService('gender')
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // }catch(e){
        //     console.log(e)
        // }
    }

    handleOnchangeImage = async (event)=>{
        let data = event.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file)
            let objURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objURL,
                avatar: base64
            })
        }
         
    }

    openPreviewImage = ()=>{
        if(!this.state.previewImgURL) return            //When no file is uploaded yet, do this to prevent clicking on the blank field and still preview
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid === false) return

        let {action} = this.state

        if(action === CRUD_ACTIONS.CREATE){
        //fire redux create user
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
            })
        }
        if( action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,

            })
        }



        //Do this to WAIT for the new user info to be saved in database, then fetch all users. Otherswise
        //the fetching goes before database saves new data 
        setTimeout(()=>{
            this.props.fetchUserRedux()
        }, 1000)
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false
                alert('this input is required: ' +arrCheck[i])
                break
            }
        }

        return isValid
    }

    onChangeInput = (event, id)=> {
        // email: '',
        // password: '',
        // firstName: '',
        // lastName: '',
        // phoneNumber: '',
        // address: '',
        // gender: '',
        // position: '',
        // role: '',
        // avatar: '',    
        
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }


        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',     
            previewImgURL: imageBase64, 
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {

        let genders = this.state.genderArr && this.state.genderArr.length > 0 ? this.state.genderArr.filter((item, index)=> index !== 2) : []

        let language = this.props.language
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let isGetGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state


        return (
            <div className='user-redux-container'>
                <div className="title" >Learn React Redux with Duc</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>{isGetGender === true? 'Loading gender' : ''}</div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input 
                                    className='form-control' 
                                    type='email'
                                    value={email}
                                    onChange={(event)=>{this.onChangeInput(event, 'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? 'true' : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input 
                                    className='form-control' 
                                    type='password'
                                    value={password}
                                    onChange={(event)=>{this.onChangeInput(event, 'password')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? 'true' : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={firstName}
                                    onChange={(event)=>{this.onChangeInput(event, 'firstName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={lastName}
                                    onChange={(event)=>{this.onChangeInput(event, 'lastName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/> </label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={phoneNumber}
                                    onChange={(event)=>{this.onChangeInput(event, 'phoneNumber')}}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={address}
                                    onChange={(event)=>{this.onChangeInput(event, 'address')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, 'gender')}}
                                    value={gender}
                                >
                                    {/* {genders && genders.length > 0 &&
                                    genders.filter((item, index)=>{
                                            return(
                                                <option key={index}>{item}</option>                        
                                            )
                                    })} */}
                                    {genders && genders.length > 0 &&
                                    genders.map((item, index)=>{
                                            return(
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>                        
                                            )
                                    })}                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, 'position')}} 
                                    value={position}                               
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index)=>{
                                            return(
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>  
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, 'role')}}  
                                    value={role}                                 
                                >
                                    {roles && roles.length > 0 &&
                                    roles.map((item, index)=>{
                                        return(
                                            <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>  
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImage' hidden type='file' 
                                        onChange={(event)=>this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImage'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImage()}
                                    ></div>
                                </div>

                            </div>
                            
                            <div className='col-12 my-3'>
                                <button 
                                    className= {this.state.action === CRUD_ACTIONS.EDIT? "btn btn-warning" :'btn btn-primary' } 
                                    onClick={()=>this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT? <FormattedMessage id="manage-user.edit"/> : <FormattedMessage id="manage-user.save"/>}
                                    
                                </button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                
                    
                    {/* {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            
                        />
                    }             */}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
