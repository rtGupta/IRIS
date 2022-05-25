import { ActionTypes } from "../constants/action-types";

const userReducer = (state = {}, action) => {
    const type = action.type;

    switch (type) {
        case ActionTypes.EDIT_USER_DETAILS:
            return { state:action.payload };

        case ActionTypes.LOGIN_USER:
            return { state: action.payload };
            
        default: return state;
    }
}

export default userReducer;