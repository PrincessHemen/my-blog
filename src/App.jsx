import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import CreatePost from './Components/CreatePost/CreatePost'
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <>

    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>  Login</Link>
        <Link to='/create'>  Create Post</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/create' element={ <CreatePost/> }/> 
      </Routes>
    </Router>

    </>
  )
}

export default App
