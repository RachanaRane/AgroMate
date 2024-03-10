import React, { useState, useEffect } from 'react';

function Price() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [districtFilter, setDistrictFilter] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data.records || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const applyFilter = () => {
    if (districtFilter.trim() === '') {
      setFilteredData(data.records || []);
      setIsFiltering(false);
    } else {
      const filtered = (data.records || []).filter(item => item.district.toLowerCase() === districtFilter.toLowerCase());
      setFilteredData(filtered);
      setIsFiltering(true);
    }
  };

  const resetFilter = () => {
    setDistrictFilter('');
    setFilteredData(data.records || []);
    setIsFiltering(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Commodity Prices</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            value={districtFilter} 
            onChange={(e) => setDistrictFilter(e.target.value)} 
            placeholder="Filter by District"
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary btn-block" onClick={applyFilter}>Apply Filter</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary btn-block" onClick={resetFilter}>Reset Filter</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>State</th>
            <th>District</th>
            <th>Market</th>
            <th>Commodity</th>
            <th>Variety</th>
            <th>Grade</th>
            <th>Arrival Date</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {isFiltering && filteredData.map(item => (
            <tr key={item.commodity}>
              <td>{item.state}</td>
              <td>{item.district}</td>
              <td>{item.market}</td>
              <td>{item.commodity}</td>
              <td>{item.variety}</td>
              <td>{item.grade}</td>
              <td>{item.arrival_date}</td>
              <td>{item.min_price}</td>
              <td>{item.max_price}</td>
              <td>{item.modal_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Price;
