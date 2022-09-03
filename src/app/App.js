import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersListPage from "./components/page/usersListPage/usersListPage";
import UserPage from "./components/page/userPage/userPage";
import UserPageEdit from "./components/page/userPageEdit/userPageEdit";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId/:edit" component={UserPageEdit} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={UsersListPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
