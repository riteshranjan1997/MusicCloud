import {
    LOGIN_USERS_REQUEST, LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE,
    UPDATE_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_SUCCESS, UPDATE_USER_DETAILS_FAILURE,
    LOGOUT_USER, REMOVE_ERROR,
} from "./ActionTypes"

// for login user
export const loginUserRequest = () => ({
    type: LOGIN_USERS_REQUEST,
})

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USERS_SUCCESS,
    payload
})

export const loginUserFailure = (payload) => ({
    type: LOGIN_USERS_FAILURE,
    payload
})

export const loginRequest = payload => dispatch => {
    dispatch(loginUserRequest())
    return fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            dispatch(loginUserSuccess(res))
        })
        .catch((err) => {
            dispatch(loginUserFailure(err))
        });
}


// editing profile data of user
export const updateUserRequest = () => ({
    type: UPDATE_USER_DETAILS_REQUEST,
})

export const updateUserSuccess = (payload) => ({
    type: UPDATE_USER_DETAILS_SUCCESS,
    payload
})

export const updateUserFailure = (payload) => ({
    type: UPDATE_USER_DETAILS_FAILURE,
    payload
})

export const userUpdateRequest = (payload ,accessToken)=> dispatch => {
    console.log(payload,accessToken,"action")
    dispatch(updateUserRequest())
    return fetch("http://localhost:5000/api/settings/profile", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({ ...payload }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            dispatch(updateUserSuccess(res))
        })
        .catch((err) => {
            dispatch(updateUserFailure(err))
        });
}

// logging out user
export const logoutUser = () => ({
    type: LOGOUT_USER
})


// for handdling errors
export const handleError = () => dispatch => {
    setTimeout(function () {
        dispatch(removerError())
    }, 4000)
}

export const removerError = () => ({
    type: REMOVE_ERROR
})