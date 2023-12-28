import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import MyProfile from './components/MyProfile';
import Mission from './components/Mission';
import Rockets from './components/Rockets';
import MissionDetails from './components/MissionDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Mission" element={<Mission />}>
            <Route path="Mission-details" element={<MissionDetails />} />
          </Route>
          <Route path="*" element={<h3>No Match</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
