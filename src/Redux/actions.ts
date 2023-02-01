/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_LOGS, RESET } from "./actionTypes";

let id = 0;

export const addLog = (payload: any) => ({
	type: ADD_LOGS,
	payload: payload,
	id: ++id,
});

export const reset = () => ({
	type: RESET,
});
