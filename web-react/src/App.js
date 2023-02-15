import React from "react";
//import React, {useState} from "react";
//import BusinessResults from './BusinessResults';
import BusinessSearch from './BusinessSearch'
import {gql, useQuery} from "@apollo/client"
import './App.css';

const GET_BUSINESSES_QUERY = gql`
`;

function App() {
   return (
   <BusinessSearch />
   );
}

export default App;
