import './style.scss'
import {Formik, Form, Field} from 'formik'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function SignUp() {
    const formInitialValues = {
        email: '',
        password: ''
    }
    return (
        <section className="sign">
            <Helmet title="Зареєструватись | Just Do It" />
            <div className="sign__board">
                <h2 className="sign__title">Just Do It</h2>
                <button className="sign__google"><span>Зареєструватись через Google</span></button>
                <p className="sign__or-line">АБО</p>
                <Formik
                    initialValues={formInitialValues}
                >
                    {
                        <Form className="sign__form">
                            <div className="sign__email form-item">
                                <label htmlFor="sign__email">Email</label>
                                <Field placeholder="типу, example@example.com" name="email" type="email" id="sign__email"/>
                            </div>
                            <div className="sign__password form-item">
                                <label htmlFor="sign__password">Пароль</label>
                                <Field placeholder="типу, ******" name="password" type="password" id="sign__password"/>
                            </div>
                            <button className="sign__button" >Приєднатися</button>
                        </Form>
                    }
                </Formik>
                <Link className="sign__sign-in-link" to='/signin'>Вже є акаунт? <span>Увійдіть.</span></Link>
            </div>
        </section>
    )
}