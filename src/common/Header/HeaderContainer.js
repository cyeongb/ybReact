import React from 'react';
import  Header from 'common/Header/Header';
import { connect } from 'react-redux';
import { logInOutRequest } from 'common/login/Action/Action';

const HeaderContainer = (props) => {
    const { logInOutRequest }=props;
    
    const { empInfo } = props;

    const handleLogOut=() =>{
        logInOutRequest();
    }
    return (
        <div>
            <Header handleLogOut={handleLogOut} empInfo={empInfo}/>
        </div>
    );
};
const mapStateToProps = (state) =>{

    return { empInfo: state.logInOutReducer.empInfo }
}


export default connect(mapStateToProps,{ logInOutRequest })(HeaderContainer);


