import React from "react";
import { useState } from "react";

const SearchUsers = () => {
    const [value, setValue] = useState("");
    const onChangeValue = (event) => {
        setValue(event.target.value);
    };

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
                        onChange={onChangeValue}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SearchUsers;
