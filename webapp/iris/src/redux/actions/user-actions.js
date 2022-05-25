import { ActionTypes } from "../constants/action-types";

export const editUser = (payload) => {
    return {
        type: ActionTypes.EDIT_USER_DETAILS,
        payload
    }
};

export const loginUser = (payload) => {
    return {
        type: ActionTypes.LOGIN_USER,
        payload
    }
};