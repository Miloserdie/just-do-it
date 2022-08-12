import { useEffect, useState } from "react";
import TodosContext from "../../providers/TodosContext";
import { getTodosReq } from "../todosApi";
import TodoLIst from "./TodoList/TodoList";
import './TodosManager.scss'

export default function TodosManager() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function getTodos() {
			try {
				const todos = await getTodosReq();

				setTodos(todos);
			} catch (error) {
				console.warn(error);
			}
		}

		getTodos();
	}, []);

	const todosValue = {todos, setTodos};

	return (
		<TodosContext.Provider value={todosValue} >
				<section className="tasks">
					<div className="container">
						<TodoLIst></TodoLIst>
					</div>
				</section>
		</TodosContext.Provider>
	)
}