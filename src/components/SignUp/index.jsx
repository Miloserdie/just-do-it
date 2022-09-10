import './style.scss'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { updateProfile } from "firebase/auth";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {emailAuthReq, emailRegisterReq, googleAuthReq} from "../../api/authApi";
import createUserReq, {getUserReq} from "../../api/usersApi";
import {useEffect, useState} from "react";

export default function SignUp() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [errorBoard ,setErrorBoard] =useState('');
    const [isUserCreated, setIsUserCreated] = useState(null);
    const [activeError, setActiveError] =useState('');
    const navigate = useNavigate();

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

    const formInitialValues = {
        login: '',
        email: '',
        password: ''
    }

    function validation({email, password, login}) {
        const errors = {};

        if(login.length < 3 ) {
            errors.login = 'Логін має бути довжиною від 3 до 16 символів';
        }

        if(password.length < 6 || password.length > 32) {
            errors.password = 'Пароль має бути довше 6 та не довше 32 символів';
        }

        return errors
    }

    async function handleSubmit({email, password, login}, {resetForm}) {
        try {
            const res = await emailRegisterReq(email, password);

            await createUserReq(res.user.uid);

            await updateProfile(res.user, {
                displayName: login
            })

            const user = {
                name: res.user.displayName,
                uid: res.user.uid
            }

            localStorage.setItem('user', JSON.stringify(user));

            resetForm();

            setActiveError('');

            navigate('/todos');
        } catch (error) {
            if(error.message.includes('email-already-in-use')) {
                setErrorBoard('Ця пошта вже використувується, спробуйте увійти')

                setActiveError('active');
            }
            console.log(error.message)
        }
    }

    useEffect(() => {
        async function checkUser() {
            const isUserCreated = await getUserReq(currentUser?.uid);

            setIsUserCreated(isUserCreated);
        }
        checkUser();
    }, [currentUser]);

    return !isUserCreated? (
        <section className="sign">
            <div className={`error-board ${activeError}`}>{errorBoard}</div>
            <Helmet title="Зареєструватись | Just Do It" />
            <div className="sign__board">
                <h2 className="sign__title">Just Do It</h2>
                <button className="sign__google" onClick={googleAuth}><span>Зареєструватись через Google</span></button>
                <p className="sign__or-line">АБО</p>
                <Formik
                    onSubmit={handleSubmit}
                    validate={validation}
                    initialValues={formInitialValues}
                >
                    {(formik) => (
                        <Form className="sign__form">
                            <div className="sign__login form-item">
                                <label htmlFor="sign__email">Логін</label>
                                <Field placeholder="типу, User" name="login" type="text" id="sign__email"/>
                                <ErrorMessage className='sign__error' name='login' component='span' />
                            </div>
                            <div className="sign__email form-item">
                                <label htmlFor="sign__email">Email</label>
                                <Field placeholder="типу, user@example.com" name="email" type="email" id="sign__email"/>
                            </div>
                            <div className="sign__password form-item">
                                <label htmlFor="sign__password">Пароль</label>
                                <Field placeholder="типу, ******" name="password" type="password" id="sign__password"/>
                                <ErrorMessage className='sign__error' name='password' component='span' />
                            </div>
                            <button className="sign__button" >Приєднатися</button>
                        </Form>
                    )

                    }
                </Formik>
                <Link className="sign__sign-in-link" to='/signin'>Вже є акаунт? <span>Увійдіть.</span></Link>
            </div>
        </section>
    ) : (
        <Navigate replace to='/todos' />
    )
}