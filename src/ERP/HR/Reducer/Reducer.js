import * as types from 'ERP/HR/ActionType/ActionType';

const initialState={
    company:[],
    workPlace:[],
};

const HrReducer = ( state = initialState, action ) => {
console.log(action)
    switch(action.type){

        case types.SEARCH_COMPANY_CODE: 
            return{
                ...state,
                company:action.payload,
            };

        case types.SEARCH_WORK_PLACE_CODE: 
            return{
                ...state,
                workPlace:action.payload,
            };

        default :
            return state;
    }
}

export default HrReducer;