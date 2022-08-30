import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ value, onChangeValue }) => {
    return (
        <div className="form-outline mb-2">
            <label
                className="form-label"
                htmlFor="datatable-search-input"
            ></label>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="datatable-search-input"
                    placeholder="Search..."
                    value={value}
                    onChange={onChangeValue}
                />
                <button className="btn btn-outline-secondary" type="button">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    );
};

SearchUsers.propTypes = {
    value: PropTypes.string,
    onChangeValue: PropTypes.func
};

export default SearchUsers;
