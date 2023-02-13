
import BusinessResults from './BusinessResults';
import logo from './logo.svg';
import './App.css';

const businesses = [
   {
     businessId: "b1",
     name: "San Mateo Public Library",
     address: "55 W 3rd Ave",
     category: "Library",
   },
   {
     businessId: "b2",
     name: "Ducky's Car Wash",
     address: "716 N San Mateo Dr",
     category: "Car Wash",
   },
   {
     businessId: "b3",
     name: "Hanabi",
     address: "723 California Dr",
     category: "Restaurant",
   },
];
 
function App() {
   return (
   <div>
   <h1>Business Search</h1>
   <form>
      <label>
      Select Business Category:
      <select value="All">
      <option value="All">All</option>
      <option value="Library">Library</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Car Wash">Car Wash</option>
      </select>
      </label>
      <input type="submit" value="Submit" />
   </form>
   <BusinessResults businesses={businesses} />       
   </div>
   );
}

export default App;
