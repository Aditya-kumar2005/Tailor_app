import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setStaff } from "../../slices/staffSlice";
import api from "../../api";
import StaffForm from "./StaffForm";
import Table from "../../components/Table";

const StaffList: React.FC = () => {
  const dispatch = useDispatch();
  const staff = useSelector((state: RootState) => state.staff.list);

  useEffect(() => {
    api.get("/staff").then(res => dispatch(setStaff(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <StaffForm />
      <Table
        Name="Staff"
        headers={["Name", "Role"]}
        data={staff.map(c => [c.name ?? "", c.role ?? ""])}
      />
    </div>
  );
};

export default StaffList;