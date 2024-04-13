import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
`;

const Header2 = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

function App() {
  // Define state variables for login and active dashboard tab
  const [loggedIn, setLoggedIn] = useState(true); // Set to true for testing purposes
  const [activeTab, setActiveTab] = useState('home');

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    //new pages are to be added here.
    // switch(tab){
    //   case 'home':
    //     processHome();
    //     break;
    //   case 'prescriptions':
    //     processPrescriptions();
    //     break;
    //   case 'inventory':
    //     processInventory();
    //     break;
    //   case 'hospitals':
    //     processHospitals();
    //     break;
    //   case 'patients':
    //     processPatients();
    //     break;
    //   case 'machines':
    //     processMachines();
    //     break;
    //   case 'products':
    //     processProducts();
    //     break;
    //   case 'doctors':
    //     processDoctors();
    //     break;
    //   case 'logs':
    //     processLogs();
    //     break;
      
    // }
  };

  const prescriptions = [
    {
      id: 12345,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      medication: 'Aspirin',
      quantity: 2,
      date: '2024-02-03',
      hospital: 'ABC Hospital'
    },
    // Add more prescription objects as needed
  ];
  
  // Render dashboard if logged in
  return (
    <Container>
      <Header>MediHub</Header>
      <nav style={{ display: 'flex', justifyContent: 'center' }}> 
        <Button onClick={() => handleTabChange('home')}>Home</Button>
        <Button onClick={() => handleTabChange('prescriptions')}>Prescriptions</Button>
        <Button onClick={() => handleTabChange('inventory')}>Inventory</Button>
        <Button onClick={() => handleTabChange('users')}>Patients</Button>
        <Button onClick={() => handleTabChange('settings')}>Settings</Button>
        <Button onClick={() => setLoggedIn(false)}>Logout</Button>
      </nav>
      <ContentContainer>
        {activeTab === 'home' && (
          <>
            <Header2>Welcome to the Dashboard!</Header2>
            {/* Content for Home section */}
          </>
        )}
{activeTab === 'prescriptions' && (
  <>
    <Header2>Prescriptions</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
    </div>
    <p>Prescription List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Prescription ID</th>
          <th>Patient Name</th>
          <th>Doctor Name</th>
          <th>Medication</th>
          <th>Quantity</th>
          <th>Prescription Date</th>
          <th>Hospital/Clinic</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {/* Loop over prescriptions and populate table rows */}
          {prescriptions.map(prescription => (
            <tr key={prescription.id}>
              <td style={{ textAlign: 'center' }}>{prescription.id}</td>
              <td style={{ textAlign: 'center' }}>{prescription.patientName}</td>
              <td style={{ textAlign: 'center' }}>{prescription.doctorName}</td>
              <td style={{ textAlign: 'center' }}>{prescription.medication}</td>
              <td style={{ textAlign: 'center' }}>{prescription.quantity}</td>
              <td style={{ textAlign: 'center' }}>{prescription.date}</td>
              <td style={{ textAlign: 'center' }}>{prescription.hospital}</td>
              <td>
                {/* Buttons for actions */}
                <a href="#">Edit</a>
                <span style={{ margin: '0 5px' }}>|</span>
                <a href="#">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    {/* Actions for Doctors and Administrators */}
    <Button>Add New Prescription</Button>
  </>
)}


{activeTab === 'inventory' && (
  <>
    <Header2>Inventory</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
    </div>
    <p>Inventory List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Machine</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Dummy inventory records */}
        <tr>
          <td style={{ textAlign: 'center' }}>Widget A</td>
          <td style={{ textAlign: 'center' }}>Widget</td>
          <td style={{ textAlign: 'center' }}>10</td>
          <td style={{ textAlign: 'center' }}>Machine 1</td>
          <td style={{ textAlign: 'center' }}>2024-02-03</td>
          <td style={{ textAlign: 'center' }}>
            {/* Buttons for actions */}
            <a href="#">Edit</a>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#">Delete</a>
          </td>
        </tr>
        {/* Add more dummy inventory records as needed */}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button>Add New Inventory Item</Button>
  </>
)}

{activeTab === 'users' && (
  <>
    <Header2>Patients</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
    </div>
    <p>User List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Hospital/Clinic</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Dummy user records */}
        <tr>
          <td style={{ textAlign: 'center' }}>JohnDoe</td>
          <td style={{ textAlign: 'center' }}>Doctor</td>
          <td style={{ textAlign: 'center' }}>ABC Hospital</td>
          <td style={{ textAlign: 'center' }}>2024-02-03 10:30 AM</td>
          <td style={{ textAlign: 'center' }}>
            {/* Hyperlinks for actions */}
            <a href="#">Edit</a>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#">Delete</a>
          </td>
        </tr>
        {/* Add more dummy user records as needed */}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button>Add New User</Button>
  </>
)}

{activeTab === 'settings' && (
  <>
    <Header2>Settings</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>User Settings:</p>
      <ul>
        <li>Change Password</li>
        <li>Update Profile</li>
      </ul>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <p>System Settings (For Administrators):</p>
      <ul>
        <li>Manage Hospitals/Clinics</li>
        <li>Manage Doctors</li>
        <li>Manage Permissions</li>
      </ul>
    </div>
  </>
)}

      </ContentContainer>
      <Footer>
        Copyright Information
        <br />
        Contact Information
        <br />
        Privacy Policy
        <br />
        Terms of Service
      </Footer>
    </Container>

  );
}

export default App;
