import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { deleteTodoReqAction, updateTodoReqAction } from '../../../store/actions';
import ModalForTodo from '../ModalForTodo/ModalForTodo';
import './Todo.scss';

export default function Todo({todo}) {
	const dispatch = useDispatch();
	const status = todo.status ? 'done' : 'in-progress';
	const [activeEditor, setActiveEditor] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const clickRef = React.useRef();
	useClickOutside(clickRef, () => setActiveEditor(false));

	function changeStatus() {
		const updatedTodo = {
			task: todo.task,
			id: todo.id,
			status: !todo.status,
			discription: todo.discription
		}

		dispatch(updateTodoReqAction(todo.id, updatedTodo));
	}

	function onItemClick() {
		setActiveEditor(x => !x);
	}

	function deleteTodo () {
		let question = window.confirm("Ви дійсно хочете видалити Завдання?");

		if(question) {
			dispatch(deleteTodoReqAction(todo.id));
		}
	}
	
	return (
		<>
			<ModalForTodo todo={todo} active={modalActive} setActive={setModalActive}/>
			<li className="item-tasks">
				<div className={`item-tasks__status-info ${status}`}>
					<button onClick={changeStatus} className={`item-tasks__status-btn ${status}`}></button>
				</div>
				<div className="item-tasks__text">
					<h5 className="item-tasks__title">{todo.task}</h5>
					<p className="item-tasks__discription">{todo.discription}</p>
				</div>
				<div className="item-tasks__options">
					<div className="item-tasks__options-btn" onClick={onItemClick} ref={clickRef}>
						<div className='item-options'/>
						{activeEditor && 
							<ul className={`item-tasks__options-dropdown`}>
							<li className='item-dropdown'>
								<button className='edit-btn' onClick={() => setModalActive(true)}><span>Редагувати</span></button>
							</li>
							<li className='item-dropdown'>
								<button className='delete-btn' onClick={deleteTodo}><span>Видалити</span></button>
							</li>
						</ul>
						}
					</div>
				</div>
			</li>
		</>
	)
}