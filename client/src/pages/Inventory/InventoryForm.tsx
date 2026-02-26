import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { InventoryItem } from '../../types';
import { fetchInventory } from '../../slices/inventorySlice';
import api from '../../api';

interface InventoryFormProps {
  item: InventoryItem | null;
  onSave: () => void;
}

const InventoryForm: FC<InventoryFormProps> = ({ item, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [stock, setStock] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setType(item.type || '');
      setStock(item.stock || 0);
    } else {
      setName('');
      setType('');
      setStock(0);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const inventoryData = { name, type, stock };

    try {
      if (item) {
        await api.put(`/inventory/${item.id}`, inventoryData);
      } else {
        await api.post('/inventory', inventoryData);
      }

      dispatch(fetchInventory());
      onSave();

    } catch (err:unknown
    ) {
      setError("Failed to send reset link. Please try again."+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          {error}
        </div>
      )}

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
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            className="mt-1 block w-.full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

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

export default InventoryForm;
