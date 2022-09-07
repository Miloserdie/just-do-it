import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../../../hooks/useClickOutside';
import ModalForTodo from '../ModalForTodo';
import './style.scss';
import {deleteTodoReqAction, updateTodoReqAction} from "../../../store/reducer";

export default function Todo({todo}) {
	const dispatch = useDispatch();
	const status = todo.status ? 'done' : 'in-progress';
	const [activeEditor, setActiveEditor] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const clickRef = React.useRef();
	useClickOutside(clickRef, () => setActiveEditor(false));

	function changeStatus() {
		const updatedTodo = {
			...todo,
			status: !todo.status,
		}

		dispatch(updateTodoReqAction(todo.id, updatedTodo));
	}

	function onItemClick() {
		setActiveEditor(x => !x);
	}

	function deleteTodo () {
		let question = window.confirm("Ви дійсно бажаєте видалити Завдання?");

		if(question) {
			dispatch(deleteTodoReqAction(todo.id));

			setModalActive(false);
		}
	}

	return (
		<>
			<ModalForTodo onDelete={deleteTodo} todo={todo} active={modalActive} setActive={setModalActive}/>
			<li className="item-tasks">
				<div className={`item-tasks__status-info ${status}`}>
					<button onClick={changeStatus} className={`item-tasks__status-btn ${status}`}></button>
				</div>
				<div className="item-tasks__text">
					<h5 className="item-tasks__title">{todo.task}</h5>
					<p className="item-tasks__discription">{todo.description}</p>
				</div>
				<div className="item-tasks__options">
					<div className="item-tasks__options-btn" onClick={onItemClick} ref={clickRef}>
						<div className='item-options'/>
						{activeEditor &&
							<ul className={`item-tasks__options-dropdown`}>
								<li className='item-dropdown'>
									<button className='edit-btn' onClick={() => setModalActive(true)}><span>Редагувати</span>
									</button>
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