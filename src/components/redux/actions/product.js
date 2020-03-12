import axios from 'axios';

export const createProduct = (data) => {
    return {
        type: 'CREATE_PRODUCT',
        payload: axios({
            method: "POST",
            url: `http://192.168.1.18:3004/api/product`,
            data: data
        })
    }
}

export const readProduct = (category, product) => {
    if (category !== undefined || product !== undefined) {
        return {
            type: 'READ_PRODUCT',
            payload: axios({
                method: "GET",
                url: `http://192.168.1.18:3004/api/product/?category=${category}&product=${product}`
            })
        }
    } else {
        return {
            type: 'READ_PRODUCT',
            payload: axios({
                method: "GET",
                url: `http://192.168.1.18:3004/api/product`
            })
        }
    }
}

export const updateProduct = (productId, data) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: axios({
            method: "PATCH",
            url: `http://192.168.1.18:3004/api/product/${productId}`,
            data: data
        })
    }
}

export const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: axios({
            method: "DELETE",
            url: `http://192.168.1.18:3004/api/product/${productId}`
        })
    }
}

export const detailProduct = (productId) => {
    return {
        type: 'DETAIL_PRODUCT',
        payload: axios({
            method: "GET",
            url: `http://192.168.1.18:3004/api/product/${productId}`
        })
    }
}