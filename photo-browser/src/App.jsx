import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoList from './Pages/PhotoList';
import PhotoDetail from './Pages/PhotoDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photo-browser" element={<PhotoList />} />
        <Route path="/photo-browser/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
