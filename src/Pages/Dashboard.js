import React from 'react'
import Menu from '../Components/Menu'
import Weather from '../Components/Weather'
import Crops from '../Components/Crops';
import CropPredict from '../Components/CropPredict';
function Dashboard() {
    const apiKey = 'f2994c691c9b43e5ce36ae61e7263e0e';
    const location = { lat: 40.7128, lon: -74.0060 };
  return (
   
    <div>
      <div className='container' style={{ paddingTop:'60px' }}>
     <Menu/>
     </div>
     <Weather apiKey={apiKey} location={location}/>
     <div className='container' style={{ paddingTop:'60px' }}>
      <h3>Crops Information</h3>
     <Crops/>
     </div>
     <CropPredict/>
    </div>
    
  );
}
export default Dashboard;