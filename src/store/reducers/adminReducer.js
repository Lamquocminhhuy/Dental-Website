import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctor: []
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;

            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:

            state.isLoadingGender = false;

            state.genders = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;


            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:


            state.positions = [];
            return {
                ...state,

            }


        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data;


            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:

            state.roles = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USERS_FAILED:

            state.users = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:

            state.topDoctor = action.dataDoctor;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:

            state.topDoctor = [];
            return {
                ...state,

            }

            case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:

                state.allDoctor = action.dataDr;
                return {
                    ...state,
    
                }
            case actionTypes.FETCH_ALL_DOCTOR_FAILED:
    
                state.allDoctor = [];
                return {
                    ...state,
    
                }




        default:
            return state;
    }
}

export default adminReducer;