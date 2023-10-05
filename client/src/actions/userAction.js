import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
    CLEAR_MESSAGES,
} from '../constants/userConstants';
import axios from 'axios';

// Login User
export const loginUser = (Email, Password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_USER_REQUEST });

        const { data } = await axios.post(
            'https://www.electrozayn.com/api/electrozayn/login', //changed api//
            { Email, Password },
        );

        if (data.success === true) {
            // Successful login
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: data,
            });
            localStorage.setItem("token", data.session);
            localStorage.setItem("id", data.user_id);
            window.location.reload()
        } else {
            // Unsuccessful login
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: data.message, // Assuming data.message contains the error message
            });
        }


    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: data.message,
        });
    }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {


        dispatch({ type: REGISTER_USER_REQUEST });

       

        const { data } = await axios.post(
            'https://www.electrozayn.com/api/Create_user/electrozayn',userData);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        });

        localStorage.setItem("token", data?.session);
        localStorage.setItem("id", data?.user_id);
        
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = (user_id) => async (dispatch) => {

    try {

        dispatch({ type: LOAD_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.get('https://www.electrozayn.com/api/user/getone/'+user_id,config);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data[0]
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: "VEUILLEZ VOUS CONNECTER !!",
        });
    }
};
export const updateuser = (id,userData) => async (dispatch) => {

    try {
 await axios.put('https://www.electrozayn.com/api/update_user/'+id,userData)
 .then((res)=>{
    if(res.data.message==='User updated successfully.'){
        loadUser(id)
    }
 })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: "VEUILLEZ VOUS CONNECTER !!",
        });
    }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('https://www.electrozayn.com/api/logout');
        dispatch({ type: LOGOUT_USER_SUCCESS });
        localStorage.clear();
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error?.response?.data?.message,
        });
    }
};

// Update User
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${userToken}`, // Include the user's JWT token here
            },
        }

        const { data } = await axios.put(
            'http://localhost:4000/api/v1/me/update',
            userData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        }

        const { data } = await axios.put(
            'http://localhost:4000/api/v1/password/update',
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            'https://www.electrozayn.com/api/request-password-reset',
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, newPassword, confirmPassword) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `https://www.electrozayn.com/api/password/reset/${token}`,
            {newPassword, confirmPassword},
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Users ---ADMIN
export const getAllUsers = () => async (dispatch) => {


    try {

        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get('https://www.electrozayn.com/api/user/getAll');   /*change to electrozayn.com */
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Details ---ADMIN
export const getUserDetails = (id) => async (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
    }

    try {

        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Details ---ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        }

        const { data } = await axios.put(
            `http://localhost:4000/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User ---ADMIN
export const deleteUser = (id) => async (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
    }

    try {

        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`, config);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
// Clear All messages
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGES });
};