import './Todo.scss'

export default function Todo({todo, onUpdate, onDelete}) {
	const status = todo.status ? 'done' : 'in-progress';

	function changeStatus() {
		const updatedTodo = {
			task: todo.task,
			id: todo.id,
			status: !todo.status,
			discription: todo.discription
		}

		onUpdate(todo.id, updatedTodo); 
	}
	
	return (
		<li className="item-tasks">
			<div className={`item-tasks__status-info ${status}`}>
				<button onClick={changeStatus} className={`item-tasks__status-btn ${status}`}></button>
			</div>
			<div className="item-tasks__text">
				<h5 className="item-tasks__title">{todo.task}</h5>
				<p className="item-tasks__discription">{todo.discription}</p>
			</div>
			<div className="item-tasks__options">
				<div className="item-tasks__options-btn">
					<div  className='item-options'></div>
					<ul className='item-tasks__options-dropdown'>
						<li className='item-dropdown'>
							<button className='edit-btn'><span>Редагувати</span></button>
						</li>
						<li className='item-dropdown'>
							<button className='delete-btn' onClick={() => onDelete(todo.id)}><span>Видалити</span></button>
						</li>
					</ul>
				</div>
			</div>
		</li>
	)
}