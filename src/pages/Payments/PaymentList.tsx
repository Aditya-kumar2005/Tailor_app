// import React, { useEffect, useState } from "react";
// import api from "../../api";

// interface Payment {
//   id: number;
//   orderId: number;
//   amount: number;
//   status: string;
// }

// const PaymentList: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);

//   useEffect(() => {
//     api.get("/payments").then(res => setPayments(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Payments</h2>
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-200"><th>Order ID</th><th>Amount</th><th>Status</th></tr>
//         </thead>
//         <tbody>
//           {payments.map(p => (
//             <tr key={p.id}>
//               <td>{p.orderId}</td>
//               <td>{p.amount}</td>
//               <td>{p.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentList;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setPayments } from "../../slices/paymentSlice";
import api from "../../api";

const PaymentList: React.FC = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state: RootState) => state.payments.list);

  useEffect(() => {
    api.get("/payments").then(res => dispatch(setPayments(res.data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payments</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Order ID</th><th>Amount</th><th>Status</th><th>Method</th><th>Date</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.orderId}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
              <td>{p.method}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;