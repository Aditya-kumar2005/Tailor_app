import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addPayment } from "../../slices/paymentSlice";

const PaymentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [method, setMethod] = useState("Cash");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        orderId: Number(orderId),
        amount: Number(amount),
        status,
        method,
        date,
      };
      const resp = await api.post("/payments", body);
      dispatch(addPayment(resp.data));
      setOrderId("");
      setAmount("");
      setStatus("Pending");
      setMethod("Cash");
      setDate("");
      setError("");
    } catch (err) {
      setError("Failed to create payment");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">New Payment</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Partial</option>
        </select>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>Digital</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
