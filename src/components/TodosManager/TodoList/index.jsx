import Todo from "../Todo";
import './style.scss';

export default function TodoList({filteredTodos}) {

	return (
		<ul className="tasks__list">
			{
				filteredTodos?.map(todo => {
					return <Todo key={todo.id} todo={todo}></Todo>
				})
			}
		</ul>
	)
}