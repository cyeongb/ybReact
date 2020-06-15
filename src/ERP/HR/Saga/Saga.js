import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from 'ERP/HR/ActionType/ActionType';
import * as actions from "ERP/HR/Action/Action"

function* codeSaga(action) {
console.log(action)
    try{
        if (action.payload.type === "companyCode" ) {
            
            const{ data } = yield axios.get("http://localhost:8282/basicInfo/searchCompany.do");
            yield put(actions.searchCompanyCode(data.gridRowJson));

        } else if (action.payload.type === "workplaceCode") {
            
            const{ data } = yield axios.get("http://localhost:8282/basicInfo/searchWorkplace.do",{
                params : {
                    companyCode : action.payload.companyCode,  
                }
            });
            yield put(actions.searchWorkPlaceCode(data.gridRowJson));
        }
        
    }catch(error){
        action.payload.history.put('/error');
    }
}

export default function* HrSaga(){

    yield takeEvery(types.SEARCH_CODE, codeSaga);
    
}