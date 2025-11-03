import React from 'react';
import './LoadsTable.css';

const LoadsTable = ({ loads }) => {
  return (
    <section className="loads-section">
      <h2>Latest Loads are displayed here</h2>
      
      <div className="table-container">
        <table className="loads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Credit</th>
              <th>AC Balance</th>
              <th>UTR/RRN</th>
              <th>AC No./UPI</th>
            </tr>
          </thead>
          <tbody>
            {loads.map((load, index) => (
              <tr key={index}>
                <td>{load.date}</td>
                <td>{load.credit}</td>
                <td>{load.acBalance}</td>
                <td>{load.utr}</td>
                <td>{load.acDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LoadsTable;