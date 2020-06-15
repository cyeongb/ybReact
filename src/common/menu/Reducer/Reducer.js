
import _ from 'lodash' // https://lodash.com/docs/4.17.15 확인하자 라이브러리
import * as types from 'common/menu/ActionType/ActionType';

const initialState={
    currentMenuName: '',
};

const menuListReducer = (state=initialState, action) => {
    console.log(action)
    switch (action.type) {
        case types.MENU_ALL_LIST:
            return {
                ...state,
                menuList: action.menuList
          }
        case types.MENU_HR_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').HR00]
          }
        case types.MENU_ACCOUNT_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').ACC00]
          }
        case types.MENU_LOGI_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').LOGI00]
          }
        default:
            return state;
    }
}
export default menuListReducer;


