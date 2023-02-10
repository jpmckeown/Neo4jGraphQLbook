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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
