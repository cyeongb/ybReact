import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST } from 'common/login/ActionType/ActionType';
import { loginSuccess, loginFailure, login, logout } from 'common/login/Action/Action';

function* logInOutSaga(action) {
    try{
        if(!!sessionStorage.getItem("id_token")){
            yield put(logout())
                sessionStorage.clear()

        }else{
            yield put(login())

            const{ data } = yield axios.post(`http://localhost:8282/api/auth/login`,{
                empCode: action.payload.empCode,
                password: action.payload.password,
                companyCode: action.payload.companyCode,
                workplaceCode: action.payload.workplaceCode,
                }
            );

            const empInfo=data.empInfo;

                if(!empInfo){
                    yield put(loginFailure(data));

                }else{
                    console.log(empInfo)
                    yield put(loginSuccess(empInfo));
                        sessionStorage.setItem('id_token', action.payload.empCode);
                        sessionStorage.setItem('pw_token', action.payload.password);
                        sessionStorage.setItem('empNameInfo_token', empInfo.empName);
                        sessionStorage.setItem('empCodeInfo_token', empInfo.empCode);
                        sessionStorage.setItem('deptCodeInfo_token', empInfo.deptCode);
                        sessionStorage.setItem('positionCodeInfo_token', empInfo.positionCode);
                        sessionStorage.setItem('businessPlaceCodeInfo_token', empInfo.businessPlaceCode);
                        sessionStorage.setItem('authorityCodeInfo_token', empInfo.authorityCode);
                        console.log(sessionStorage.getItem("info_token"))
                }
        }
    }catch(error){
        action.payload.history.put('/error');
    }
}

export function* watchLogInOutSaga(){
    yield takeEvery(LOGIN_REQUEST, logInOutSaga);
}







