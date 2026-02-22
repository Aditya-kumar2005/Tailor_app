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
    <div className="flex flex-col items-center justify-center p-6 mt-20 border-2 rounded shadow-lg w-full max-w-full mx-auto">
      <h2 className="text-4xl font-bold text-blue-500 mb-4">New Payment</h2>
      {error && <p className="text-red-600 font-medium mb-4 bg-red-100 px-4 py-2 rounded-lg shadow-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <label className="text-2xl text-blue-500 font-semibold mb-2">Order ID</label>
        <input
          type="number"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
        />
      <label className="text-2xl text-blue-500 font-semibold mb-2">Amount</label>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
        />
      <label className="text-2xl text-blue-500 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Partial</option>
        </select>
        <label className="text-2xl text-blue-500 font-semibold mb-2">Payment Mode</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>Digital</option>
        </select>
        <label className="text-2xl text-blue-500 font-semibold mb-2">Payment Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
        />

        <div className="flex justify-center mt-6">
            <button
          type="submit"
          className="px-50 h-13 rounded-lg bg-blue-600 text-xl text-white font-bold hover:bg-white hover:text-blue-600 hover:border-2"
        >
          Save
        </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
