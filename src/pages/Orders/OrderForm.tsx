import React, { useState } from "react";

const OrderForm: React.FC = () => {
  const [garment, setGarment] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /orders
    console.log("New Order:", { garment, deliveryDate });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
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