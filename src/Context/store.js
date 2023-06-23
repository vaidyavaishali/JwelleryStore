import { createContext, useReducer } from "react";

export const store = createContext()
const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem("shippingAddress")) : {},

        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : '', cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => (item._id === newItem._id))
            const cartItems = existItem ? state.cart.cartItems.map((items) => (items._id === existItem._id ? newItem : items)) : [...state.cart.cartItems, newItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return {
                ...state, cart: { ...state.cart, cartItems }
            }
        case "CARD_REMOVE_ITEM": {
            const cartItems = state.cart.cartItems.filter(
                (items) => items._id !== action.payload._id
            );
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return {
                ...state, cart: { ...state.cart, cartItems }
            }
        }
        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };
            
        case 'USER_SIGNIN':
            return {
                ...state, userInfo: action.payload
            }
        case "USER_LOGOUT": {
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    paymentMethod: ""
                }
            }
        }
        case "SHIPPING_ADDRESS":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        case "PAYMENT_METHOD":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        default: return state
    }
}

export const ProductProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch };
    return <store.Provider value={value}>{props.children}</store.Provider>
}