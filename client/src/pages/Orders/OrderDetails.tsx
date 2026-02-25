import React from "react";

interface Order {
  id: number;
  garment: string;
  status: string;
  deliveryDate: string;
  customerName: string;
}

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Order Details</h2>
    <p><strong>Garment:</strong> {order.garment}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
    <p><strong>Customer:</strong> {order.customerName}</p>
  </div>
);

export default OrderDetails;