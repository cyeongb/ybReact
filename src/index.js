import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "common/StyleComponents/themes/index";
import * as serviceWorker from "serviceWorker";
import { LayoutProvider } from "common/context/LayoutContext";
import { UserProvider } from "common/context/UserContext";

//리덕스, 사가
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga, rootReducers } from 'root';


//컴포넌트
import AppContainer from 'AppContainer';

const sagaMiddleware=createSagaMiddleware();

const store=createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <AppContainer />
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
