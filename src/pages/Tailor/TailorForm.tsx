import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store';
import type { Tailor } from '../../types';
import { fetchTailors } from '../../slices/tailorSlice';
import api from '../../api';
import { fetchCustomers } from '../../slices/customerSlice';

interface TailorFormProps {
  tailor: Tailor | null;
  onSave: () => void;
}

const TailorForm: React.FC<TailorFormProps> = ({ tailor, onSave }) => {
  const dispatch: AppDispatch = useDispatch();
  const { list: customers, loading: customersLoading, error: customersError } = useSelector((state: RootState) => state.customers);
  
  const [customerId, setCustomerId] = useState("");
  const [garmentType, setGarmentType] = useState("Shirt");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [length, setLength] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(true);
  const [success, setSuccess] = useState("");

  const garmentTypes = ["Shirt", "Pants", "Suit", "Dress", "Coat"];

  useEffect(() => {
    if (tailor) {
        setCustomerId(customerId||"");
        setGarmentType(garmentType||"Shirt");
        setChest(chest||"");
        setWaist(waist||"");
        setSleeve(sleeve||"");
        setLength(length||"");
        setPrice(price||"");
        setNotes(notes||"");
        setSuccess("Measurement added successfully!");
    } else {
      setCustomerId("");
        setGarmentType("Shirt");
        setChest("");
        setWaist("");
        setSleeve("");
        setLength("");
        setPrice("");
        setNotes("");
        setSuccess("CLEARED SUCCESSFULLY");
    }
  }, [tailor]);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchTailors());
  }, [dispatch]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
  
      if (!customerId || !garmentType || !price) {
        setError("Customer, garment type, and price are required");
        return;
      }
      const newMeasurementData = {
        customerId: Number(customerId),
        garmentType,
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        sleeve: sleeve ? Number(sleeve) : undefined,
        length: length ? Number(length) : undefined,
        price: Number(price),
        notes: notes || undefined,
      };
  
      try {
        if (tailor) {
        await api.put(`/measurements/${tailor.id}`, newMeasurementData);
      } else {
        await api.post('/measurements', newMeasurementData);
      }
  
        // dispatch(fetchTailors()); 
        onSave();
      } catch (err) {
        setError((err as any)?.response?.data?.message || "Failed to add measurement");
        console.error(err);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  )}

  <div className="grid grid-cols-1 gap-y-4">

    {/* Customer */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Customer
      </label>
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">{customersLoading ? 'Loading...' : 'Select Customer'}</option>
          {!customersLoading && customersError && <option value=""            disabled>Error: {customersError}</option>}
          {Array.isArray(customers) && customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
      </select>
    </div>

    {/* Garment Type */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Garment Type
      </label>
      <select
        value={garmentType}
        onChange={(e) => setGarmentType(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option>Shirt</option>
        <option>Pants</option>
        <option>Suit</option>
        <option>Dress</option>
        <option>Coat</option>
      </select>
    </div>

    {/* Chest */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Chest (inches)
      </label>
      <input
        type="number"
        value={chest}
        onChange={(e) => setChest(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {/* Waist */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Waist (inches)
      </label>
      <input
        type="number"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {/* Sleeve */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Sleeve (inches)
      </label>
      <input
        type="number"
        value={sleeve}
        onChange={(e) => setSleeve(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {/* Length */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Length (inches)
      </label>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Price
      </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {/* Notes */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Notes
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  </div>

  {/* Actions */}
  <div className="flex justify-end pt-4 space-x-3">
    <button
      type="button"
      onClick={onSave}
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
    >
      {loading ? 'Saving...' : 'Save'}
    </button>
  </div>
</form>
  );
};

export default TailorForm;
