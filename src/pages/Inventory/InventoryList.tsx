import React, { useEffect, useState } from "react";
import api from "../../api";

interface Item {
  id: number;
  name: string;
  type: string;
  stock: number;
}

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("/inventory").then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
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