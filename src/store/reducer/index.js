import { ACTION_ADD_TODO, ACTION_DELETE_TODO, ACTION_SET_TODOS, ACTION_UPDATE_TODO } from "../actions/types";

const initialState = {
	todos: []
};

export default function rootReducer(state = initialState, {type, payload}) {
	switch(type) {
		case ACTION_SET_TODOS:
			return {...state, todos: payload};
		case ACTION_UPDATE_TODO:
			return {...state, todos: payload};
		default: return state;
	}
}