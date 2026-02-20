import React from "react";

const MeasurementList: React.FC = () => {
  const measurements = [
    { id: 1, garment: "Shirt", chest: 38, waist: 32 },
    { id: 2, garment: "Suit", chest: 40, waist: 34 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Measurements</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Garment</th><th>Chest</th><th>Waist</th></tr>
        </thead>
        <tbody>
          {measurements.map(m => (
            <tr key={m.id}><td>{m.garment}</td><td>{m.chest}</td><td>{m.waist}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeasurementList;