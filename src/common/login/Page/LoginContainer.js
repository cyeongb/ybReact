import React from 'react';
import  Login from './Login';
import { connect } from 'react-redux';
import { logInOutRequest } from 'common/login/Action/Action';
import { searchCode } from 'ERP/HR/Action/Action';

import { withRouter } from "react-router-dom";

const LoginContainer = (props)=>{
    const { status, errorCode, errorMsg, logInOutRequest, isLogin ,searchCode ,company ,workPlace }=props;
    
    const handleLogin=(empCode, password,companyCodes,workplaceCodes) =>{
        logInOutRequest({ empCode:empCode, password:password , companyCode:companyCodes , workplaceCode:workplaceCodes , history: props.history });
    }
    
    return(
        <div>
            <Login handleLogin={handleLogin}
                        status={status}
                        errorCode={errorCode}
                        errorMsg={errorMsg}
                        isLogin={isLogin}
                        searchCode={searchCode}
                        companyCode={company}
                        workPlaceCode={workPlace}
            />
        </div>
    )
};


const mapStateToProps=(state) =>{
    return{
        status: state.logInOutReducer.status,
        errorCode: state.logInOutReducer.errorCode,
        errorMsg: state.logInOutReducer.errorMsg,
        isLogin:  state.logInOutReducer.isLogin,
        company:  state.HrReducer.company,
        workPlace:  state.HrReducer.workPlace,

    };
} 

export default connect(mapStateToProps,{ logInOutRequest,searchCode })(withRouter(LoginContainer)); 