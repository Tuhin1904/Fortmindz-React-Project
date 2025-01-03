import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/home/HomePage';
import EditEmployee from './components/EditPage/EditEmployee';

function App() {
 
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/edit/:id" element={<EditEmployee/>}/>
      </Routes>
    </>
  )
}

export default App
