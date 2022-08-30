import React, { useState, useEffect } from "react";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
    const params = useParams();
    const { userId } = params;

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();

    const handleSave = () => {
        history.replace("/users");
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <span>
                    <Qualities qualities={user.qualities} />
                </span>
                <h6>{`completedMeetings: ${user.completedMeetings}`}</h6>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button
                    className="btn btn-dark text-align-center"
                    onClick={handleSave}
                >
                    Все пользователи
                </button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserPage;
