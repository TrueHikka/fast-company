import React from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...props }) => {
  return (
    <>
      <SearchStatus length={users.length} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((item) => (
              <User
                item={item}
                onDelete={props.onDelete}
                key={item._id}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
