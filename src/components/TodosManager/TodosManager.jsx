import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoReqAction, getTodosReqAction, updateTodoReqAction } from "../../store/actions";
import TodoLIst from "./TodoList/TodoList";
import './TodosManager.scss'
import AddTodoFrom from "./AddTodoFrom/AddTodoFrom";

export default function TodosManager() {
	const todos = useSelector(state => state.todos);
	const dispatch = useDispatch();

	useEffect(() => {
		function getTodos() {
			dispatch(getTodosReqAction());
		}

		getTodos(); 
	}, []);

	function updateTodo(id, task) {
		dispatch(updateTodoReqAction(id, task));
	}

	function deleteTodo(id) {
		let question = window.confirm("Ви дійсно хочете видалити Завдання?");

		if(question) {
			dispatch(deleteTodoReqAction(id));
		}
	}

	return (
		<section className="tasks">
			<div className="container">
				<div className="content">
					<AddTodoFrom></AddTodoFrom>
					<h1 className="tasks__title">Усього завдань: <span>{todos.length}</span></h1>
					<TodoLIst onDelete={deleteTodo} onUpdate={updateTodo}></TodoLIst>
				</div>
			</div>
		</section>
	)
}