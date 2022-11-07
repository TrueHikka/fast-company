import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageEdit from "../components/page/userPage/userPageEdit";
import UserProvider from "../hooks/useUser";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                <UserProvider>
                    {userId ? (
                        edit ? (
                            userId === currentUserId ? (
                                <UserPageEdit />
                            ) : (
                                <Redirect to={`/users/${currentUserId}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </UserProvider>
            </UsersLoader>
        </>
    );
};

export default Users;
