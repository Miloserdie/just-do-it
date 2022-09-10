import '../SignUp/style.scss'
import {Formik, Form, Field} from 'formik'
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {emailAuthReq, googleAuthReq} from "../../api/authApi";
import createUserReq from "../../api/usersApi";
import {useState} from "react";

export default function SignIn() {
    const navigate = useNavigate();
    const [errorBoard ,setErrorBoard] =useState('');
    const [activeError, setActiveError] =useState('');

    const formInitialValues = {
        email: '',
        password: ''
    }

    async function googleAuth() {
        const res = await googleAuthReq();

        await createUserReq(res.user.uid);

        const user = {
            name: res.user.displayName,
            uid: res.user.uid
        }

        localStorage.setItem('user', JSON.stringify(user));

        navigate('/todos');
    }

    async function handleSubmit({email, password}, {resetForm}) {
        try {
            const res = await emailAuthReq(email, password);

            const user = {
                name: res.user.displayName,
                uid: res.user.uid
            }

            localStorage.setItem('user', JSON.stringify(user));

            resetForm();

            setActiveError('');

            navigate('/todos');
        } catch (error) {
            console.log(error);

            if (error.message.includes('wrong-password')) {
                setErrorBoard('Пароль введено не вірно та нажаль змінювати його поки що не можна((  Можливо перед цим ви заходили за допомогою кнопки "Увійти через Google"?')

                setActiveError('active');
            }
            if (error.message.includes('user-not-found')) {
                setErrorBoard('Користувача з такою поштою не знайдено! Зареєструйтесь, або увійдіть через Google.')

                setActiveError('active');
            }

        }
    }

    return (
        <section className="sign">
            <div className={`error-board ${activeError}`}>{errorBoard}</div>
            <Helmet title="Увійти | Just Do It" />
            <div className="sign__board">
                <h2 className="sign__title">Just Do It</h2>
                <button onClick={googleAuth} className="sign__google"><span>Увійти через Google</span></button>
                <p className="sign__or-line">АБО</p>
                <Formik
                    onSubmit={handleSubmit}
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
                            <button className="sign__button" >Увійти</button>
                        </Form>
                    }
                </Formik>
                <Link className="sign__sign-in-link" to='/signup'>Немає акаунту? <span>Зареєструйтесь.</span></Link>
            </div>
        </section>
    )
}