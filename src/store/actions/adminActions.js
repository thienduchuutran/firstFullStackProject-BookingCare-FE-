import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService } from '../../services/userService';
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
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = ()=>({
    type: actionTypes.CREATE_USER_FAILED
})  


export const fetchAllUsersStart =  () => {
    return async(dispatch, getState) => {
        try{
            let res = await getAllUsers("ALL")
            console.log('users: ', res)
            if (res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))         //adding reverse() to sort from newest to oldest
            }else{
                toast.error('Fetched all users failed!')
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            toast.error('Fetched all users failed!')
            dispatch(fetchAllUsersFailed())                 //in case it fails, we change the status right away
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) =>({     //the data here is retrieved from dispatch(fetchAllUsersSuccess(res.data))
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = (data) =>({    
    type: actionTypes.FETCH_ALL_USERS_SUCCESS
})


export const deleteUser = (userId)=>{
    return async(dispatch, getState) => {
        try{
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0){
                toast.success('Deleted user successfully!')
                dispatch(fetchAllUsersStart())
            }else{
                toast.error('Deleted user failed!')
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())                 //in case it fails, we change the status right away
            console.log('saveUserFailed error', e)
        }
    }    
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data)=>{
    return async(dispatch, getState) => {
        try{
            let res = await editUserService(data)
            console.log('res ', res)
            if (res && res.errCode === 0){
                toast.success('Update user successfully!')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error('Update user failed!')
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed())                 //in case it fails, we change the status right away
            console.log('editUserFailed error', e)
        }
    }    
}

export const editUserSuccess = () =>({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () =>({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService('')
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        }catch(e){
            console.log('FETCH_TOP_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllDoctors('')
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await saveDetailDoctorService(data)
            if(res && res.errCode === 0){
                toast.success('Save info detail doctor succeed!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS
                })
            }else{
                console.log('error res', res.errCode)
                toast.error('Save info detail doctor failed!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                })
            }
        }catch(e){
            toast.error('Save info detail doctor failed!')
            console.log('Save info detail doctor failed: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = (type) => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService('TIME')
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequiredDoctorInfo =  () => {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
            })
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0){
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data
                    }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInfoFailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed())                 //in case it fails, we change the status right away
            console.log('fetchRequiredDoctorInfo error', e)
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})