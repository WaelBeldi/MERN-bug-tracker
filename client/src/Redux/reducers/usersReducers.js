import { CREATE_USER, DELETE_USER, FETCH, GET_ALL_USERS, UPDATE_USER } from '../constants/actionTypes'

const usersReducers = (users = [], action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return action.payload;
        case CREATE_USER:
            return [...users, action.payload];
        case UPDATE_USER:
            return users.map((user) => user._id === action.payload._id ? action.payload : user);
        case DELETE_USER:
            return users.filter((user) => user._id !== action.payload)
        case FETCH:
            return action.payload;
        default:
            return users;
    }
}

export default usersReducers