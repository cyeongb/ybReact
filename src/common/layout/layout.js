import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "common/layout/styles";

// components
import HeaderContainer from "common/Header/HeaderContainer";
import Sidebar from "common/Sidebar/Sidebar";
//import LayoutPageRoute from './LayoutPageRoutes';

// pages
//import Dashboard from '../../../pages/dashboard/Dashboard'
//import * as additional from './additionalFunctionRouteComponents/additionalFunctionComponent';
//import * as account from'./PageRouteComponents/accountPageComponents';
//import * as personnel from './PageRouteComponents/personnelPageComponents';
import * as logistic from "./PageRouteComponents/logisticsPageComponents";

// context
import { useLayoutState } from "common/context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <HeaderContainer history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />

          <Switch>
            {/* 메인 홈 : 여기도 이상없이 잘됨 */}
            {/*<Route path="/hboard" component={Dashboard} />*/}
            {/* 각자 업무에 맞게 라우터를 정의 하시오 */}
            {/* 회 계 */}
            {/* 인 사 */}
            {/*  <Route
              exact
              path="/logi"
              render={() => <Redirect to="/logi/business/contract" />}
           /> */}
            <Route
              exact
              path="/app/sales/Contract" //경로 이렇게 안하면 안나옴.. 다른거 고쳐야 할듯
              component={logistic.contract}
            />{" "}
            {/* 물 류 */}
            {/* 부가기능 Route 여긴 이상없이 잘됨 */}
            {/*<Route path="/app/typography" component={additional.Typography} />
              <Route path="/app/tables" component={additional.Tables} />
              <Route path="/app/notifications" component={additional.Notifications} />

              <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />}/>

                  <Route path="/app/ui/maps" component={additional.Maps} />
                  <Route path="/app/ui/icons" component={additional.Icons} />
                  <Route path="/app/ui/charts" component={additional.Charts} />*/}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
