import api from "../core/api";

const TODOS_URL = 'todos';

export async function getTodosReq() {
	const res = await api.get(TODOS_URL);

	return res.data;
}

export async function updateTodoReq(id, todo) {
	await api.put(`${TODOS_URL}/${id}`, {...todo});
}