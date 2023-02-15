// no State needed
function BusinessResults(props) {
   const {businesses} = props;
   return (
      <div>
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
            <td>{b.city}</td>
            <td>{b.categories.reduce(
         (acc,c,i)=> acc+ (i===0 ? " " : ", ") + c.name, ""
      )}</td>
      </tr>
      ))}
      </tbody>
      </table>
      </div>
   )
}
export default BusinessResults;
