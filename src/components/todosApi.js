import api from "../core/api";
import { collection, getDocs, query, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";

const TODOS_URL = 'todos';

export async function getTodosReq() {
	const docs = await getDocs(collection(db, TODOS_URL));

	return docs.docs.map((el) => {
		return ({...el.data(), id: el.id})
		}
	)
}

export async function updateTodoReq(id, todo) {
	await api.put(`${TODOS_URL}/${id}`, {...todo});
}