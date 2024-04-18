import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionDetails = ({ location }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const prescriptionId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      fetch(`http://localhost:8081/prescriptionProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: prescriptionId }),
      })
      .then(response => response.json())
      .then(data => {
        {
          setPrescriptionDetails(data);
          console.log("Prescriptions fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    if (prescriptionId) {
      fetchPrescriptionDetails();
    }
  }, [prescriptionId]);

  if (!prescriptionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header2>Prescriptions</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Prescription Item List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
          {/* Loop over prescriptions and populate table rows */}
          {prescriptionDetails.map(prescription => (
            <tr >
              <td style={{ textAlign: 'center', cursor: 'pointer' }} >
                {prescription.product_id}
              </td>
              <td style={{ textAlign: 'center' }}>{prescription.prescription_date}</td>
              <td style={{ textAlign: 'center' }}>{prescription.patient_id}</td>
              
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
};

export default PrescriptionDetails;
