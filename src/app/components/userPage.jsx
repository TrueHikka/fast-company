import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "./quality";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    console.log(user);
    const history = useHistory();

    const handleSave = () => {
        history.replace("/users");
    };

    return (
        <>
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <h2>{`Профессия: ${user.profession.name}`}</h2>
                    <span>
                        {user.qualities.map((quality) => (
                            <Quality
                                key={user._id}
                                color={quality.color}
                                name={quality.name}
                            />
                        ))}
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
            )}
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
