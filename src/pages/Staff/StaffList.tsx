
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchStaff } from '../../slices/staffSlice';
import type { Staff } from '../../types';

// --- Components ---
import Table from '../../components/Table';
import type { Column } from '../../components/Table';
import Modal from '../../components/Modal';
import StaffForm from './StaffForm';
import { PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

const StaffList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: staff, loading, error } = useSelector((state: RootState) => state.staff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // --- Event Handlers ---
  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleViewProfile = (staffMember: Staff) => {
    console.log('Viewing profile for:', staffMember);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // --- Table Configuration ---
  const columns: Column<Staff>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (staffMember: Staff) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => handleViewProfile(staffMember)} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => handleEditStaff(staffMember)} className="p-2 text-gray-500 hover:text-green-600 focus:outline-none">
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  // --- Render Logic ---
  if (loading) {
    return <div className="p-6">Loading staff...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="mt-1 text-sm text-gray-600">View, add, and edit staff information.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={handleAddStaff}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add New Staff
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          title="Staff"
          columns={columns}
          data={staff}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedStaff ? 'Edit Staff' : 'Add New Staff'}>
        <StaffForm staff={selectedStaff} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default StaffList;
