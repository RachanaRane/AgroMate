
import './App.css';
import BgImg from './Components/BgImg';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';



function App() {
  return (
    <div className="App">
     <Navbar/>
     <BgImg/>
     <div className='container' style={{ paddingTop:'60px' }}>
     <Menu/>
     </div>
    </div>
  );
}

export default App;
