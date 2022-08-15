import { collection, getDocs, query, doc, updateDoc, deleteDoc, QuerySnapshot, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const TODOS_URL = 'todos';

export async function getTodosReq() {
	const docs = await getDocs(collection(db, TODOS_URL));

	return docs.docs.map((todo) => {
		return ({...todo.data()})
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