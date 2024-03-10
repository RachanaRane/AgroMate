import React from 'react'
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col">
    <Link to="/disease" className="card h-100">
    <img src="assets/Ai Crop Disease Detection.png" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">AI Crop detection</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      assets/Ai Crop Disease Detection.png
    </Link>
  </div>
  <div className="col">
    <Link to="/news" className="card h-100">
      <img src="assets/Ai Crop Disease Detection (2).png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">News and Updates</h5>
        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      </div>
    </Link>
  </div>
  <div className="col">
    <Link to="/Price" className="card h-100">
      <img src="assets/Ai Crop Disease Detection (1).png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Crop Price Update</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      </div>
    </Link>
  </div>
</div>
    </div>
  )
}
