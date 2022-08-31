import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersListPage from "./components/page/usersListPage/usersListPage";
import UserPage from "./components/page/userPage/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={UsersListPage} />
            </Switch>
        </div>
    );
}

export default App;
