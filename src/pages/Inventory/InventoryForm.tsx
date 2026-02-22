import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addItem } from "../../slices/inventorySlice";
import  Form  from "../../components/Form";

const InventoryForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post("/inventory", { name, type, stock: Number(stock) });
      dispatch(addItem(resp.data));
      setName("");
      setType("");
      setStock("");
      setError("");
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Inventory Item</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Form
      fields={[
        { label: "Name", type: "text", value: name, onChange: e => setName(e.target.value) },
        { label: "Type", type: "text", value: type, onChange: e => setType(e.target.value) },
        { label: "Stock", type: "number", value: stock, onChange: e => setStock(e.target.value) }
      ]}
      onSubmit={handleSubmit}
      />
    </div>
  );
};

export default InventoryForm;