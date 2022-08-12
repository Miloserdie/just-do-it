import './Todo.scss'

export default function Todo({todo}) {
	const status = todo.status ? 'done' : 'in-progress';
	
	return (
		<li className="item-tasks">
			<div className={`item-tasks__status-info ${status}`}>
				<button className='item-tasks__status-btn'></button>
			</div>
			<div className="item-tasks__text">
				<h5 className="item-tasks__title">{todo.task}</h5>
				<p className="item-tasks__discription">{todo.discription}</p>
			</div>
			<div className="item-tasks__options">
				<input name="options" className="item-tasks__options-checkbox" type="checkbox" id={`options-checkbox-${todo.id}`}/>
				<label className="item-tasks__options-label" htmlFor={`options-checkbox-${todo.id}`}>
					<div className='item-options'></div>
					<ul className='item-tasks__options-dropdown'>
						<li className='item-dropdown'>Редагувати</li>
						<li className='item-dropdown item-dropdown_delete'>Видалити</li>
					</ul>
				</label>
			</div>
		</li>
	)
}