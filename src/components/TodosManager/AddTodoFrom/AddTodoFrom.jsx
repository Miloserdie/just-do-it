import './AddTodoFrom.scss';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import {addTodoReqAction} from "../../../store/reducer";

export default function AddTodoFrom() {
	const dispatch = useDispatch();

	function makeTodo(values) {
		if(!values.task.trim()) {
			return;
		}

		const date = new Date().toLocaleString();

		const todo = {
			task: values.task.trim(),
			status: false,
			discription: '',
			id: Math.random().toString(20).substring(2),
			createdDate: `${date.substring(0, 10)} ${date.substring(11)}`
		}

		dispatch(addTodoReqAction(todo));
	}
	
	return (
		<Formik
			initialValues={{task: ''}}
		>
			{formik => (
				<Form 
				className='task__add-task-form'
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