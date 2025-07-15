import './App.css'
import {Routes, Route, Link} from "react-router-dom";

import About from './About.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';


function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </>
  )
}

export default App
