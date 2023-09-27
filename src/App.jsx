import './App.css'
import Banner from './components/Banner'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Titles from './components/Titles'
import Paginated from './components/Paginated'
import Footer from './components/Footer'

function App() {

  return (
    <div className='bg-orange-300 h-screen'>
          <Banner></Banner>
          <SearchBar/>
          <Filters/>
          <Titles/>
          <Paginated/>
          <Footer/>
    </div>
  )
}

export default App
