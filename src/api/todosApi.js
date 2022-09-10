import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getTodosReq(uid) {
	const docs = await getDocs(collection(db, `users/${uid}/todos`));

	return docs.docs.map((todos) => {
		return ({...todos.data()})
		}
	)
}

export async function updateTodoReq(id, todo, uid) {
	await updateDoc(doc(db, `users/${uid}/todos`, id), todo);
}

export async function addTodoReq(todo, uid) {
	await setDoc(doc(db, `users/${uid}/todos`, todo.id), todo);
}

export async function deleteTodoReq(id, uid) {
	await deleteDoc(doc(db, `users/${uid}/todos`, id));
}