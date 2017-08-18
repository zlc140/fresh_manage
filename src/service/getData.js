import axios from 'axios'

var BASE_URL = ''
export const orderlist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/order/findAllOrders',
        params:prop
    })
}