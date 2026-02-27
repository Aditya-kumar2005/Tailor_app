import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchCustomers } from '../../slices/customerSlice';
import type { Customer } from '../../types';

// --- Components ---
import Table, { type Column } from '../../components/Table';
import Modal from '../../components/Modal';
import CustomerForm from './CustomerForm';
import { PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'; // Using Heroicons

const CustomerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: customers, loading, error } = useSelector((state: RootState) => state.customers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // --- Event Handlers ---
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleViewProfile = (customer: Customer) => {
    // In a real app, you would navigate to a detailed profile page
    // For now, we'll just log it.
    console.log('Viewing profile for:', customer);
    // navigate(`/customers/${customer.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  // --- Table Configuration ---
  const columns: Column<Customer>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Actions',
      accessor: 'id', // Using 'id' for a unique key, as it's not used for display
      render: (customer: Customer) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => handleViewProfile(customer)} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => handleEditCustomer(customer)} className="p-2 text-gray-500 hover:text-green-600 focus:outline-none">
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  // --- Render Logic ---
  if (loading) {
    return <div className="p-6">Loading customers...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        {customers.length === 0 && (
          <div className="text-center text-gray-500 py-10">
          No customers found.
        </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="mt-1 text-sm text-gray-600">View, add, and edit customer information.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={handleAddCustomer}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add New Customer
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          title="Customers"
          columns={columns}
          data={customers}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedCustomer ? 'Edit Customer' : 'Add New Customer'}>
        <CustomerForm customer={selectedCustomer} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default CustomerList;
