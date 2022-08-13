import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosReqAction, updateTodoReqAction } from "../../store/actions";
import TodoLIst from "./TodoList/TodoList";
import './TodosManager.scss'

export default function TodosManager() {
	const dispatch = useDispatch();

	useEffect(() => {
		async function getTodos() {
			dispatch(getTodosReqAction());
		}

		getTodos();
	}, []);

	async function updateTodo(id, task) {
		dispatch(updateTodoReqAction(id, task))
	}

	return (
		<section className="tasks">
			<div className="container">
				<TodoLIst onUpdate={updateTodo}></TodoLIst>
			</div>
		</section>
	)
}