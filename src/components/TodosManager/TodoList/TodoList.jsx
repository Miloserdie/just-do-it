import Todo from "../Todo/Todo"
import { useContext } from "react"
import TodosContext from "../../../providers/TodosContext"
import './TodoLIst.scss'

export default function TodoLIst() {
	const todos = useContext(TodosContext).todos;

	return (
		<ul className="tasks__list">
			{
				todos.map(todo => {
					return <Todo todo={todo}></Todo>
				})
			}
		</ul>
	)
}