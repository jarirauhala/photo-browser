import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoList from './Pages/PhotoList';
import PhotoDetail from './Pages/PhotoList';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PhotoList />} />
      {/* <Route path="/photo-browser" element={<PhotoList />} /> */}
      <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
