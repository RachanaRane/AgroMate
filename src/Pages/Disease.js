import React, { useState } from 'react';

function Disease() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the uploaded file here (e.g., set it as state)
    setUploadedImage(URL.createObjectURL(file));
  };

  return (
    <div>
      {/* Image with absolute positioning */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' }}>
        <img src="\assets\Cure your crops with our trustable and easy to use AI.png" alt="Crop Detection" style={{ width: '100%', height: '350px' }} />
      </div>

      {/* Text overlay */}
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', zIndex: 1 }}>
        <h2 style={{ fontSize: '40px', margin: 0 }}>Cure your crops with our trustworthy and simple app to use AI</h2>
      </div>

      {/* Content */}
      <div style={{ paddingTop: '400px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginLeft: '230px', fontWeight: 'bold' }}>Get to know the disease in 3 simple steps!</h2>
        <div style={{ background: '#f5f5f5', padding: '20px 0', marginTop: '50px', width: '115.5%', height: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <img src="\assets\Step1.png" alt="Image 1" style={{ width: '50%', margin: '0 10px' }} />
              <div style={{ width: '55%', marginLeft: '70px', fontWeight: 'bold' }}>Click a photo of the leaf of damaged crop</div>
            </div>
            <div>
              <img src="\assets\Arrow.png" alt="Image 2" style={{ width: '40%', margin: '0 10px' }} />
            </div>
            <div>
              <img src="\assets\Step 2.png" alt="Image 3" style={{ width: '50%', margin: '0 10px' }} />
              <div style={{ width: '55%', marginLeft: '70px', fontWeight: 'bold' }}>Upload it on our website</div>
            </div>
            <div>
              <img src="\assets\Arrow.png" alt="Image 4" style={{ width: '40%', margin: '0 10px' }} />
            </div>
            <div>
              <img src="\assets\Step 3.png" alt="Image 5" style={{ width: '50%', margin: '0 10px' }} />
              <div style={{ width: '55%', marginLeft: '70px', fontWeight: 'bold' }}>Get the disease name and solution instantly</div>
            </div>
          </div>
        </div>
        {/* New image below */}
        <img src="\assets\Upload icon.png" alt="New Image" style={{ width: '140px', marginTop: '60px', cursor: 'pointer' }} onClick={handleUpload} />
        <div style={{ fontWeight: 'bold', marginTop: '20px', marginBottom:'200px' }}>Upload image here</div>
        {/* Hidden input for file upload */}
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} accept=".jpg,.png,.jpeg" />
      </div>
      {/* Display uploaded image */}
      <div style={{ fontWeight: 'bold', position: 'absolute', top: '850px', left: 'calc(50% + 70px)', width: '300px', height: '300px', border: '2px solid #000', overflow: 'hidden' }}>
        Result Section-
        {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
        <div style={{ textAlign: 'center', marginTop: '50%', color: 'gray' }}></div>
        )}
        </div>
        </div>
        );
      }

export default Disease;