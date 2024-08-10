import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerDetail from '../components/CustomerDetail';
import CustomerList from '../components/CustomerList';
import '../css/App.css';
import { Customer } from '../types/types';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:3000/v1/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      const customer = customers.find(c => c.id === selectedCustomerId);
      setSelectedCustomer(customer || null);
    }
  }, [selectedCustomerId, customers]);

  return (
    <div className="app">
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onSelectCustomer={setSelectedCustomerId}
      />
      {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
    </div>
  );
};

export default App;
