import WatchList from './components/WatchList';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Homework: Implement Context API to avoid passing watchList

function App() {
  const [watchList, setWatchList] = useState([])
  
  return (
  <>
    <NavBar />
    <Routes>
      <Route
        path="/" element={<Home watchList={watchList} setWatchList={setWatchList} />}
      />
      <Route
        path="/watchlist"
        element={<WatchList watchList={watchList} setWatchList={setWatchList}  />}
      />
    </Routes>
  </>

  );
}
export default App;