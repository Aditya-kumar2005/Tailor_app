import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import { addMeasurement } from "../../slices/measurementSlice";
import type { RootState } from "../../store";

interface Customer {
  id: number;
  name: string;
}

const TailorMeasurementForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [garmentType, setGarmentType] = useState("Shirt");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [length, setLength] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const garmentTypes = ["Shirt", "Pants", "Suit", "Dress", "Coat"];

  useEffect(() => {
    api.get("/customers").then(res => setCustomers(res.data)).catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!customerId || !garmentType || !price) {
      setError("Customer, garment type, and price are required");
      return;
    }

    try {
      const resp = await api.post("/tailor/measurements", {
        customerId: Number(customerId),
        garmentType,
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        sleeve: sleeve ? Number(sleeve) : undefined,
        length: length ? Number(length) : undefined,
        price: Number(price),
        notes: notes || undefined
      });

      dispatch(addMeasurement(resp.data));
      setCustomerId("");
      setGarmentType("Shirt");
      setChest("");
      setWaist("");
      setSleeve("");
      setLength("");
      setPrice("");
      setNotes("");
      setSuccess("Measurement added successfully!");
    } catch (err) {
      setError((err as any)?.response?.data?.message || "Failed to add measurement");
      console.error(err);
    }
  };

  return (
    <div className="p-6 border-2 rounded bg-white mb-6">
      <h2 className="text-center text-4xl font-bold text-blue-500 mb-4">Add Customer Measurement</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows-2 gap-4">
        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          >
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Garment Type</label>
          <select
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          >
            {garmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Chest (inches)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g., 40"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          />
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Waist (inches)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g., 32"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          />
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Sleeve (inches)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g., 34"
            value={sleeve}
            onChange={(e) => setSleeve(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          />
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Length (inches)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g., 30"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          />
        </div>

        <div>
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g., 50.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-2xl text-blue-500 font-semibold mb-2">Notes</label>
          <textarea
            placeholder="Additional notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
            rows={3}
          />
        </div >
          <button type="submit" className="row-span-2 h-13 rounded-lg bg-blue-600 text-xl text-white font-bold hover:bg-white hover:text-blue-600 hover:border-2">
          Add Measurement
        </button>
      </form>
    </div>
  );
};

export default TailorMeasurementForm;
