import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addStaff } from "../../slices/staffSlice";

const StaffForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post("/staff", { name, role });
      dispatch(addStaff(resp.data));
      setName("");
      setRole("");
      setError("");
    } catch (err) {
      setError("Failed to add staff");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Staff</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
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