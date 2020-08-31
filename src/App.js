import React, {useEffect} from "react";
import {BrowserRouter, Route, useLocation} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import "semantic-ui-css/semantic.min.css"
import "@fortawesome/fontawesome-free/css/all.css";
import ErrorBoundary from "./frontend/components/organisms/error/ErrorBoundary";
import ReactGA from "react-ga";
import Home from "./frontend/pages/home/home";
import Register from "./frontend/pages/register/Register";
import TwitterRegister from "./frontend/pages/register/TwitterRegister";
import LineLogin from "./frontend/pages/register/LineLoginButton";
import Search from "./frontend/pages/search/Search";
import User from "./frontend/pages/user/User";

ReactGA.initialize("UA-175194207-1");
const path = window.location.pathname + window.location.search;
ReactGA.set({page: path});
ReactGA.pageview(path);

const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      whiteSpace: 'pre-line'
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .ui .header {
        color: #897657;
    }
    ::-webkit-scrollbar {
       width: 10px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 50, .5);
      border-radius: 10px;
      box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
    }
    .disable-scroll::-webkit-scrollbar{
      display:none;
    }
    select {
      width: 100%;
    }
    .slick-prev:before {
      color: black;
      margin-left:-3vw;
    }
    .slick-next:before{
      color: black;
      margin-left: 3vw;
    }
`;

const LocationListener = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname);
  }, [location]);

  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <React.Fragment>
        <GlobalStyles/>
        <BrowserRouter>
          <LocationListener>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/register/twitter" component={TwitterRegister}/>
            <Route exact path="/register/line" component={LineLogin}/>
            <Route exact path="/search" component={Search}/>
            <Route path="/user/:id" component={User}/>
          </LocationListener>
        </BrowserRouter>
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default App;
