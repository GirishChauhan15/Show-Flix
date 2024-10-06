import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Card from './components/Card/Card.jsx'
import MovieInfo from './components/MovieInfo/MovieInfo.jsx'
import Hero from './components/Hero/Hero.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />}>
        <Route path='' element={<Hero />} />
        <Route path='/search' element={<Card />} />
      </Route>
      <Route path='about-us' element={<AboutUs />} />
      <Route path='movie/:movie_id' element={<MovieInfo />} />
    </Route> 
  )
)


createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>  
)
