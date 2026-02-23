import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addStaff } from "../../slices/staffSlice";
import  Form  from "../../components/Form";

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
      <Form
      formname="Staff Role"
      error={error}
      fields={[
        { label: "Name", type: "text", value: name, onChange: e => setName(e.target.value) },
        { label: "Role", type: "text", value: role, onChange: e => setRole(e.target.value) },
      ]}
      onSubmit={handleSubmit}
      />
    </div>
  );
};

export default StaffForm;