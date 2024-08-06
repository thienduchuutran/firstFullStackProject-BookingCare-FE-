import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =  () => {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())                 //in case it fails, we change the status right away
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart =  () => {
    return async(dispatch, getState) => {
        try{

            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())                 //in case it fails, we change the status right away
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchRoleStart =  () => {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())                 //in case it fails, we change the status right away
            console.log('fetchGenderStart error', e)
        }
    }
}

export const createNewUser = (data)=>{
    return async(dispatch, getState) => {
        try{
            let res = await createNewUserService(data)
            if (res && res.errCode === 0){
                toast.success('Created a new user successfully')
                dispatch(saveUserSuccess())
            }else{
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())                 //in case it fails, we change the status right away
            console.log('saveUserFailed error', e)
        }
    }    
}

export const saveUserSuccess = ()=>({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailed = ()=>({
    type: 'CREATE_USER_FAILED'
})  


export const fetchAllUsersStart =  () => {
    return async(dispatch, getState) => {
        try{
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))         //adding reverse() to sort from newest to oldest
            }else{
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed())                 //in case it fails, we change the status right away
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) =>({     //the data here is retrieved from dispatch(fetchAllUsersSuccess(res.data))
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFailed = (data) =>({    
    type: 'FETCH_ALL_USERS_SUCCESS',
})