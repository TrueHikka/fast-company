import { createSlice } from "@reduxjs/toolkit";
import { isOutdated } from "../utils/isOutdated";
import professionService from "../services/professions.service";

const professionsSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
		professionsReceived: (state, action) => {
			state.entities = action.payload;
			state.lastFetch = Date.now();
			state.isLoading = false;
		},
		professionsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		}
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
		dispatch(professionsRequested())
        try {
            const { content } = await professionService.fetchAll();
            dispatch(professionsReceived(content));
        } catch (error) {
        dispatch(professionsRequestFailed(error.message))
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsByIds = (professionsId) => (state) => {
    if (state.professions.entities) {
        const professionsArr = state.professions.entities.find(
            (profession) => profession._id === professionsId
        );
        return professionsArr;
    }
    return [];
};

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export default professionsReducer;
