import React from "react";
import type { Customer } from "../../types";


const CustomerProfile: React.FC<{ customer: Customer }> = ({ customer }) => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Customer Profile</h2>
    <p><strong>Name:</strong> {customer.name}</p>
    <p><strong>Phone:</strong> {customer.phone}</p>
    <p><strong>Email:</strong> {customer.email}</p>
  </div>
);

export default CustomerProfile;