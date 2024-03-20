import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post('http://127.0.0.1:5002/forms', {  // Update the URL
        Nitrogen: formData.get('Nitrogen'),
        Phosphorus: formData.get('Phosphorus'),
        Potassium: formData.get('Potassium'),
        Temperature: formData.get('Temperature'),
        Humidity: formData.get('Humidity'),
        ph: formData.get('ph'),
        Rainfall: formData.get('Rainfall')
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      <h1>Crop Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Nitrogen" placeholder="Nitrogen" />
        <input type="text" name="Phosphorus" placeholder="Phosphorus" />
        <input type="text" name="Potassium" placeholder="Potassium" />
        <input type="text" name="Temperature" placeholder="Temperature" />
        <input type="text" name="Humidity" placeholder="Humidity" />
        <input type="text" name="ph" placeholder="pH" />
        <input type="text" name="Rainfall" placeholder="Rainfall" />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;