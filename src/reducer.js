import { useReducer } from "react";
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state, loading: true
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                product: action.payload,
                loading: false
            };
        case "FETCH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case "DEFAULT":
            return state

    }
}
export default reducer