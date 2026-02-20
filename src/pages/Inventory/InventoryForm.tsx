import React, { useState } from "react";

const InventoryForm: React.FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /inventory
    console.log("New Inventory Item:", { name, type, stock });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name}
          onChange={(e)=>setName(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="text" placeholder="Type" value={type}
          onChange={(e)=>setType(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="number" placeholder="Stock" value={stock}
          onChange={(e)=>setStock(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default InventoryForm;