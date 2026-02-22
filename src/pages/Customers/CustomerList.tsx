import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setCustomers } from "../../slices/customerSlice";
import api from "../../api";
import CustomerForm from "./CustomerForm";
import Table from "../../components/Table";
// import CustomerProfile from "./CustomerProfile";

const CustomerList: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.list);

  useEffect(() => {
    api.get("/customers").then(res => dispatch(setCustomers(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <CustomerForm/>
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <Table
        headers={["Name", "Phone", "Email"]}
        data={customers.map(c => [c.name ?? "", c.phone ?? "", c.email ?? ""])}
      />
    </div>
  );
};

export default CustomerList;