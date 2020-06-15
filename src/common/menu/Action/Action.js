import {createAction} from 'redux-actions';
import * as types from 'common/menu/ActionType/ActionType';
//import * as api  from 'api/loginApi';

//import axios from 'axios';

//액션 생성 함수

export const menuListRequest=createAction(types.MENU_LIST_REQUEST);


export const menuAll = menuList =>({
    type: types.MENU_ALL_LIST,
    menuList
});

export const menuAccount = menuList =>({
    type: types.MENU_ACCOUNT_LIST,
    menuList
});

export const menuHr = menuList =>({
    type: types.MENU_HR_LIST,
    menuList
});

export const menuLogi = menuList =>({
    type: types.MENU_LOGI_LIST,
    menuList
});
