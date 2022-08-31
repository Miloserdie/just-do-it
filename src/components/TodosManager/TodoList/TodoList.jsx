import Todo from "../Todo/Todo";
import './TodoLIst.scss';
import {useSelector} from "react-redux";

export default function TodoLIst() {
	const todos = useSelector(state => state.todos.todos);

	const sortedTodos = todos?.slice().sort((a, b) => {
		a = a.createdDate;
		b = b.createdDate;
		return a > b ? -1 : a < b ? 1 : 0;
	});

	return (
		<ul className="tasks__list">
			{
				sortedTodos?.map(todo => {
					return <Todo key={todo.id} todo={todo}></Todo>
				})
			}
		</ul>
	)
}