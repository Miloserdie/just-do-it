import './style.scss'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const auth = getAuth();

    function logOut () {
        signOut(auth);

        localStorage.clear();

        navigate('/signup');
    }

    return (
        <header className="header">
            <h2 className="header__title">Just Do It</h2>
            <div className="header__right">
                <p className="header__username">Вітаємо, <span>{currentUser?.name}</span></p>
                <button onClick={logOut} className="header__logout"></button>
            </div>
        </header>
    )
}