import './style.scss';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import {addTodoReqAction} from "../../../store/reducer";

export default function AddTodoForm() {
	const currentUser = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();

	function makeTodo(values) {
		if(!values.task.trim()) {
			return;
		}

		const date = new Date().toLocaleString();

		const todo = {
			task: values.task.trim(),
			status: false,
			description: '',
			id: Math.random().toString(20).substring(2),
			createdDate: `${date.substring(0, 10)} ${date.substring(11)}`
		}

		dispatch(addTodoReqAction(todo, currentUser.uid));
	}
	
	return (
		<Formik
			initialValues={{task: ''}}
		>
			{formik => (
				<Form 
				className='add-task-form'
				onSubmit={(e) =>{
					e.preventDefault()
					makeTodo(formik.values)
					formik.resetForm({task: ''})
					
				}}>
					<Field placeholder='Швидке створення' type='text' name='task' className='add-task-form__input'></Field>
					<button className='add-task-form__btn'  disabled={!formik.dirty || !formik.isValid} type='submit'><span></span></button>
				</Form>
			)}
		</Formik>
	)
}