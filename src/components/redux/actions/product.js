import axios from 'axios';

export const createProduct = (data) => {
    return {
        type: 'CREATE_PRODUCT',
        payload: axios({
            method: "POST",
            url: `http://192.168.1.17:3004/api/product`,
            data: data
        })
    }
}

export const readProduct = (product, category) => {
    if (product !== undefined) {
        return {
            type: 'READ_PRODUCT',
            payload: axios({
                method: "GET",
                url: `http://192.168.1.17:3004/api/product/?product=${product}`
            })
        }
    } else if (category !== undefined) {
        return {
            type: 'READ_PRODUCT',
            payload: axios({
                method: "GET",
                url: `http://192.168.1.17:3004/api/product/?category=${category}`
            })
        }
    } else {
        return {
            type: 'READ_PRODUCT',
            payload: axios({
                method: "GET",
                url: `http://192.168.1.17:3004/api/product`
            })
        }
    }
}

export const updateProduct = (productId, data) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: axios({
            method: "PATCH",
            url: `http://192.168.1.17:3004/api/product/${productId}`,
            data: data
        })
    }
}

export const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: axios({
            method: "DELETE",
            url: `http://192.168.1.17:3004/api/product/${productId}`
        })
    }
}

export const detailProduct = (productId) => {
    return {
        type: 'DETAIL_PRODUCT',
        payload: axios({
            method: "GET",
            url: `http://192.168.1.17:3004/api/product/${productId}`
        })
    }
}