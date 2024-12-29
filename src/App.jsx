import SearchBar from './components/SearchBar'
import Header from './components/Header'
import Footer from './components/Footer'
import Features from './components/Explainer'
import Filter from './components/filter'
import Space from './components/space'
import Profiles from './components/Profiles'
import './App.css'

function App() {

  return (
    <div>
      <Header />
      <SearchBar/>
      <Filter />
      <Profiles />
      <Features />
      <Footer />
    </div>
  )
}

export default App
