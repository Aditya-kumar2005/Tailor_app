import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addMeasurement } from "../../slices/measurementSlice";
import  Form  from "../../components/Form";

const MeasurementForm: React.FC = () => {
  const dispatch = useDispatch();
  const [garment, setGarment] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post("/measurements", { garment, chest: Number(chest), waist: Number(waist) });
      dispatch(addMeasurement(resp.data));
      setGarment("");
      setChest("");
      setWaist("");
      setError("");
    } catch (err) {
      setError("Failed to add measurement");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Form
      formname="Add Measurement"
      error={error}
      fields={[
        { label: "Garment", type: "text", value:garment, onChange: e => setGarment(e.target.value) },
        { label: "Chest", type: "number", value: chest, onChange: e => setChest(e.target.value) },
        { label: "Waist", type: "number", value: waist, onChange: e => setWaist(e.target.value) }
      ]}
      onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MeasurementForm;