import './ModalForTodo.scss'
import Modal from '../../../Modal/Modal'
import { Formik, Form, Field } from 'formik'

export default function ModalForTodo({todo, active, setActive}) {
	const status = todo.status ? 'done' : 'in-progress';

	return (
		<Modal active={active} setActive={setActive}>
				<Formik
								initialValues={todo}
							>
								{() => (
									<Form>
										<div className={`modal__top ${status}`}>
											<div className='modal__top-head'>
												<h3 className='modal__top-title'>Редагувати Завдання</h3>
												<div className='modal__top-btns'>
													<button className='modal-cansel-btn modal-btn'>Скасувати</button>
													<button className='modal-save-btn modal-btn'>Зберегти</button>
												</div>
											</div>
											<div className='modal__top-body'>
												<h6 className='modal__task-title'>Назва*</h6>
												<Field type='text' name='task' className={`modal__input-task modal__input ${status}`} placeholder='Додати назву' />
												<h6 className='modal__discription-title'>Примітка</h6>
												<Field as='textarea' name='discription' className={`modal__input-discription modal__input ${status}`} placeholder='Додати примітку' />
											</div>
										</div>
										<div className='modal__bottom'>
											<div className='modal__bottom-btn'>
												<button className='modal-delete-btn modal-btn'><span>Видалити завдання</span></button>
											</div>
										</div>
									</Form>
								)}
						</Formik>
		</Modal>
	)
}