import { ACTION_ADD_TODO, ACTION_DELETE_TODO, ACTION_SET_TODOS, ACTION_UPDATE_TODO } from "./types";
import { getTodosReq, addTodoReq, updateTodoReq, deleteTodoReq } from '../../components/todosApi';

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

export function addTodoAction(todo) {
	return {
		type: ACTION_ADD_TODO,
		payload: todo
	}
}

export function deleteTodoAction(id) {
	return {
		type: ACTION_DELETE_TODO,
		payload: id
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

export function addTodoReqAction(todo) {
	return async function(dispatch) {
		try {
			await addTodoReq(todo);

			dispatch(addTodoAction(todo));
		} catch (error) {
			console.log(error);
		}
	}
}

export function updateTodoReqAction(id, todo) {
	return async function(dispatch) {
		try{
			await updateTodoReq(id, todo);
		
			dispatch(updateTodoAction(id, todo));
		} catch(e) {
			console.warn(e);
		}
	}
}

export function deleteTodoReqAction(id) {
	return async function(dispatch) {
		try{
			await deleteTodoReq(id);
		
			dispatch(deleteTodoAction(id));
		} catch(e) {
			console.warn(e);
		}
	}
}