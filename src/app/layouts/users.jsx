import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageEdit from "../components/page/userPage/userPageEdit";
import UserProvider from "../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    if (!dataStatus) return "Loading...";

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserPageEdit />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
