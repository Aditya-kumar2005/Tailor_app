import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setMeasurements } from "../../slices/measurementSlice";
import api from "../../api";
import TailorMeasurementForm from "./TailorMeasurementForm";

interface Measurement {
  id: number;
  customerId: number;
  customerName: string;
  garmentType: string;
  garment?: string;
  chest?: number;
  waist?: number;
  sleeve?: number;
  length?: number;
  price?: number;
  notes?: string;
  createdAt?: string;
}

const TailorDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const measurements = useSelector((state: RootState) => state.measurements.list);
  const user = useSelector((state: RootState) => state.user);
  const [filteredMeasurements, setFilteredMeasurements] = useState<Measurement[]>([]);
  const [garmentTypeFilter, setGarmentTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    // fetch tailor-specific measurements which include customerName, price, garmentType
    api.get("/tailor/measurements")
      .then(res => {
        if (Array.isArray(res.data)) {
          dispatch(setMeasurements(res.data));
          setFilteredMeasurements(res.data);
        } else {
          setError("Invalid data format received from server");
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Failed to fetch measurements";
        setError(msg);
        console.error("Tailor API error:", err);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (garmentTypeFilter) {
      setFilteredMeasurements(measurements.filter((m: any) => m.garmentType === garmentTypeFilter));
    } else {
      setFilteredMeasurements(measurements as Measurement[]);
    }
  }, [garmentTypeFilter, measurements]);

  const garmentTypes = ["Shirt", "Pants", "Suit", "Dress", "Coat"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tailor Management - {user.profile?.role || "User"}</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {loading && <p className="text-gray-500 mb-4">Loading measurements...</p>}
      
      {!loading && <TailorMeasurementForm />}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Customer Measurements & Pricing</h2>
        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Filter by Garment Type:</label>
          <select
            value={garmentTypeFilter}
            onChange={(e) => setGarmentTypeFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            {garmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Garment Type</th>
                <th className="border p-2">Chest</th>
                <th className="border p-2">Waist</th>
                <th className="border p-2">Sleeve</th>
                <th className="border p-2">Length</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeasurements.length > 0 ? (
                filteredMeasurements.map(m => (
                  <tr key={m.id} className="hover:bg-gray-100">
                    <td className="border p-2">{m.customerName || "N/A"}</td>
                    <td className="border p-2">{m.garmentType}</td>
                    <td className="border p-2">{m.chest || "-"}</td>
                    <td className="border p-2">{m.waist || "-"}</td>
                    <td className="border p-2">{m.sleeve || "-"}</td>
                    <td className="border p-2">{m.length || "-"}</td>
                    <td className="border p-2 font-semibold text-green-600">{m.price ? `$${m.price}` : "-"}</td>
                    <td className="border p-2 text-sm">{m.notes ? m.notes.substring(0, 30) + "..." : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="border p-2 text-center text-gray-500">No measurements found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TailorDashboard;
