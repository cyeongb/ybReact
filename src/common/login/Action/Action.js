import {createAction} from 'redux-actions';
import * as types from '../ActionType/ActionType';
//import * as api  from 'api/loginApi';

//import axios from 'axios';

//액션 생성 함수
export const login=createAction(types.LOGIN);
export const logout=createAction(types.LOGOUT);

export const logInOutRequest=createAction(types.LOGIN_REQUEST);


export const reLoginSuccess= ()=> ({
    type:types.RELOGIN_SUCCESS
})


export const loginSuccess= (empInfo)=> ({
    type:types.LOGIN_SUCCESS,
    empInfo
})

export const loginFailure= (error)=> ({
    type:types.LOGIN_FAILURE,
    error
})


