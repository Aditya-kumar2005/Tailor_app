// import React, { useEffect, useState } from "react";
// import api from "../../api";

// interface Order {
//   id: number;
//   garment: string;
//   status: string;
//   deliveryDate: string;
// }

// const OrderList: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     api.get("/orders").then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Orders</h2>
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-200"><th>Garment</th><th>Status</th><th>Delivery Date</th></tr>
//         </thead>
//         <tbody>
//           {orders.map(o => (
//             <tr key={o.id}><td>{o.garment}</td><td>{o.status}</td><td>{o.deliveryDate}</td></tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderList;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setOrders } from "../../slices/orderSlice";
import api from "../../api";
import OrderForm from "./OrderForm";
import Table from "../../components/Table";

const OrderList: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.list);

  useEffect(() => {
    api.get("/orders").then(res => dispatch(setOrders(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <OrderForm />
      <Table
        Name="Orders"
        headers={["Order ID", "Garments", "Status"]}
        data={orders.map(c => [c.id ?? "", c.garment ?? "", c.status ?? ""])}
      />
    </div>
  );
};

export default OrderList;