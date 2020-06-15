import {createAction} from 'redux-actions';
import * as types from 'ERP/HR/ActionType/ActionType';

//액션 생성 함수

export const searchCode = createAction(types.SEARCH_CODE);
export const searchCompanyCode = createAction(types.SEARCH_COMPANY_CODE);
export const searchWorkPlaceCode = createAction(types.SEARCH_WORK_PLACE_CODE);

/*

위와 동일 !!
만약 값이 넘어올게 없다면 화살표함수 안을 비워도 됨 ㅎ

export const searchCompanyCode = code => ({ type : types.SEARCH_COMPANY_CODE , code });
export const searchWorkPlaceCode = code => ({ type : types.SEARCH_WORK_PLACE_CODE , code });

*/ 
