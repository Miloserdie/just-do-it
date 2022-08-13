import { ACTION_ADD_TODO, ACTION_DELETE_TODO, ACTION_SET_TODOS, ACTION_UPDATE_TODO } from "./types";
import { getTodosReq } from '../../components/todosApi';

export function setTodosAction(todos) {
	return {
		type: ACTION_SET_TODOS,
		payload: todos
	}
}

export function updateTodoAction(todo) {
	return {
		type: ACTION_UPDATE_TODO,
		payload: todo
	}
}

export function getTodosReqAction() {
	return async function(dispatch) {
		try{
			const todos = await getTodosReq();

			dispatch(setTodosAction(todos));
		} catch(e) {
			console.warn(e)
		}
	}
}