import { combineReducers } from 'redux';

import products from './product';
import categorys from './category';
import users from './user';
import carts from './cart';
import orders from './order';
// import auth from './auth';

export default combineReducers({
    products,
    categorys,
    users,
    carts,
    orders,
    // auth
});