import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
            <NavBar />
            <QualitiesProvider>
                <ProfessionsProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionsProvider>
            </QualitiesProvider>
            <ToastContainer />
        </>
    );
}

export default App;
