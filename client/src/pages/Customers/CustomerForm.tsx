import React, { useState, useEffect} from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { Customer } from '../../types';
import { fetchCustomers } from '../../slices/customerSlice'; // To refresh the list after save
import api from '../../api';

interface CustomerFormProps {
  customer: Customer | null;
  onSave: () => void;
}

const CustomerForm: FC<CustomerFormProps> = ({ customer, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  // --- Effect to populate form when a customer is selected for editing ---
  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
      setPhone(customer.phone || '');
    } else {
      // Reset form for a new customer
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [customer]);

  // --- Form Submission Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const customerData = { name, email, phone };

    try {
      if (customer) {
        // -- Update Existing Customer --
        await api.put(`/customers/${customer.id}`, customerData);
      } else {
        // -- Create New Customer --
        await api.post('/customers', customerData);
      }
      
      // Refresh the customer list to show changes
      dispatch(fetchCustomers()); 
      onSave(); // Close the modal

    } catch (err: any) {
      setError(err.response?.data?.error || `Failed to ${customer ? 'update' : 'create'} customer`);/////////customer.////////
    } finally {
      setLoading(false);
    }
  };

  // --- Render Logic ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          {error}
        </div>
      )}
      
      {/* --- Form Fields --- */}
      <div className="grid grid-cols-1 gap-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end pt-4 space-x-3">
        <button type="button" onClick={onSave} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
