import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageEdit from "../components/page/userPage/userPageEdit";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId
                    ? (edit ? <UserPageEdit/> : <UserPage userId={userId}/>)
                    : <UsersListPage/>
                }
            </UserProvider>
        </>
    );
};

export default Users;