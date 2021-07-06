import css from "./App.module.scss";
import Login from './components/login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./home/Home";

function App(): JSX.Element {
  return (
    <div className={css.App}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
