import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Define crop data
const cropsData = {
  tomato: {
    name: 'Tomato',
    info: 'Tomato cultivation information...',
    imageUrl: 'assets/2.png' // Image URL for tomato
  },
  wheat: {
    name: 'Wheat',
    info: 'Wheat cultivation information...',
    imageUrl: 'assets/1.png' // Image URL for wheat
  },
  potato: {
    name: 'Potato',
    info: 'Potato cultivation information...',
    imageUrl: 'potato.jpg' // Image URL for potato
  }
  // Add more crops as needed
};

const CropButton = ({ crop, onClick }) => (
  <button className="crop-button" onClick={onClick} style={{ border: 'none', padding: '10px' }}>
    <img src={crop.imageUrl} alt={crop.name} className="img-fluid" style={{ borderRadius: '8px', margin: '8px' }} /> {/* Add Bootstrap class img-fluid for responsive images */}
  </button>
);

const CropInfo = ({ crop }) => (
  <div className="crop-info">
    <h2>{crop.name}</h2>
    <p>{crop.info}</p>
  </div>
);

const Crops = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="crop-buttons d-flex flex-wrap">
            {Object.keys(cropsData).map((cropKey) => (
              <CropButton
                key={cropKey}
                crop={cropsData[cropKey]}
                onClick={() => handleCropClick(cropsData[cropKey])}
              />
            ))}
          </div>
        </div>
        <div className="col">
          {selectedCrop && <CropInfo crop={selectedCrop} />}
        </div>
      </div>
    </div>
  );
};

export default Crops;
