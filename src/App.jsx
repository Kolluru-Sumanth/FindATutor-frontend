import Home from './Pages/Home'
import './App.css'
import Filter from './Pages/Filter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TutorProfileForStudent from './Pages/TutorProfileForStudent'
import TutorDashboard from './Pages/TutorDashboard'
import StudentDashboard from './Pages/StudentDashboard'
import Header from './components/Header'
import CustomPaymentForm from './Pages/Custompayment'

function App() {

  return (
    <div>
      <BrowserRouter>
            <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path='/tutor/:tutorId' element={<TutorProfileForStudent/>}/>
        <Route path='/TutorDashboard' element={<TutorDashboard/>}/>
        <Route path='/StudentDashboard' element={<StudentDashboard/>}/>
        <Route path='/stripe' element={<CustomPaymentForm/>}/>
        {/* payment page */}
        <Route path='/payment'></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
