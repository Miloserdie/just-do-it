import { ACTION_ADD_TODO, ACTION_DELETE_TODO, ACTION_SET_TODOS, ACTION_UPDATE_TODO } from "./types";
import { getTodosReq, updateTodoReq } from '../../components/todosApi';

export function setTodosAction(todos) {
	return {
		type: ACTION_SET_TODOS,
		payload: todos
	}
}

export function updateTodoAction(id, todo) {
	return {
		type: ACTION_UPDATE_TODO,
		payload: {id, todo}
	}
}

export function getTodosReqAction() {
	return async function(dispatch) {
		try{
			const todos = await getTodosReq(); 

			dispatch(setTodosAction(todos));
		} catch(e) {
			console.warn(e);
		}
	}
}

export function updateTodoReqAction(id, task) {
	return async function(dispatch) {
		try{
			await updateTodoReq(id, task);
		
			dispatch(updateTodoAction(id, task));
		} catch(e) {
			console.warn(e);
		}
	}
}