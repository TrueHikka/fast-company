import React from "react";
import { useState } from "react";

const SearchUsers = ({ users }) => {
    const [value, setValue] = useState("");
    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const usersName = users.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
    });

    console.log(usersName);

    return (
        <div>
            <div className="form-outline mb-2">
                <label
                    className="form-label"
                    htmlFor="datatable-search-input"
                ></label>
                <div className="input-group">
                    <input
                        type="search"
                        className="form-control"
                        id="datatable-search-input"
                        placeholder="Search..."
                        onChange={valueChangeHandler}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => console.log(usersName)}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SearchUsers;
