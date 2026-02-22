import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addOrder } from "../../slices/orderSlice";

const OrderForm: React.FC = () => {
  const dispatch = useDispatch();
  const [garment, setGarment] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post("/orders", { garment, deliveryDate });
      dispatch(addOrder(resp.data));
      setGarment("");
      setDeliveryDate("");
      setError("");
    } catch (err) {
      setError("Failed to create order");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Garment Type" value={garment}
          onChange={(e)=>setGarment(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="date" value={deliveryDate}
          onChange={(e)=>setDeliveryDate(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default OrderForm;