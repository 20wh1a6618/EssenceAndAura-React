import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import WomenPerfume from './WomenPerfume';
import MenPerfume from './MenPerfume';
import Cart from './Cart';
import PurchaseHistory from './PurchaseHistory';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const cart = useSelector((state) => state.cart); // Assuming cart is an object
  const totalItems = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0; // Access items array

  return (
    <BrowserRouter>
      <nav>
        <Link to='/home'>Home</Link>
        <Link to='/womenperfume'>WomenPerfume</Link>
        <Link to='/menperfume'>MenPerfume</Link>
        <Link to='/cart'>Cart({totalItems})</Link>
        <Link to='/purchasehistory'>PurchaseHistory</Link>
        <Link to='/aboutus'>AboutUs</Link>
        <Link to='/contactus'>ContactUs</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/womenperfume" element={<WomenPerfume />} />
        <Route path="/menperfume" element={<MenPerfume />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchasehistory" element={<PurchaseHistory />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

