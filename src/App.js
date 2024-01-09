import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useReducer,createContext, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudentsListing from './components/StudentsListing';
import reducer from './reducers/reducer';
import StudentForm from './components/StudentForm';

export const appContext = createContext()

function App() {

  const [data,dispatch]= useReducer(reducer,{students:[],modalOpen:false,editItemId:0})

  console.log(data)

  useEffect(()=>{
    if(localStorage.getItem('students')){
      dispatch({type:"SET_RECORDS",payload:JSON.parse(localStorage.getItem('students'))})
    }
  },[])

  useEffect(()=>{
    if(data.students.length!==0){
      localStorage.setItem('students',JSON.stringify(data.students))
    }
  },[data.students])

  return (
    <BrowserRouter>
      <appContext.Provider value={{data,dispatch}}>
        <div>
            <nav className='navBar'>
                <Link className='navLink' to='/dashboard'>Dashboard</Link>
                <Link className='navLink' to='/'>Scores</Link>
            </nav>
            <button onClick={()=>{dispatch({type:"OPEN_MODAL"})}} className="addRecordButton">+</button>
            <Routes>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/' element={<StudentsListing/>}/>
            </Routes>
            <StudentForm/>
        </div>
      </appContext.Provider>
    </BrowserRouter>
  );
}

export default App;
