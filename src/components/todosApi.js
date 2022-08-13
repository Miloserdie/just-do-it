import api from "../core/api";
import { collection, getDocs, query, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";

const TODOS_URL = 'todos';

export async function getTodosReq() {
	const docs = await getDocs(collection(db, TODOS_URL));

	return docs.docs.map((todo) => {
		return ({...todo.data(), id: todo.id})
		}
	)
}

export async function updateTodoReq(id, todo) {
	await updateDoc(doc(db, TODOS_URL, id), todo);
}

export async function addTodoReq(todo) {
	await addDoc(collection(db, TODOS_URL), {...todo})
}