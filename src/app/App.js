import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionsProvider>
                        <Switch>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionsProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
