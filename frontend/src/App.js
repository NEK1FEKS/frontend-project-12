import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.js';
import Page404 from './Components/Page404.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
