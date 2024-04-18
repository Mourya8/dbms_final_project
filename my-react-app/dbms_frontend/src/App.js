import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import MessagePopup from './components/MessagePopup';
import NewPrescription from './pages/newPrescription';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

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

function EditModal({ isOpen, onClose, item, onChange, onSave, readOnlyFields = [], editableFields }) {
  if (!isOpen) return null;

  const handleChange = (key, value) => {
    const updatedItem = {...item, [key]: value};
    onChange(updatedItem);  // Send the entire updated item up
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item);
    onClose();
  };
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '30px', borderRadius: '10px',
        width: '90%', maxWidth: '500px', position: 'relative',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '10px', border: 'none',
          background: 'transparent', fontSize: '1.5rem', cursor: 'pointer'
        }}>×</button>
        <form onSubmit={(e) => { e.preventDefault(); onSave(item); }}>
          {Object.keys(item).map(key => (
            <div key={key} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{key.split('_').join(' ')}:</label>
              <input
                type="text"
                value={item[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                readOnly={key.toLowerCase().includes('_id') && !editableFields.includes(key)}  // Making ID fields readOnly, except those specified as editable
              />
            </div>
          ))}
          <button type="submit" style={{
            backgroundColor: '#007bff', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'
          }}>Update</button>
        </form>
      </div>
    </div>
  );
}

function AddModal({ isOpen, onClose, item, onChange, onSave, editableFields }) {
  if (!isOpen) return null;

  const handleChange = (key, value) => {
    const updatedItem = {...item, [key]: value};
    onChange(updatedItem);  // Send the entire updated item up
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item);
    onClose();
  };
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '30px', borderRadius: '10px',
        width: '90%', maxWidth: '500px', position: 'relative',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '10px', border: 'none',
          background: 'transparent', fontSize: '1.5rem', cursor: 'pointer'
        }}>×</button>
        <form onSubmit={(e) => { e.preventDefault(); onSave(item); }}>
          {Object.keys(item).map(key => (
            <div key={key} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{key.split('_').join(' ')}:</label>
              <input
                type="text"
                value={item[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                readOnly={key.toLowerCase().includes('_id') && !editableFields.includes(key)}  // Making ID fields readOnly, except those specified as editable
              />
            </div>
          ))}
          <button type="submit" style={{
            backgroundColor: '#007bff', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'
          }}>Update</button>
        </form>
      </div>
    </div>
  );
}

let prescriptions = [
  {
    prescription_id: 1000000,
    prescription_date: '2024-04-01',
    patient_id: 10001,

  },
];

let inventory = [
  {
    id: 12345,
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    medication: 'Aspirin',
    quantity: 2,
    date: '2024-02-03',
    hospital: 'ABC Hospital'
  },
];

let doctors = [
  {
    doctor_id: 1001,
    doctor_name: 'Dr. Jane Doe',
    hospital_id: 101,
  },
];

let hospitals = [
  {
    hospital_id: 100,
    hospital_zip: 10010,
    hospital_address: '624, Street D, Rochester, NY, USA',
    hospital_name: 'Hospital A',

  },
];

let machines = [
  {
    machine_id: 1,
    machine_zip: 10000,
    machine_address: '780, Street A, Rochester, NY, USA',
    machines_status: 'active',
  },
];

let products = [
  {
    product_id: 100000,
    product_name: 'Product A',
    category: 'Strip',
    uom: 100,

  },
];

let patients = [
  {
    patient_id: 10000,
    patient_name: 'Raymond Yu',
    patient_contact: '(585)682-1650',
    doctor_id: 1000,

  },
];

let userLogs = [

];

