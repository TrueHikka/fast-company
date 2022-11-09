import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
	createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
	removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";
import { nanoid } from "nanoid";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, []);
    const isLoading = useSelector(getCommentsLoadingStatus());
	const currentUserId = useSelector(getCurrentUserId())
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(createComment({
			...data,
			_id: nanoid(),
			pageId: userId,
			created_at: Date.now(),
			userId: currentUserId
		}))
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id))
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
