import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addOrder } from "../../slices/orderSlice";
import  Form  from "../../components/Form";

const OrderForm: React.FC = () => {
  const dispatch = useDispatch();
  const [garment, setGarment] = useState("");
  const [phone, setPhone] = useState("");
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
      <Form
      formname="Create Order"
      error={error}
      fields={[
        { label: "Garment", type: "text", value: garment, onChange: e => setGarment(e.target.value) },
        { label: "Phone", type: "text", value: phone, onChange: e => setPhone(e.target.value) },
        { label: "DeliveryDate", type: "date", value: deliveryDate, onChange: e => setDeliveryDate(e.target.value) }
      ]}
      onSubmit={handleSubmit}
      />
    </div>
  );
};

export default OrderForm;