import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchInventory } from '../../slices/inventorySlice';
import type { InventoryItem } from '../../types';
import type { Column } from '../../components/Table';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import InventoryForm from './InventoryForm';
import { PlusIcon } from '@heroicons/react/24/outline';

const InventoryList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.inventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleSave = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    dispatch(fetchInventory());
  };

  const openModal = (item: InventoryItem | null = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const columns: Column<InventoryItem>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Stock', accessor: 'stock' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (item: InventoryItem) => (
        <button 
          onClick={() => openModal(item)} 
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Edit
        </button>
      ),
    },
  ];

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your inventory items.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Item
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          title="Inventory"
          columns={columns}
          data={items}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedItem ? 'Edit Item' : 'Add Item'}>
        <InventoryForm item={selectedItem} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default InventoryList;
