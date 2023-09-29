import './App.css'
import Banner from './components/Banner'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Titles from './components/Titles'
import Footer from './components/Footer'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getInitialTitles,getTitleTypes } from './redux/titlesSlice'

function App() {

  const dispatch= useDispatch();

  useEffect(()=>{
      dispatch(getInitialTitles({list: 'most_pop_movies',limit:48,year:2022}))
      dispatch(getTitleTypes())
  } ,[])

  return (
    <div className=' h-full'>
          <Banner></Banner>
          <SearchBar/>
          <Filters/>
          <Titles/>
          <Footer/>
    </div>
  )
}

export default App
