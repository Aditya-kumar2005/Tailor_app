import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Services } from "../../api";
import { addCustomer } from "../../slices/customerSlice";
import Form from "../../components/Form";

const CustomerForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required");
      return;
    }
    try {
      const resp = await Services.createCustomer({ name, phone, email });
      dispatch(addCustomer(resp.data));
      setName("");
      setPhone("");
      setEmail("");
      setError("");
    } catch (err) {
      setError("Failed to create customer");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Form
      formname="Add Customer"
      error={error}
      fields={[
        { label: "Name", type: "text", value: name, onChange: e => setName(e.target.value) },
        { label: "Phone", type: "text", value: phone, onChange: e => setPhone(e.target.value) },
        { label: "Email", type: "email", value: email, onChange: e => setEmail(e.target.value) }
      ]}
      onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CustomerForm;