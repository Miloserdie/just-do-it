import {configureStore} from "@reduxjs/toolkit";
import todosReducer from './reducer';

export const store = configureStore({
	reducer: {
		todos: todosReducer
	}
});