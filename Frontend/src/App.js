import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/homepage/Home';
import RestaurantDetails from './components/Details/RestaurantDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Filter from './components/filter/Filter';

function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/details/:rName" element={<RestaurantDetails/>}/>
      <Route path="/filter/:type" element={<Filter/>}/>
     </Routes>
    </div> 
  );
}

export default App;
