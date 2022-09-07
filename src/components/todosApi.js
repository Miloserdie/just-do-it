import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const TODOS_URL = 'todos';

export async function getTodosReq() {
	const docs = await getDocs(collection(db, TODOS_URL));

	return docs.docs.map((todos) => {
		return ({...todos.data()})
		}
	)
}

export async function updateTodoReq(id, todo) {
	await updateDoc(doc(db, TODOS_URL, id), todo);
}

export async function addTodoReq(todo) {
	await setDoc(doc(db, TODOS_URL, todo.id), todo);
}

export async function deleteTodoReq(id) {
	await deleteDoc(doc(db, TODOS_URL, id));
}