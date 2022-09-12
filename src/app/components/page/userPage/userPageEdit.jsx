import React from "react";
import UserEditForm from "../../ui/userEditForm";

const UserPageEdit = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Edit User</h3>
                    <UserEditForm />
                </div>
            </div>
        </div>
    );
};
export default UserPageEdit;
