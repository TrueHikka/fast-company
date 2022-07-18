import React from "react";

const BookMark = ({status, ...props}) => {
	
return (
	<i
	onClick={props.onToggleBookMark}
	className={status ? "p-1 bi bi-bookmark-fill" : "p-1 bi bi-bookmark"}
	>
	</i>
)
}

export default BookMark




