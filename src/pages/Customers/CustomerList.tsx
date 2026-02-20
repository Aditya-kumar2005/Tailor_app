import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setCustomers } from "../../slices/customerSlice";
import api from "../../api";

const CustomerList: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.list);

  useEffect(() => {
    api.get("/customers").then(res => dispatch(setCustomers(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Name</th><th>Phone</th><th>Email</th></tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;