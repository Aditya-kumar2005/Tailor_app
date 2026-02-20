import React, { useState } from "react";

const MeasurementForm: React.FC = () => {
  const [garment, setGarment] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /measurements
    console.log("New Measurement:", { garment, chest, waist });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Measurement</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Garment" value={garment}
          onChange={(e)=>setGarment(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="number" placeholder="Chest" value={chest}
          onChange={(e)=>setChest(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="number" placeholder="Waist" value={waist}
          onChange={(e)=>setWaist(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default MeasurementForm;