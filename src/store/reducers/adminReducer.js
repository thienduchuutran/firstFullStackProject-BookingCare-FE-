import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire gender start: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state}              //this is how we assign data into redux
            copyState.genders = action.data
            console.log('fire gender success: ', copyState)

            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire gender fail: ', action)

            return {
                ...state,
            }        
        default:
            return state;
    }
}

export default adminReducer;