import React, {useState} from "react";
import Users from "./components/users"
import API from "./API";

function App() {
	const [users, setUsers] = useState(API.users.fetchAll())

const handleDelete = (userId) => {
	setUsers((prevState) => prevState.filter((user) => user._id !== userId));
}

return (
	<Users
	users = {users}
	onDelete = {handleDelete}
	/>
)

}

export default App






















