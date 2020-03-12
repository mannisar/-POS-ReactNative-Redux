import axios from 'axios'

export const orderCheckout = (data) => {
    return {
        type: "ORDER_CHECKOUT",
        payload: axios({
            method: "POST",
            url: `http://192.168.1.18:3004/api/order`,
            data: data
        })
    }
}

export const readOrder = () => {
    return {
        type: "READ_ORDER",
        payload: axios({
            method: "GET",
            url: `http://192.168.1.18:3004/api/history`,
        })
    }
}