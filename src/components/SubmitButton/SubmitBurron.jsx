import { useFormikContext } from "formik";

export default function SubmitButton({classes, btnValue, fieldName}) {
	const formikContext = useFormikContext();
	// formikContext.isSubmitting
	return (
		<button
			disabled={ !formikContext.dirty || !formikContext.isValid}
			type='submit'
			className={classes}
			onClick={() => formikContext.setFieldValue(fieldName, "")}
		>
			{btnValue}
		</button>
	)
}