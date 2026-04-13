
import { Routes, Route } from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import store from './utils/appStore.js'
import Feed from './components/Feed.jsx'
import Profile from './components/Profile.jsx'
import Connections from './components/Connections.jsx'
function App() {
  return (
    <>
      <Provider store={store}>
      <Routes>
        <Route path='/' element={<Body />} >
            <Route path='/' element={<Feed />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/connections' element={<Connections />} />
        </Route>
      </Routes> 
      </Provider>
    </>
  )
}

export default App
