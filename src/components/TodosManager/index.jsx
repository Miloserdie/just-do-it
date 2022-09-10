import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './style.scss'
import AddTodoForm from "./AddTodoForm";
import {getTodosReqAction} from "../../store/reducer";
import TodoList from "./TodoList";
import {Helmet} from "react-helmet";
import {getUserReq} from "../../api/usersApi";
import {Navigate} from "react-router-dom";
import Header from "../Header";

export default function TodosManager() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const todos = useSelector(state => state.todos.todos);
    const taskFilterElem = useRef(null);
    const dispatch = useDispatch();
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [filterStatus, setFilterStatus] = useState('all');
    const [isUserCreated, setIsUserCreated] = useState(true);


    function setActiveFilter(e) {
        if (e.target.classList.contains('tasks-filter__item_active') || !e.target.classList.contains('tasks-filter__item')) {
            return
        }

        for (let i = 0; i <= taskFilterElem.current.children.length; i++) {
            if (taskFilterElem.current.children[i] !== e.target) {
                taskFilterElem.current.children[i]?.classList.remove('tasks-filter__item_active')
            } else {
                taskFilterElem.current.children[i]?.classList.add('tasks-filter__item_active');
            }
        }
    }

    useEffect(() => {
        async function checkUser() {
            try {
                const checkedUser = await getUserReq(currentUser.uid)

                setIsUserCreated(checkedUser);

                dispatch(getTodosReqAction(currentUser?.uid));

                setIsPageLoading(false)
            } catch {
                setIsUserCreated(false);
            }
        }
        checkUser();

        setFilteredTodos(todos);
    }, []);

    useEffect(() => {
        if (filterStatus === 'all') {
            setFilteredTodos(todos);

        } else {
            const newTodos = todos.filter(todo => todo.status === filterStatus);
            setFilteredTodos(newTodos);
        }

    }, [todos, filterStatus]);

    return isUserCreated ? (
        !isPageLoading ?
            <>
                <Header />
                <section className="tasks">
                    <Helmet title="Завдання | Just Do It" />
                    <div className="container">
                        <div className="tasks__content">
                            <div className="tasks__head">
                                <AddTodoForm></AddTodoForm>
                                <div ref={taskFilterElem} className="tasks-filter" onClick={e => setActiveFilter(e)}>
                                    <button className="tasks-filter__item tasks-filter__item_active"
                                            onClick={() => setFilterStatus('all')}>Всі
                                    </button>
                                    <button className="tasks-filter__item" onClick={() => setFilterStatus(true)}>Виконані
                                    </button>
                                    <button className="tasks-filter__item" onClick={() => setFilterStatus(false)}>У процесі
                                    </button>
                                </div>
                            </div>
                            <div className="tasks__title">
                                <h2>Усього завдань:</h2>
                                <p><span>{todos?.length}</span></p>
                            </div>
                            <TodoList filteredTodos={filteredTodos}/>
                        </div>
                    </div>
                </section>
            </>
            : <div className="loader"><h2>Just Do It</h2></div>
    ) : (
        <Navigate replace to='/signup' />
    )
}