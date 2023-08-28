import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';
import MyProfile from './components/MyProfile';
import Mission from './components/Mission';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Mission" element={<Mission />} />
          <Route path="*" element={<h3>No Match</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
