const initialState = {
    users: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_USER_PENDING':
            return {
                ...state
            }
        case 'CREATE_USER_REJECTED':
            return {
                ...state
            }
        case 'CREATE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'READ_USER_PENDING':
            return {
                ...state
            }
        case 'READ_USER_REJECTED':
            return {
                ...state
            }
        case 'READ_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'UPDATE_USER_PENDING':
            return {
                ...state,
            }

        case 'UPDATE_USER_REJECTED':
            return {
                ...state,
            }

        case 'UPDATE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'DELETE_USER_PENDING':
            return {
                ...state
            }
        case 'DELETE_USER_REJECTED':
            return {
                ...state
            }
        case 'DELETE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }
        default:
            return state;
    }
}

export default user