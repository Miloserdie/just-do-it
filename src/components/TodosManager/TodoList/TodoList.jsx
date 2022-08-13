import Todo from "../Todo/Todo";
import './TodoLIst.scss';
import { useSelector } from 'react-redux';

export default function TodoLIst({onUpdate}) {
	const todos = useSelector(state => state.todos);

	return (
		<ul className="tasks__list">
			{
				todos.map(todo => {
					return <Todo key={todo.id} onUpdate={onUpdate} todo={todo}></Todo>
				})
			}
		</ul>
	)
}