
import { Routes, Route } from 'react-router-dom'
import Body from './Body.jsx'
import Login from './Login.jsx'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Body />} >
            <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
