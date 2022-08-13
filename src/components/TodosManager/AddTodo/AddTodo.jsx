import './AddTodo.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SubmitButton from '../../SubmitButton/SubmitBurron';
import { useDispatch } from 'react-redux';
import { addTodoReqAction } from '../../../store/actions';
import { useState } from 'react';

export default function AddTodo() {
	const dispatch = useDispatch();
	// const [taskValue, setTaskValue] = useState('')

	function saveValue(values) {
		const todo = {
			...values,
			status: false,
			discription: ''
		}
		// dispatch(addTodoReqAction(todo));

		

		console.log(todo)
	}

	function validation(values) {
		const errors = {};

		if(!values.task.length) {
			errors.task = 'Fiels is required'; 
		}

		return errors
	}
	
	return (
		<Formik
			onSubmit={saveValue}
			validate={validation}
			enableReinitialize={true}
			initialValues={{task: 123}}
		>
			<Form className='task__add-task-form'>
				<Field type='text' name='task' className='add-task-form__input'></Field>
				<SubmitButton fieldName={'task'} btnValue={<span></span>} classes={'add-task-form__btn'}></SubmitButton>				
			</Form>
		</Formik>
	)
}