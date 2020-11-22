import {
    LOGIN_USERS_REQUEST, LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE,
    UPDATE_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_SUCCESS, UPDATE_USER_DETAILS_FAILURE,
    LOGOUT_USER, REMOVE_ERROR,
} from "./actionType"

const savedUser = JSON.parse(localStorage.getItem('savedUser')) || {};
const savedAccessToken = JSON.parse(localStorage.getItem('savedAccessToken')) || "";

export const initState = {
    isLoading: false,
    user_data: savedUser || {},
    message: "",
    isError: false,
    isAuth: savedAccessToken !== "" ? true : false,
    access_token: savedAccessToken || ""
}

export default (state = initState, { type, payload }) => {

    switch (type) {
        // for login
        case LOGIN_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case LOGIN_USERS_SUCCESS:
            localStorage.setItem('savedUser', JSON.stringify(payload.data.userData));
            localStorage.setItem('savedAccessToken', JSON.stringify(payload.data.accessToken));
            return {
                ...state,
                isLoading: false,
                isError: false,
                isAuth: true,
                message: payload.message,
                user_data: payload.data.userData,
                access_token: payload.data.accessToken
            }
        case LOGIN_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: payload.error,
                message: payload.message,
            }

        //  for editing profile
        case UPDATE_USER_DETAILS_REQUEST:
            return {
                ...state,
            }

        case UPDATE_USER_DETAILS_SUCCESS:
            localStorage.setItem('savedUser', JSON.stringify(payload.data));
            localStorage.setItem('savedAccessToken', JSON.stringify(payload.accessToken));
            return {
                ...state,
                user_data: payload.data,
                access_token: payload.accessToken,
            }

        case UPDATE_USER_DETAILS_FAILURE:
            return {
                ...state,

            }
        // for logout the user
        case LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                isAuth: false,
                user_data: {},
                access_token: "",
            }

        // handling error
        case REMOVE_ERROR:
            return {
                ...state,
                message: "",
                isError: false,
            }
        default:
            return state
    }
}