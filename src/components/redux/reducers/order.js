const initialState = {
    orders: []
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case 'ORDER_CHECKOUT_PENDING':
            return {
                ...state
            }
        case 'ORDER_CHECKOUT_REJECTED':
            return {
                ...state
            }
        case 'ORDER_CHECKOUT_FULFILLED':
            return {
                ...state,
                orders: action.payload.data.result
            }

        case 'READ_ORDER_PENDING':
            return {
                ...state
            }
        case 'READ_ORDER_REJECTED':
            return {
                ...state
            }
        case 'READ_ORDER_FULFILLED':
            return {
                ...state,
                orders: action.payload.data.result
            }
        default:
            return state;
    }
}

export default order