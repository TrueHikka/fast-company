import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect} from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "./hooks/useProfession";
import {QualitiesProvider} from "./hooks/useQualities"

function App() {
    return (
        <>
            <NavBar />
            <ProfessionsProvider>
				<QualitiesProvider>
					<Switch>
						<Route path="/" exact component={ Main } />
						<Route path="/login/:type?" component={ Login } />
						<Route path="/users/:userId?/:edit?" component={ Users } />
						<Redirect to="/" />
					</Switch>
				</QualitiesProvider>
            </ProfessionsProvider>
            <ToastContainer/>
        </>
    );
};

export default App;

// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
// import NavBar from "./components/ui/navBar";
// import Main from "./layouts/main";
// import Login from "./layouts/login";
// import UserPage from "./components/page/userPage/userPage";
// import UsersListPage from "./components/page/usersListPage";
// import UserPageEdit from "./components/page/userPage/userPageEdit";
// import UserProvider from "./hooks/useUsers";
// import { ToastContainer } from "react-toastify";
// import { ProfessionsProvider } from "./hooks/useProfession";
// import {QualitiesProvider} from "./hooks/useQualities"

// function App() {
//     return (
//         <div>
//             <NavBar />
//             <ProfessionsProvider>
// 			<QualitiesProvider>
//                 <Switch>
//                     <Route exact path="/" component={Main} />
//                     <Route path="/login/:type?" component={Login} />
//                     <UserProvider>
//                         <Route
//                             path="/users/:userId/:edit"
//                             component={UserPageEdit}
//                         />
//                         <Route path="/users/:userId" component={UserPage} />
//                         <Route path="/users" component={UsersListPage} />
//                     </UserProvider>
//                     <Redirect to="/" />
//                 </Switch>
// 				</QualitiesProvider>
//             </ProfessionsProvider>
//             <ToastContainer />
//         </div>
//     );
// }

// export default App;
