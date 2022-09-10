import './style.scss'
import {Formik, Form, Field} from 'formik'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {googleAuthReq} from "../../api/authApi";
import createUserReq, {getUserReq} from "../../api/usersApi";
import {useEffect, useState} from "react";

export default function SignUp() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [isUserCreated, setIsUserCreated] = useState(null);
    const navigate = useNavigate();

    const formInitialValues = {
        email: '',
        password: ''
    }

    useEffect(() => {
        async function checkUser() {
            const isUserCreated = await getUserReq(currentUser?.uid);

            setIsUserCreated(isUserCreated);


        }
        checkUser();
    }, [currentUser]);

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
    return !isUserCreated? (
        <section className="sign">
            <Helmet title="Зареєструватись | Just Do It" />
            <div className="sign__board">
                <h2 className="sign__title">Just Do It</h2>
                <button className="sign__google" onClick={googleAuth}><span>Зареєструватись через Google</span></button>
                <p className="sign__or-line">АБО</p>
                <Formik
                    initialValues={formInitialValues}
                >
                    {
                        <Form className="sign__form">
                            <div className="sign__email form-item">
                                <label htmlFor="sign__email">Логін</label>
                                <Field placeholder="типу, User" name="email" type="email" id="sign__email"/>
                            </div>
                            <div className="sign__email form-item">
                                <label htmlFor="sign__email">Email</label>
                                <Field placeholder="типу, user@example.com" name="email" type="email" id="sign__email"/>
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
    ) : (
        <Navigate replace to='/todos' />
    )
}