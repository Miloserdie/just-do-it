import api from "../core/api";

const TODOS_URL = 'todos';
const ASSETS_URL = 'assets'

export async function getTodosReq() {
	const res = await api.get(TODOS_URL);

	return res.data;
}