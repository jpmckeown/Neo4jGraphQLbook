import {useState} from "react";
function BusinessSearch() {
   const [selectedCategory, setSelectedCategory] = useState("All");
   return (
      <div>
      <h1>Business Search</h1>
   <form>
      <label>
      Select Business Category:
      <select value={selectedCategory}
         onChange={(event)=>setSelectedCategory(event.target.value)}>
      <option value="All">All</option>
      <option value="Library">Library</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Car Wash">Car Wash</option>
      </select>
      </label>
      <input type="submit" value="Submit" />
         </form>
         </div>
   )
}
export default BusinessSearch
