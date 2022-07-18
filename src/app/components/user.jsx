import React, { useState } from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ item, onDelete }) => {
  const [status, setStatus] = useState(item.bookmark);
  const handleToggleBookMark = () => {
	console.log(status)
    setStatus(!status);
  };

  return (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>
        {item.qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} qualitie={qualitie}/>
        ))}
      </td>
      <td>{item.profession.name}</td>
      <td>{item.completedMeetings}</td>
      <td>{item.rate} /5</td>
      <td>
        <BookMark onToggleBookMark={handleToggleBookMark} status={status} />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(item._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
