import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUsers from "../../ui/searchUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from "../../../store/professions";
import { getUsersList } from "../../../store/users";

const UsersListPage = () => {
	const users = useSelector(getUsersList())
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [value, setValue] = useState("");
    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    const handleChangeValue = (event) => {
        setValue(event.target.value);
        setSelectedProf(null);
    };

    const handleDelete = (userId) => {
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setValue("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            const filteredUsers = data.filter((user) => {
                if (selectedProf || value) {
                    if (selectedProf) {
                        return data.profession._id === selectedProf._id;
                    }
                    if (value) {
                        return data.name
                            .toLowerCase()
                            .includes(value.toLowerCase());
                    }
                }
                return true;
            });
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchUsers
                        value={value}
                        onChangeValue={handleChangeValue}
                    />

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <h1>loading...</h1>;
};

export default UsersListPage;
