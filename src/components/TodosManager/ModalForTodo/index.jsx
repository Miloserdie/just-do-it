import './style.scss'
import Modal from '../../../Modal/Modal'
import {Formik, Form, Field} from 'formik'
import {useDispatch} from 'react-redux';
import {updateTodoReqAction} from "../../../store/reducer";

export default function ModalForTodo({todo, active, setActive, onDelete}) {
	const currentUser = JSON.parse(localStorage.getItem('user'));
	const status = todo.status ? 'done' : 'in-progress';
	const dispatch = useDispatch();

	function canselChanges(formik) {
		setActive(false);

		formik.resetForm(todo);
	}

	function saveTodo(values) {
		dispatch(updateTodoReqAction(todo.id, values, currentUser.uid));

		setActive(false);
	}

	return (
		<Modal active={active} setActive={setActive}>
			<Formik
				initialValues={todo}
				enableReinitialize={true}
			>
				{(formik) => (
					<Form onSubmit={(e) => {
						e.preventDefault();
					}}>
						<div className={`modal__top ${status}`}>
							<div className='modal__top-head'>
								<h3 className='modal__top-title'>Редагувати Завдання</h3>
								<div className='modal__top-btns'>
									<button className='modal-cansel-btn modal-btn'
											  onClick={() => canselChanges(formik)}>Скасувати
									</button>
									<button disabled={formik.isSubmitting || !formik.dirty || !formik.isValid} onClick={() => saveTodo(formik.values)}
											  className='modal-save-btn modal-btn'>Зберегти
									</button>
								</div>
							</div>
							<div className='modal__top-body'>
								<h6 className='modal__task-title'>Назва*</h6>
								<Field type='text' name='task' className={`modal__input-task modal__input ${status}`}
										 placeholder='Додати назву'/>
								<h6 className='modal__description-title'>Примітка</h6>
								<Field as='textarea' name='description'
										 className={`modal__input-description modal__input ${status}`}
										 placeholder='Додати примітку'/>
							</div>
						</div>
						<div className='modal__bottom'>
							<div className='modal__bottom-btn'>
								<button className='modal-delete-btn modal-btn' onClick={() => onDelete()}>
									<span>Видалити завдання</span>
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}