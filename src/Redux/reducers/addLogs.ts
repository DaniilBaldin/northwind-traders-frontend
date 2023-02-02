/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import { ADD_LOGS, RESET } from "../actionTypes";

const initialState: any = {
	logs: [],
};

export const logsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ADD_LOGS:
			return {
				logs: [...state.logs, action],
			};
		case RESET:
			return initialState;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	logsReducer,
});

export default rootReducer;
