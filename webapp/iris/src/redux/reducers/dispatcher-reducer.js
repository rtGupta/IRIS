import { ActionTypes } from "../constants/action-types";

const dispatcherReducer = (state = {}, action) => {
    const type = action.type;
    
    switch (type) {
        case ActionTypes.INITIATE_REQUEST: 
            return { state: action.payload };

        case ActionTypes.RECORD_MEDICAL_HISTORY:
            return { state: action.payload };

        default: return state;
    }
}

export default dispatcherReducer;