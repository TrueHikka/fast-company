import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestedFailed = createAction(
    "comments/commentCreateRequestedFailed"
);
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveRequestFailed = createAction(
    "comments/commentRemoveRequestFailed"
);

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment(data);
        dispatch(loadCommentsList(content.pageId));
    } catch (error) {
        dispatch(commentCreateRequestedFailed(error.message));
    }
};
export const removeComment = (id) => async (dispatch, getState) => {
    const { pageId } = getState().comments.entities.find(
        (com) => com._id === id
    );
    dispatch(commentRemoveRequested());
    try {
        await commentService.removeComment(id);
        dispatch(loadCommentsList(pageId));
    } catch (error) {
        dispatch(commentRemoveRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
