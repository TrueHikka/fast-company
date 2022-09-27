import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage/userPage";
import UsersListPage from "./components/page/usersListPage";
import UserPageEdit from "./components/page/userPage/userPageEdit";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "./hooks/useProfession";

function App() {
    return (
        <div>
            <NavBar />
            <ProfessionsProvider>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <UserProvider>
                        <Route
                            path="/users/:userId/:edit"
                            component={UserPageEdit}
                        />
                        <Route path="/users/:userId" component={UserPage} />
                        <Route path="/users" component={UsersListPage} />
                    </UserProvider>
                    <Redirect to="/" />
                </Switch>
            </ProfessionsProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
