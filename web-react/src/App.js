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
   <h2>Results</h2>
   <table>
   <thead>
      <tr>
      <th>Name</th>
      <th>Address</th>
      <th>Category</th>
      </tr>
   </thead>
   <tbody>
   {businesses.map((b, i) => (
   <tr key={i}>
   <td>{b.name}</td>
   <td>{b.address}</td>
   <td>{b.category}</td>
   </tr>
   ))}
   </tbody>
   </table>
   </div>
   );
}

export default App;
