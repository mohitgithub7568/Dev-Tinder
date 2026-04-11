
import { Routes, Route } from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import store from './utils/appStore.js'
import Feed from './components/Feed.jsx'

function App() {
  return (
    <>
      <Provider store={store}>
      <Routes>
        <Route path='/' element={<Body />} >
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
      </Provider>
    </>
  )
}

export default App
