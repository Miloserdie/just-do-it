import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './style.scss'
import AddTodoForm from "./AddTodoForm";
import {getTodosReqAction} from "../../store/reducer";
import TodoList from "./TodoList";
import {Helmet} from "react-helmet";

export default function TodosManager() {
    const todos = useSelector(state => state.todos.todos);
    const taskFilterElem = useRef(null)
    const dispatch = useDispatch();
    const [filteredTodos, setFilteredTodos] = useState(todos)
    const [filterStatus, setFilterStatus] = useState('all')


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
        function getTodos() {
            dispatch(getTodosReqAction());
        }

        setFilteredTodos(todos);
        getTodos();
    }, [dispatch]);

    useEffect(() => {
        if (filterStatus === 'all') {
            setFilteredTodos(todos);

        } else {
            const newTodos = todos.filter(todo => todo.status === filterStatus);
            setFilteredTodos(newTodos);
        }

    }, [todos, filterStatus]);

    return (
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
    )
}