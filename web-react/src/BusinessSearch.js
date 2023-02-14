import React, {useState} from "react";
import BusinessResults from "./BusinessResults";
const businesses = [
   {
     businessId: "b1",
      name: "San Mateo Public Library",
     city: "San Francisco",
     address: "55 W 3rd Ave",
     category: "Library",
   },
   {
     businessId: "b2",
     name: "Ducky's Car Wash",
      address: "716 N San Mateo Dr",
     city:"Los Angeles",
     category: "Car Wash",
   },
   {
     businessId: "b3",
     name: "Hanabi",
      address: "723 California Dr",
     city:"Sacramento",
     category: "Restaurant",
   },
];
 
function BusinessSearch(props) {
   const [selectedCategory, setSelectedCategory] = useState([true,true,true]);
   const [selectedCity, setSelectedCity] = useState("All")

   const handleOnChange = (whichCheckboxChange) => {
      const updatedCheckState = selectedCategory.map( (item, index) => {
         return index === whichCheckboxChange ? !item : item
      })
   setSelectedCategory(updatedCheckState);
   }

   const filterBusinesses = () => {
      const categories = ["Library", "Restaurant", "Car Wash"]
      const getSelectedCategories = () => {
         return categories.filter((c, index) => {
            return selectedCategory[index]===true
         })
      }
      const selectedCategories = getSelectedCategories()
      console.log('categories',categories);
      console.log('selectedCatgeories',selectedCategories);
      
      const categoryFiltered =
         businesses.filter( (b)=> {
            return selectedCategories.includes(b.category)
      })
      
      const cityFiltered =
      selectedCity === "All" ? categoryFiltered
         : categoryFiltered.filter((b)=> {
            return b.city === selectedCity;
         })
      return cityFiltered
   }

   return (
      <div>
      <h1>Business Search</h1>
   <form>
      <label>
      Select Business Category:</label>
      {/* <select 
         value={selectedCategory}
         onChange={(event) => setSelectedCategory(event.target.value)}
      >
      <option value="All">All</option>
      <option value="Library">Library</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Car Wash">Car Wash</option>
               </select> */}
               <input
                  type="checkbox"
                  name="Library"
                  value="Library"
                  checked={selectedCategory[0]}
                  onChange={() => handleOnChange(0)}
                  /> <label>Library</label>
   
               <input
                  type="checkbox"
                  name="Restaurant"
                  value="Restaurant"
                  checked={selectedCategory[1]}
                  onChange={() => handleOnChange(1)}
                  /> <label>Restaurant</label>
            
            <input
                  type="checkbox"
                  name="Car Wash"
                  value="Car Wash"
                  checked={selectedCategory[2]}
                  onChange={() => handleOnChange(2)}
                  /> <label>Car Wash</label>

               <label>
      Select Business City:
      <select 
         value={selectedCity}
         onChange={(event) => setSelectedCity(event.target.value)}
      >
      <option value="All">All</option>
      <option value="San Francisco">San Francisco</option>
      <option value="Los Angeles">Los Angeles</option>
      <option value="Sacramento">Sacramento</option>
      </select>               
      </label>
      <input type="submit" value="Submit" />
      </form>
         
         <BusinessResults businesses={filterBusinesses()}
            
 /> 

      </div>
   )
}
export default BusinessSearch
