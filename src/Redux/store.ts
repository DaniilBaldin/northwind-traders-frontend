import { legacy_createStore as createStore } from "redux";

import rootReducer from "./reducers/addLogs";

export const store = createStore(rootReducer);
