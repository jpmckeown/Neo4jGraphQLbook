import React, {useState} from "react";
import BusinessResults from "./BusinessResults";
import {gql, useQuery} from "@apollo/client";
import {useAuth0} from "@auth0/auth0-react";

// import './App.css';
// import BusinessSearch from "./BusinessSearch";

const BUSINESS_DETAILS_FRAGMENT = gql`
   fragment businessDetails on Business {
      businessId
      name
      address
      categories {
         name
      }
   }
`;
// const USER_DETAILS_FRAGMENT = gql`
//    fragment userDetails on User{
//       userId
//       name
//    }
// `;
// const REVIEW_DETAILS_FRAGMENT = gql`
//    fragment reviewDetails on Review{
//       reviewId
//       stars
//       text
//    }
// `;

const GET_BUSINESSES_QUERY = gql`
   query BusinessesByCategory($selectedCategory: String!){
      businesses(where: {
         categories_SOME: {
            name_CONTAINS: $selectedCategory
         }
      }) {
         ...businessDetails
         isStarred @client
      }
   }
   ${BUSINESS_DETAILS_FRAGMENT}
`;

// const GET_USERS_QUERY = gql`
// `;

function App() {
   const [selectedCategory, setSelectedCategory] = useState("");
   const {loginWithRedirect, logout, isAuthenticated} = useAuth0();

   const {loading, error, data, refetch} = useQuery(
      GET_BUSINESSES_QUERY, {
      variables: {selectedCategory},
      // pollInterval: 3000
   });
   //console.log(refetch);

   if (error) return <p>Error when useQuery</p>
   if (loading) return <p>Loading...</p>

   return (
      <div>
         {!isAuthenticated && (
            <button onClick={()=> loginWithRedirect()}>Log In</button>
         )}
         {isAuthenticated && (
            <button onClick={() => logout()}>Log Out</button>
         )}
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
      <input type="button" value="Refetch" onClick={()=>refetch()} />
      </form>
         
         <BusinessResults businesses={data.businesses} /> 
      </div>
   );
}

export default App;
