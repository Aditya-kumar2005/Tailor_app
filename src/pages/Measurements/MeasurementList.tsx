import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setMeasurements } from "../../slices/measurementSlice";
import api from "../../api";
import MeasurementForm from "./MeasurementForm";

const MeasurementList: React.FC = () => {
  const dispatch = useDispatch();
  const measurements = useSelector((state: RootState) => state.measurements.list);

  useEffect(() => {
    api.get("/measurements").then(res => dispatch(setMeasurements(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <MeasurementForm />
      <h2 className="text-xl font-bold mb-4">Measurements</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Customer</th>
            <th>Garment Type</th>
            <th>Garment</th>
            <th>Chest</th>
            <th>Waist</th>
            <th>Price</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map(m => (
            <tr key={m.id}>
              <td>{(m as any).customerName || ''}</td>
              <td>{m.garmentType || ''}</td>
              <td>{m.garment || ''}</td>
              <td>{m.chest ?? ''}</td>
              <td>{m.waist ?? ''}</td>
              <td>{m.price ?? ''}</td>
              <td>{m.notes || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeasurementList;