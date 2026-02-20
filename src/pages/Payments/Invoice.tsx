import React from "react";

interface InvoiceProps {
  orderId: number;
  customerName: string;
  amount: number;
  date: string;
}

const Invoice: React.FC<InvoiceProps> = ({ orderId, customerName, amount, date }) => (
  <div className="p-6 border rounded bg-white shadow-md">
    <h2 className="text-xl font-bold mb-4">Invoice</h2>
    <p><strong>Order ID:</strong> {orderId}</p>
    <p><strong>Customer:</strong> {customerName}</p>
    <p><strong>Amount:</strong> ${amount}</p>
    <p><strong>Date:</strong> {date}</p>
  </div>
);

export default Invoice;