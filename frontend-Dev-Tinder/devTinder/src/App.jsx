
import { Routes, Route } from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import store from './utils/appStore.js'
import Feed from './components/Feed.jsx'
import Profile from './components/Profile.jsx'
import Connections from './components/Connections.jsx'
import Requests from './components/Requests.jsx'
import Premium from './components/Premium.jsx'
import Chat from './components/Chat.jsx'

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
            <Route path='/requests' element={<Requests />} />
            <Route path='/premium' element={<Premium />} />
            <Route path='/chat/:toUserId' element={<Chat />} />
        </Route>
      </Routes> 
      </Provider>
    </>
  )
}

export default App
