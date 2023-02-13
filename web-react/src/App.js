import React, {useState} from "react";
import BusinessResults from './BusinessResults';
// import BusinessSearch from './BusinessSearch'
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
   const [selectedCategory, setSelectedCategory] = useState("All")
   return (
   <div>

   
   <BusinessResults businesses={
      selectedCategory === "All" ? businesses
         : businesses.filter((b)=> {
      return b.category === selectedCategory;
   })} />       
   </div>
   );
}

export default App;
