// --- redux-saga
import { all } from 'redux-saga/effects';
import { watchLogInOutSaga } from 'common/login/Saga/Saga';
import { watchMenuListSaga } from 'common/menu/Saga/Saga';
import HrSaga from 'ERP/HR/Saga/Saga';

// --- redux 함수
import {combineReducers} from 'redux';

import menuListReducer from 'common/menu/Reducer/Reducer';
import logInOutReducer from 'common/login/Reducer/Reducer';
import HrReducer from 'ERP/HR/Reducer/Reducer';


export const rootReducers = combineReducers(
  {
    menuListReducer, // RouteMenuComponents
    logInOutReducer,
    HrReducer
  }
);


export function* rootSaga() {
  // all 함수는 여러 사가를 합쳐주는 역할을 합니다.
  yield all([watchLogInOutSaga(), watchMenuListSaga(), HrSaga() ] );
}


