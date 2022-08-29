import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ value, onChangeValue, clearProfession }) => {
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
                        value={value}
                        onChange={onChangeValue}
                        onFocus={clearProfession}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

SearchUsers.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    clearProfession: PropTypes.func.isRequired
};

export default SearchUsers;
