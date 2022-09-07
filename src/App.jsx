import './App.css';
import TodosManager from './components/TodosManager';
import {Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
	<Routes>
       <Route path='' element={<Navigate replace to='signup'/>}/>
       <Route path='/signup' element={<SignUp />} />
       <Route path='/signin' element={<SignIn />} />
       <Route path='/todos' element={<TodosManager />} />
   </Routes>
  );
}

export default App;
