import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function DiseasePredict() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Set imageUrl to preview the uploaded image
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://127.0.0.1:5001/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container"> {/* Add Bootstrap container class */}
      <h1 className="mt-5 mb-4">Plant Disease Recognition</h1> {/* Add Bootstrap margin classes */}
      
      {/* Add image preview */}
      {imageUrl && (
        <div className="mb-3">
          <img src={imageUrl} alt="Uploaded Image" className="img-thumbnail" style={{ maxWidth: '400px' }} /> {/* Increased the max width */}
        </div>
      )}

      <input type="file" onChange={handleFileChange} className="mb-3" /> {/* Add Bootstrap margin class */}
      <button onClick={handleSubmit} className="btn btn-primary mr-2">Predict</button> {/* Add Bootstrap button classes */}
      {result && <p className="mt-3 alert alert-success">{result}</p>} {/* Added alert class for result and changed the color */}

    </div>
  );
}

export default DiseasePredict;
