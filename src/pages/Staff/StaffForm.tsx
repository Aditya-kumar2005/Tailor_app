import React, { useState } from "react";

const StaffForm: React.FC = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /staff
    console.log("New Staff:", { name, role });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Staff</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name}
          onChange={(e)=>setName(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="text" placeholder="Role" value={role}
          onChange={(e)=>setRole(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default StaffForm;