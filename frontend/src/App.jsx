import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
import Chicken from './pages/Chicken';
import Beef from './pages/Beef';
import Lamb from './pages/Lamb';
import Mutton from './pages/Mutton';
import SeaFood from './pages/SeaFood';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminProducts from './pages/AdminProducts';
import EditProfile from './components/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/checkout" element={
            <Checkout />
          } />
          <Route path="/chicken" element={
            <Chicken />
          } />
          <Route path="/beef" element={
            <Beef />
          } />
          <Route path="/lamb" element={
            <Lamb />
          } />
          <Route path="/mutton" element={
            <Mutton />
          } />
          <Route path="/seaFood" element={
            <SeaFood />
          } />
          <Route path="/admin" element={
            <Login />
          } />
          {/* <Route path="/admin/products" element={
            <AdminProducts />
          } /> */}
          <Route path="/edit-profile" element={
            <EditProfile />
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
