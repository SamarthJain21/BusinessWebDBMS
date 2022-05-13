import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import AddItem from './components/UserItem/AddItem'
import Items from './components/UserItem/Items';
import AddTrader from './components/Traders/AddTrader';
import Traders from './components/Traders/Traders';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user/addItem" element={<AddItem />} />
        <Route exact path="/user/items" element={<Items />} />
        <Route exact path="/trader/getTraders" element={<Traders />} />
        <Route exact path="/trader/addTrader" element={<AddTrader />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
