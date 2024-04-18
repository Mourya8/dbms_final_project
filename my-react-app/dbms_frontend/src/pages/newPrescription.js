import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPrescription = () => {
  const navigate = useNavigate();

  // Sample data for dropdowns
  const doctors = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
  ];

  const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
  ];

  const [prescriptionId, setPrescriptionId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [prescribedItems, setPrescribedItems] = useState([{ productId: '', quantity: '' }]);

  const handleAddItem = () => {
    setPrescribedItems([...prescribedItems, { productId: '', quantity: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...prescribedItems];
    updatedItems[index][field] = value;
    setPrescribedItems(updatedItems);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      prescriptionId,
      patientName,
      doctorId,
      date,
      prescribedItems,
    });

    // Navigate to another page after submission
    navigate('/prescriptions'); // Replace with the path to the prescriptions page
  };

  return (
    <div>
      <h1>New Prescription</h1>
      <div>
        <label>Prescription ID:</label>
        <input type="text" value={prescriptionId} onChange={(e) => setPrescriptionId(e.target.value)} />
      </div>
      <div>
        <label>Patient Name:</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </div>
      <div>
        <label>Doctor:</label>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <h3>Prescribed Items</h3>
        {prescribedItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.productId}
              onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddItem}>+</button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewPrescription;
