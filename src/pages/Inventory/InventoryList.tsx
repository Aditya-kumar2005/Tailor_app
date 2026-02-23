import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setInventory } from "../../slices/inventorySlice";
import api from "../../api";
import InventoryForm from "./InventoryForm";
import Table from "../../components/Table";

const InventoryList: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.inventory.items);

  useEffect(() => {
    api.get("/inventory").then(res => dispatch(setInventory(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <InventoryForm />
      <Table
        Name="Inventory"
        headers={["Name", "Type", "Stock"]}
        data={items.map(item => [item.name ?? "", item.type ?? "", item.stock ?? ""])}
      />
    </div>
  );
};

export default InventoryList;