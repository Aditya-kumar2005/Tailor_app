import React, { useState } from "react";

const CustomerForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /customers
    console.log("New Customer:", { name, phone });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name}
          onChange={(e)=>setName(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="text" placeholder="Phone" value={phone}
          onChange={(e)=>setPhone(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default CustomerForm;