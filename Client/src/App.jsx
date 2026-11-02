
import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetails';

const App = () =>{
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
