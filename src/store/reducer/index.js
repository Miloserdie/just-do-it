import {createSlice} from "@reduxjs/toolkit";
import {addTodoReq, deleteTodoReq, getTodosReq, updateTodoReq} from "../../components/todosApi";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        setTodosAction(state, {payload}) {

            state.todos = payload?.sort((a, b) => {
                a = new Date(a.createdDate);
                b = new Date(b.createdDate);
                return a > b ? -1 : a < b ? 1 : 0;
            });
        },

        updateTodoAction(state, {payload}) {
            for(let i = 0; i <= state.todos.length; i++) {
               if(state.todos[i].id === payload.id) {
                   state.todos.splice(i, 1, payload.todo);
                   return;
               }
            }
        },

        addTodoAction(state, {payload}) {
            state.todos.unshift(payload)
        },

        deleteTodoAction(state, {payload}) {
            state.todos = state.todos.filter((todo) => todo.id !== payload)
        }
    }
});

export default todosSlice.reducer;
export const { setTodosAction, updateTodoAction, addTodoAction, deleteTodoAction } = todosSlice.actions;

export function getTodosReqAction() {
    return async function(dispatch) {
        try{
            const todos = await getTodosReq();

            dispatch(setTodosAction(todos));
        } catch(e) {
            console.warn(e);
        }
    }
}

export function updateTodoReqAction(id, todo) {
    return async function(dispatch) {
        try{
            await updateTodoReq(id, todo);

            dispatch(updateTodoAction({id, todo}));
        } catch(e) {
            console.warn(e);
        }
    }
}

export function addTodoReqAction(todo) {
    return async function(dispatch) {
        try {
            await addTodoReq(todo);

            dispatch(addTodoAction(todo));
        } catch (error) {
            console.log(error);
        }
    }
}

export function deleteTodoReqAction(id) {
    return async function(dispatch) {
        try{
            await deleteTodoReq(id);

            dispatch(deleteTodoAction(id));
        } catch(e) {
            console.warn(e);
        }
    }
}