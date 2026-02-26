import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { Order, Customer, OrderItem } from '../../types';
import { fetchOrders } from '../../slices/orderSlice';
import api from '../../api';

interface OrderFormProps {
  order: Order | null;
  onSave: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName || '');
      setOrderDate(order.orderDate || '');
      setTotalAmount(order.totalAmount || 0);
      setStatus(order.status || '');
      setItems(order.items || []);
    } else {
      setCustomerName('');
      setOrderDate('');
      setTotalAmount(0);
      setStatus('');
      setItems([]);
    }
  }, [order]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      }
    };
    fetchCustomers();
  }, []);

const handleItemChange = <K extends keyof OrderItem>(
  index: number,
  field: K,
  value: OrderItem[K]
) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const orderData = { customerName, orderDate, totalAmount, status, items };

    try {
      if (order) {
        await api.put(`/orders/${order.id}`, orderData);
      } else {
        await api.post('/orders', orderData);
      }

      dispatch(fetchOrders());
      onSave();

    } catch (err:unknown
    ) {
      setError("Failed to send reset link. Please try again."+err);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer</label>
          <select
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
              className="block w-1/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
              className="block w-1/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Add Item
        </button>
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

export default OrderForm;
