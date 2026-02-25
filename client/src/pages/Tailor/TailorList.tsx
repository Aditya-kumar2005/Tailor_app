import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchTailors } from '../../slices/tailorSlice';
import type { Tailor } from '../../types';

// --- Components ---
import Table, { type Column } from '../../components/Table';
import Modal from '../../components/Modal';
import TailorForm from './TailorForm';
import { PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

const TailorList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: tailors, loading, error } = useSelector((state: RootState) => state.tailors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchTailors());
  }, [dispatch]);

  // --- Event Handlers ---
  const handleAddTailor = () => {
    setSelectedTailor(null);
    setIsModalOpen(true);
  };

  const handleEditTailor = (tailor: Tailor) => {
    setSelectedTailor(tailor);
    setIsModalOpen(true);
  };

  const handleViewProfile = (tailor: Tailor) => {
    console.log('Viewing profile for:', tailor);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTailor(null);
  };

  // --- Table Configuration ---
  const columns: Column<Tailor>[] = [
  { header: 'Customer', accessor: 'customerName' },
  { header: 'Garment', accessor: 'garmentType' },
  { header: 'Chest', accessor: 'chest' },
  { header: 'Waist', accessor: 'waist' },
  { header: 'Price', accessor: 'price' },
    {
      header: 'Actions',
      accessor: 'id', // Added accessor
      render: (tailor: Tailor) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => handleViewProfile(tailor)} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => handleEditTailor(tailor)} className="p-2 text-gray-500 hover:text-green-600 focus:outline-none">
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  // --- Render Logic ---
  if (loading) {
    return <div className="p-6">Loading tailors...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tailor Management</h1>
          <p className="mt-1 text-sm text-gray-600">View, add, and edit tailor information.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={handleAddTailor}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add New Tailor
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          title="Tailors"
          columns={columns}
          data={tailors}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTailor ? 'Edit Tailor' : 'Add New Tailor'}>
        <TailorForm tailor={selectedTailor} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default TailorList;
