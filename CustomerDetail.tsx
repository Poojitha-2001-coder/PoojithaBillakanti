// src/components/CustomerDetail.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Customer, Photo } from '../types/types';

interface CustomerDetailProps {
  customer: Customer;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://api.example.com/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Failed to fetch photos', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 10000); // Update photos every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <div className="customer-detail">
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      <div className="photo-grid">
        {photos.slice(0, 9).map(photo => (
          <img key={photo.id} src={photo.url} alt="Customer" />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetail;
