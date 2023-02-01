/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import { ADD_LOGS, RESET } from "../actionTypes";

const initialState: any = {
	logs: [],
};

export const logsReducer = (state = initialState, action: any) => {
	// console.log(state.logs);
	switch (action.type) {
		case ADD_LOGS:
			return {
				// ...state,
				logs: [...state.logs, action],
			};

		// return {
		// 	...state,
		// 	logs: [...state.logs, action.payload],
		// };

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

// {
// 	stats: {
// 		queries: 1,
// 		results: 1,
// 		logs: {
// 			type: "select_where",
// 			duration: "13ms",
// 			timestamp: "2023-02-01T08:23:41.163Z",
// 			database: "heroku_6277cdda7c83006",
// 			query: "SELECT * FROM suppliers WHERE suppliers.SupplierID = ?",
// 		},
// 	},
// },
// {
// 	stats: {
// 		queries: 2,
// 		results: 21,
// 		logs: [
// 			{
// 				type: "select",
// 				duration: "2ms",
// 				timestamp: "2023-02-01T08:41:44.252Z",
// 				database: "heroku_6277cdda7c83006",
// 				query: "SELECT COUNT(1) as total FROM suppliers",
// 			},
// 			{
// 				type: "select",
// 				duration: "4ms",
// 				timestamp: "2023-02-01T08:41:44.254Z",
// 				database: "heroku_6277cdda7c83006",
// 				query: "SELECT * FROM suppliers LIMIT ${limit} OFFSET ${offset}",
// 			},
// 		],
// 	},
// },
