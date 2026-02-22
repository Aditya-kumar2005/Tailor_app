import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setInventory } from "../../slices/inventorySlice";
import api from "../../api";
import InventoryForm from "./InventoryForm";

const InventoryList: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.inventory.items);

  useEffect(() => {
    api.get("/inventory").then(res => dispatch(setInventory(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <InventoryForm />
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Name</th><th>Type</th><th>Stock</th></tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}><td>{i.name}</td><td>{i.type}</td><td>{i.stock}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;