import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { Payment } from '../../types';
import { fetchPayments } from '../../slices/paymentSlice';
import api from '../../api';

interface PaymentFormProps {
  payment: Payment | null;
  onSave: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onSave }) => {
  const [orderId, setOrderId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Partial'>('Pending');
  const [method, setMethod] = useState<'Cash' | 'Card' | 'Digital'>('Cash');
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (payment) {
      setOrderId(payment.orderId || 0);
      setAmount(payment.amount || 0);
      setStatus(payment.status || 'Pending');
      setMethod(payment.method || 'Cash');
      setDate(payment.date || '');
    } else {
      setOrderId(0);
      setAmount(0);
      setStatus('Pending');
      setMethod('Cash');
      setDate('');
    }
  }, [payment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const paymentData = { orderId, amount, status, method, date };

    try {
      if (payment) {
        await api.put(`/payments/${payment.id}`, paymentData);
      } else {
        await api.post('/payments', paymentData);
      }

      // dispatch(fetchPayments());
      onSave();

    } catch (err: any) {
      setError(err.response?.data?.error || `Failed to ${payment ? 'update' : 'create'} payment.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-4">
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
          <input
            type="number"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(Number(e.target.value))}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            // onChange={(e) => setStatus(e.target.value as any)}
            onChange={(e) => setStatus(e.target.value as 'Paid' | 'Pending' | 'Partial')}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Partial</option>
          </select>
        </div>
        <div>
          <label htmlFor="method" className="block text-sm font-medium text-gray-700">Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>Digital</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button type="button" onClick={onSave} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
