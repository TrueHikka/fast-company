import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Login from "./components/login";
import UsersList from "./components/usersList";
import UserPage from "./components/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={UsersList} />
            </Switch>
        </div>
    );
}

export default App;
