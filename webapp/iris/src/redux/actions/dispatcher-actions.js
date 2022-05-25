import { ActionTypes } from "../constants/action-types";

export const initiateRequest = (payload) => {
    return {
        type: ActionTypes.INITIATE_REQUEST,
        payload
    }
};

export const recordMedicalHistory = (payload) => {
    return {
        type: ActionTypes.RECORD_MEDICAL_HISTORY,
        payload
    }
};