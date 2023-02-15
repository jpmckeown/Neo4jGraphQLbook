import React, {useState} from "react";
import BusinessResults from "./BusinessResults";
import {gql, useQuery} from "@apollo/client";
import './App.css';
// import BusinessSearch from "./BusinessSearch";
// import React from "react";

const GET_BUSINESSES_QUERY = gql`
   query BusinessesByCategory($selectedCategory: String!){
      businesses(where: {categories_SOME: 
         {name_CONTAINS: $selectedCategory}}) {
         businessId
         name
         address
         categories{
            name
         }
      }
   }
`;

function App() {
   const [selectedCategory, setSelectedCategory] = useState("All");
   const {loading, error, data} = useQuery(GET_BUSINESSES_QUERY);
   if (error) return <p>Error when useQuery</p>
   if (loading) return <p>Loading...</p>

   return (
      <div>
      <h1>Business Search</h1>
      <form>
      <label>Select Business Category:

      <select 
         value={selectedCategory}
         onChange={(event) => setSelectedCategory(event.target.value)}
      >
         <option value="All">All</option>
         <option value="Library">Library</option>
         <option value="Restaurant">Restaurant</option>
         <option value="Car Wash">Car Wash</option>
               </select>
               
      </label>
            <input type="submit" value="Submit" />
      </form>
         
         <BusinessResults businesses={data.businesses} /> 
      </div>
   );
}

export default App;
