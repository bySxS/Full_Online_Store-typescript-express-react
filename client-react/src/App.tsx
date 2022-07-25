import React from 'react'
import {
  BrowserRouter, Routes, Route, Navigate
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import Header from './components/header/header'
import { ModuleName } from './constants/page'
// import Loader from './components/UI/Loader/loader'
import AdminPanel from './pages/adminPanel/adminPanel'

const store = setupStore()

function App () {
  return (
    <Provider store={ store }>
    <BrowserRouter>
      <div className="App">
        <div className="main__bg"></div>
        <div className="main__bg layer1"></div>
        <div className="main__bg layer2"></div>
        <Header/>
        <Routes>
          <Route path={'/'}
                 element={<Navigate to={`/${ModuleName.ADMIN_PANEL}`} />}/>
          <Route path={`/${ModuleName.ADMIN_PANEL}`}
                 element={<AdminPanel/>}/>
          {/* <Route path={`/${ModuleName.MOVIES}/:id`} */}
          {/*       element={<MovieDetails modulePage={ModuleName.MOVIES}/>}/> */}
          {/* <Route path={`/${ModuleName.FAVOURITE_MOVIES}`} */}
          {/*       element={<FavouriteMovies/>}/> */}
          {/* <Route path={`/${ModuleName.FAVOURITE_MOVIES}/:id`} */}
          {/*       element={<MovieDetails modulePage={ModuleName.FAVOURITE_MOVIES}/>}/> */}
          {/* <Route path={'/loader'} */}
          {/*       element={<Loader/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App