import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTodosReqAction } from "../../store/actions";
import TodoLIst from "./TodoList/TodoList";
import './TodosManager.scss'

export default function TodosManager() {
	const dispatch = useDispatch();

	useEffect(() => {
		async function getTodos() {
			try {
				dispatch(getTodosReqAction())
			} catch (error) {
				console.warn(error);
			}
		}

		getTodos();
	}, []);

	return (
		<section className="tasks">
			<div className="container">
				<TodoLIst></TodoLIst>
			</div>
		</section>
	)
}