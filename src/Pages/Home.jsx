import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Features from '../components/Explainer'
import Filter from '../components/filter'
import Profiles from '../components/Profiles'

function Home() {

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

export default Home
