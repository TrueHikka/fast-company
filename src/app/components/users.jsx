import React from "react";
import UsersList from "./usersList";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage id={userId} /> : <UsersList />}</>; // нет
};

export default Users;
