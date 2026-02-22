import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setStaff } from "../../slices/staffSlice";
import api from "../../api";
import StaffForm from "./StaffForm";

const StaffList: React.FC = () => {
  const dispatch = useDispatch();
  const staff = useSelector((state: RootState) => state.staff.list);

  useEffect(() => {
    api.get("/staff").then(res => dispatch(setStaff(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <StaffForm />
      <h2 className="text-xl font-bold mb-4">Staff</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}><td>{s.name}</td><td>{s.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;