function App() {
  // Define state variables for login and active dashboard tab
  const [loggedIn, setLoggedIn] = useState(true); // Set to true for testing purposes
  //const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [editableFields, setEditableFields] = useState([]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [machines, setMachines] = useState([]);
  const [products, setProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [userLogs, setUserLogs] = useState([]);
  useEffect(() => {
    // Your function to run once after npm start
    console.log('Function running just once after npm start');
    processPrescriptions();
    processHospitals();
    processPatients();
    processMachines();
    processProducts();
    processDoctors();
    return () => {
      console.log('Component will unmount');
    };
  }, []); // empty dependency array
  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    

    //new pages are to be added here.
    switch(tab){
      case 'home':
        processHome();
        break;
      case 'prescriptions':
        processPrescriptions();
        break;
      case 'hospitals':
        processHospitals();
        break;
      case 'patients':
        processPatients();
        break;
      case 'machines':
        processMachines();
        break;
      case 'products':
        processProducts();
        break;
      case 'doctors':
        processDoctors();
        break;
      case 'logs':
        processLogs();
        break;
      
    }
  };


  

  const handleAddNewPrescription = () => {
    //navigate('/new-prescription');
  };



  // Handle updating the item in the modal
  const handleItemChange = (updatedItem) => {
    setCurrentItem(updatedItem);
  };

  // Function to handle modal save
  const handleItemSave = (item) => {
    console.log('Saving item:', item);
    // Here you would typically handle the API call or state update
    setEditModalOpen(false);
  };


  // Open modal with item details
  const openEditModal = (item, editableFields) => {
    setCurrentItem(item);  // Set the current item to be edited in the modal
    setEditableFields(editableFields);  // Set which fields should not be read-only
    setEditModalOpen(true);  // Open the modal
  };
  
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openAddModal = (newItem, editableFields) => {
    setCurrentItem(newItem);  // Set the new item structure for the modal
    setEditableFields(editableFields);  // Set which fields are editable
    setAddModalOpen(true);  // Open the add modal
  };
  
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setShowPopup(true);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };


  const openPrescriptionDetails = (prescriptionId) => {
    const url = `/prescription-details?id=${prescriptionId}`;
    window.open(url, '_blank');
  };

  function insertDoctor()
  {
    fetch('http://localhost:8081/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ doctor_id:14000,doctor_name: 'test16', hospital_id: 102})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage('Refresh the table');  // Set success message
        setShowPopup(true);  // Show the popup
        processDoctors();  // Assuming processDoctors is a function to refresh the table
      
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error while inserting');  // Set error message
        setShowPopup(true);  // Show the popup
      
      });
      processDoctors();
  }

  function processHome()
  {

  };

  function processPrescriptions(){
    fetch(`http://localhost:8081/prescriptions`)
      .then(response => response.json())
      .then(data => {
        {
          setPrescriptions(data);
          console.log("Prescriptions fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function processPatients(){
    fetch(`http://localhost:8081/patients`)
      .then(response => response.json())
      .then(data => {
        {
          setPatients(data);
          console.log("Patients fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function processHospitals()
  {
    fetch(`http://localhost:8081/hospitals`)
      .then(response => response.json())
      .then(data => {
        {
          setHospitals(data);
          console.log("Hospitals fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function processMachines()
  {
    fetch(`http://localhost:8081/machines`)
      .then(response => response.json())
      .then(data => {
        {
          setMachines(data);
          console.log("Machines fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function processProducts()
  {
    fetch(`http://localhost:8081/products`)
    .then(response => response.json())
    .then(data => {
      {
        setProducts(data);
        console.log("Products fetched.");}
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


  function processDoctors()
  {
    fetch(`http://localhost:8081/doctors`)
      .then(response => response.json())
      .then(data => {
        {
          setDoctors(data);
          console.log("Doctors fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function processLogs()
  {
    fetch(`http://localhost:8081/user_logs`)
      .then(response => response.json())
      .then(data => {
        {
          setUserLogs(data);
          console.log("User logs fetched.");}
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeleteClick = (table,id) => {
    fetch(`http://localhost:8081/${table}/${id}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
    console.log(`Item with ID ${id} deleted`);
  };

  const handleSearchClick = (table,id) => {
    fetch(`http://localhost:8081/${table}/${id}`, {
      method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
    console.log(`Item with ID ${id} deleted`);
  };
  


 


  // Render dashboard if logged in
  return (
    <Container>
      <Header>MediHub</Header>
      <nav style={{ display: 'flex', justifyContent: 'center' }}> 
        <Button onClick={() => handleTabChange('home')}>Home</Button>
        <Button onClick={() => handleTabChange('prescriptions')}>Prescriptions</Button>
        {/* <Button onClick={() => handleTabChange('inventory')}>Inventory</Button> */}
        
        <Button onClick={() => handleTabChange('doctors')}>Doctors</Button>
        <Button onClick={() => handleTabChange('hospitals')}>Hospitals</Button>
        <Button onClick={() => handleTabChange('machines')}>Machines</Button>
        <Button onClick={() => handleTabChange('products')}>Products</Button>


        <Button onClick={() => handleTabChange('patients')}>Patients</Button>
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
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Prescription List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Prescription ID</th>
          <th>Prescription Date</th>
          <th>Patient ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {/* Loop over prescriptions and populate table rows */}
          {prescriptions.map(prescription => (
            <tr key={prescription.id}>
              <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => openPrescriptionDetails(prescription.prescription_id)}>
                {prescription.prescription_id}
              </td>
              <td style={{ textAlign: 'center' }}>{prescription.prescription_date}</td>
              <td style={{ textAlign: 'center' }}>{prescription.patient_id}</td>
             
              <td style={{ textAlign: 'center' }}>
                {/* Buttons for actions */}
                <button onClick={() => openEditModal(prescription, 'Prescription', ['prescription_date', 'patient_id'])}>Edit</button>
                <span style={{ margin: '0 5px' }}>|</span>
                <a href="#">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    {/* Actions for Doctors and Administrators */}
    <Button onClick={handleAddNewPrescription}>Add New Prescription</Button>
  </>
)}



{activeTab === 'doctors' && (
  <>
    <Header2>Doctors</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
      <Button onClick={processDoctors} style={{ marginLeft: 'auto' }}>
            <FontAwesomeIcon icon={faSyncAlt} />
        </Button>
      </div>
    </div>
    <p>Doctor List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Doctor ID</th>
          <th>Doctor Name</th>
          <th>Hospital ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {/* Loop over doctors and populate table rows */}
          {doctors.map(doctors => (
            <tr key={doctors.doctor_id}>
              <td style={{ textAlign: 'center' }}>{doctors.doctor_id}</td>
              <td style={{ textAlign: 'center' }}>{doctors.doctor_name}</td>
              <td style={{ textAlign: 'center' }}>{doctors.hospital_id}</td>
              
              <td style={{ textAlign: 'center' }}>
                {/* Buttons for actions */}
                <button onClick={() => openEditModal(doctors, 'Doctor', ['doctor_name', 'hospital_id'])}>Edit</button>
                <span style={{ margin: '0 5px' }}>|</span>
                <a href="#"onClick={(e) => { e.preventDefault(); handleDeleteClick("doctors",doctors.doctor_id)}}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button onClick={(e) => { e.preventDefault(); openAddModal({doctor_id: '', doctor_name: '', hospital_id: ''}, ['doctor_id','doctor_name', 'hospital_id']);}}>Add New Doctor Item</Button>
    <MessagePopup 
        showPopup={showPopup} 
        message={message} 
        onClose={() => setShowPopup(false)}  // Close the popup
      />
  </>
)}

{activeTab === 'machines' && (
  <>
    <Header2>Machines</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Machine List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Machine ID</th>
          <th>Machine Zip Code</th>
          <th>Machine Address</th>
          <th>Machine Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Loop over machines and populate table rows */}
        {machines.map(machines => (
        <tr key={machines.machine_id}>
          <td style={{ textAlign: 'center' }}>{machines.machine_id}</td>
          <td style={{ textAlign: 'center' }}>{machines.machine_zip}</td>
          <td style={{ textAlign: 'center' }}>{machines.machine_address}</td>
          <td style={{ textAlign: 'center' }}>Active</td>
          
          <td style={{ textAlign: 'center' }}>
            {/* Buttons for actions */}
            <button onClick={() => openEditModal(machines, 'Machine', ['machine_zip', 'machine_address', 'machine_status'])}>Edit</button>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#"onClick={(e) => { e.preventDefault(); handleDeleteClick("machines",machines.machine_id)}}>Delete</a>
              </td>
        </tr>
        ))}
        {/* Add more dummy inventory records as needed */}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button onClick={(e) => { e.preventDefault(); openAddModal({machine_id: '', machine_zip: '', machine_address: '', machine_status:''}, ['machine_id','machine_zip', 'machine_address', 'machine_status']);}}>Add New Machine Item</Button>
  </>
)}

{activeTab === 'hospitals' && (
  <>
    <Header2>Hospitals</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Hospital List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Hospital ID</th>
          <th>Hospital Zip Code</th>
          <th>Hospital Address</th>
          <th>Hospital Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Loop over hospitals and populate table rows */}
        {hospitals.map(hospitals => (
        <tr key={hospitals.hospital_id}>
          <td style={{ textAlign: 'center' }}>{hospitals.hospital_id}</td>
          <td style={{ textAlign: 'center' }}>{hospitals.hospital_zip}</td>
          <td style={{ textAlign: 'center' }}>{hospitals.hospital_address}</td>
          <td style={{ textAlign: 'center' }}>{hospitals.hospital_name}</td>
          
          
          <td style={{ textAlign: 'center' }}>
            {/* Buttons for actions */}
            <button onClick={() => openEditModal(hospitals, 'Hospital', ['hospital_name', 'hospital_address', 'hospital_zip'])}>Edit</button>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#"onClick={(e) => { e.preventDefault(); handleDeleteClick("hospitals",hospitals.hospital_id)}}>Delete</a>
          </td>
        </tr>
        
        ))}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button onClick={(e) => { e.preventDefault(); openAddModal({hospital_id: '', hospital_name: '', hospital_address: '', hospital_zip:''}, ['hospital_id','hospital_name', 'hospital_address', 'hospital_zip']);}}>Add New Hospital Item</Button>
  </>
)}

{activeTab === 'products' && (
  <>
    <Header2>Products</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Product List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>UoM</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Loop over products and populate table rows */}
        {products.map(products => (
        <tr key={products.product_id}>
          <td style={{ textAlign: 'center' }}>{products.product_id}</td>
          <td style={{ textAlign: 'center' }}>{products.product_name}</td>
          <td style={{ textAlign: 'center' }}>{products.category}</td>
          
          
          <td style={{ textAlign: 'center' }}>
            {/* Buttons for actions */}
            <button onClick={() => openEditModal(products, 'Product', ['product_name', 'category', 'uom'])}>Edit</button>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#"onClick={(e) => { e.preventDefault(); handleDeleteClick("products",products.product_id)}}>Delete</a>
          </td>
        </tr>
        ))}
        {/* Add more dummy inventory records as needed */}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button onClick={(e) => { e.preventDefault(); openAddModal({product_id: '', product_name: '', category: '', uom:''}, ['product_id','product_name', 'category', 'uom']);}}>Add New Product Item</Button>
  </>
)}

{activeTab === 'patients' && (
  <>
    <Header2>Patients</Header2>
    <div style={{ marginBottom: '20px' }}>
      <p>Search and Filter Options:</p>
      {/* Add search bar */}
      <input type="text" placeholder="Search..." style={{ marginRight: '10px', padding: '5px' }} />
      {/* Add filter options */}
      {/* Example: <select> elements for filtering */}
      <Button><FontAwesomeIcon icon={faSearch} /></Button>
    </div>
    <p>Patient List:</p>
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Patient Contact</th>
          <th>Doctor ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Dummy user records */}
        {patients.map(patients => (
        <tr key={patients.patient_id}>
          <td style={{ textAlign: 'center' }}>{patients.patient_id}</td>
          <td style={{ textAlign: 'center' }}>{patients.patient_name}</td>
          <td style={{ textAlign: 'center' }}>{patients.patient_contact}</td>
          <td style={{ textAlign: 'center' }}>{patients.doctor_id}</td>
          <td style={{ textAlign: 'center' }}>
            {/* Hyperlinks for actions */}
            <button onClick={() => openEditModal(patients, 'Patient', ['patient_name', 'patient_contact', 'doctor_id'])}>Edit</button>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href="#"onClick={(e) => { e.preventDefault(); handleDeleteClick("patients",patients.patient_id)}}>Delete</a>
          </td>
        </tr>
        
        ))}
      </tbody>
    </table>
    {/* Actions for Administrators */}
    <Button onClick={(e) => { e.preventDefault(); openAddModal({patient_id: '', patient_name: '', patient_contact: '', doctor_id:''}, ['patient_id','patient_name', 'patient_contact', 'doctor_id']);}}>Add New Patient Item</Button>
  </>
)}

        {/* Modal for editing */}
        {editModalOpen && (
          <EditModal 
            isOpen={editModalOpen}
            onClose={closeEditModal}
            item={currentItem}
            onChange={handleItemChange}
            onSave={handleItemSave}
            readOnlyFields={editableFields}
            editableFields={editableFields}
          />
        )}

        {addModalOpen && (
          <AddModal 
            isOpen={addModalOpen}
            onClose={closeAddModal}
            item={currentItem}
            onChange={handleItemChange}
            onSave={handleItemSave}
            editableFields={editableFields}
          />
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
