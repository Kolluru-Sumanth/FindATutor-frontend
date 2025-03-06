import Home from './Pages/Home'
import './App.css'
import Filter from './Pages/Filter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TutorProfileForStudent from './Pages/TutorProfileForStudent'
import TutorDashboard from './Pages/TutorDashboard'
import StudentDashboard from './Pages/StudentDashboard'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path='/tutor' element={<TutorProfileForStudent/>}/>
        <Route path='TutorDashboard' element={<TutorDashboard/>}/>
        <Route path='StudentDashboard' element={<StudentDashboard/>}/>
        {/* payment page */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
