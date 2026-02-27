import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import type { Customer } from '../../types';

import {
  fetchCustomers,
  softDeleteCustomer,
  setSearch,
  setPage,
  selectVisibleCustomers,
  selectTotalPages,
} from '../../slices/customerSlice';

import Table, { type Column } from '../../components/Table';
import Modal from '../../components/Modal';
import CustomerForm from './CustomerForm';

import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const CustomerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, search, page } = useSelector(
    (state: RootState) => state.customers
  );

  const customers = useSelector(selectVisibleCustomers);
  const totalPages = useSelector(selectTotalPages);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  /* ---------- Fetch ---------- */
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  /* ---------- Handlers ---------- */
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleViewProfile = (customer: Customer) => {
    console.log('Viewing profile:', customer);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  /* ---------- Table Columns ---------- */
  const columns: Column<Customer>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (customer) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewProfile(customer)}
            className="p-2 text-gray-500 hover:text-blue-600"
          >
            <EyeIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() => handleEditCustomer(customer)}
            className="p-2 text-gray-500 hover:text-green-600"
          >
            <PencilIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() => dispatch(softDeleteCustomer(customer.id))}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  /* ---------- Loading / Error ---------- */
  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <p className="text-sm text-gray-600">
            View, add, edit and manage customers
          </p>
        </div>

        <button
          onClick={handleAddCustomer}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search customer..."
        className="border px-3 py-2 rounded w-64"
      />

      {/* Table */}
      <Table title="Customers" columns={columns} data={customers} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-end">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => dispatch(setPage(i + 1))}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}
      >
        <CustomerForm customer={selectedCustomer} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default CustomerList;