import { ACTION_ADD_TODO, ACTION_DELETE_TODO, ACTION_SET_TODOS, ACTION_UPDATE_TODO } from "../actions/types";

const initialState = {
	todos: []
};

export default function rootReducer(state = initialState, {type, payload}) {
	switch(type) {
		case ACTION_SET_TODOS:
			return {...state, todos: payload.reverse()};
		case ACTION_UPDATE_TODO:
			return {...state, todos: state.todos.map((todo) => {
				if(todo.id === payload.id) {
					return payload.todo;
				}

				return todo;
			})};
		default: return state;
	}
}